"""Cut product photos to transparent PNG, keeping the full subject."""

from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from rembg import new_session, remove

ASSETS = Path(
    r"C:\Users\qinglian.li\.cursor\projects\d-Awork-e-split-doc-rdk-doc-manage-rdk-doc\assets"
)
OUT_DIR = Path(r"d:\Awork\e_split_doc\rdk_doc_manage\rdk_doc\static\img\products")

JOBS = [
    {
        "src": ASSETS
        / "c__Users_qinglian.li_AppData_Roaming_Cursor_User_workspaceStorage_995a2a5ced3cc0550c6c0b30bd953351_images_image-c079a1ee-9cec-4929-8b1e-379e5684844c.png",
        "dst": OUT_DIR / "rdk-s100.png",
        "name": "S100",
        "use_hull": True,
        "dilate": 9,
    },
    {
        "src": ASSETS
        / "c__Users_qinglian.li_AppData_Roaming_Cursor_User_workspaceStorage_995a2a5ced3cc0550c6c0b30bd953351_images_image-c61823b1-86b9-4d13-a843-11aa4fbccfb6.png",
        "dst": OUT_DIR / "rdk-s600.png",
        "name": "S600",
        "use_hull": False,
        "dilate": 7,
    },
]


def sample_background(rgb: np.ndarray) -> np.ndarray:
    h, w = rgb.shape[:2]
    patches = [
        rgb[0:12, 0:12],
        rgb[0:12, w - 12 : w],
        rgb[h - 12 : h, 0:12],
        rgb[h - 12 : h, w - 12 : w],
    ]
    return np.median(np.concatenate([p.reshape(-1, 3) for p in patches]), axis=0)


def keep_large_blobs(mask: np.ndarray, min_area: int) -> np.ndarray:
    num, labels, stats, _ = cv2.connectedComponentsWithStats(
        (mask > 0).astype(np.uint8), connectivity=8
    )
    out = np.zeros_like(mask)
    for i in range(1, num):
        if stats[i, cv2.CC_STAT_AREA] >= min_area:
            out[labels == i] = 255
    return out


def cutout(src: Path, dst: Path, use_hull: bool, dilate: int) -> None:
    original = Image.open(src).convert("RGB")
    rgb = np.array(original)
    h, w = rgb.shape[:2]
    bg = sample_background(rgb)

    session = new_session("u2net")
    cut = remove(original, session=session, post_process_mask=True)
    alpha = np.array(cut.convert("RGBA"))[:, :, 3]

    # Drop soft studio shadows; keep solid product pixels.
    mask = (alpha >= 90).astype(np.uint8) * 255
    mask = cv2.erode(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    mask = keep_large_blobs(mask, min_area=max(80, (h * w) // 4000))
    mask = cv2.morphologyEx(
        mask,
        cv2.MORPH_CLOSE,
        cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (21, 21)),
    )

    ys, xs = np.where(mask > 0)
    if len(xs) < 20:
        raise RuntimeError(f"cutout failed: empty mask for {src.name}")

    if use_hull:
        pts = np.stack([xs, ys], axis=1).astype(np.int32)
        hull = cv2.convexHull(pts)
        core = np.zeros((h, w), np.uint8)
        cv2.fillConvexPoly(core, hull, 255)
    else:
        core = mask

    keep = cv2.dilate(
        core, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilate, dilate))
    )
    # Extra pad must not pull studio backdrop back in; never eat the core.
    ring = (keep > 0) & (core == 0)
    color_dist = np.linalg.norm(rgb.astype(np.float32) - bg, axis=2)
    keep[ring & (color_dist < 32)] = 0
    soft = cv2.GaussianBlur(keep, (3, 3), 0)

    rgb_f = rgb.astype(np.float32)
    a = soft.astype(np.float32) / 255.0
    edge = (a > 0.04) & (a < 0.96)
    fg = (rgb_f - (1.0 - a)[:, :, None] * bg) / np.clip(a[:, :, None], 0.04, 1.0)
    rgb_f[edge] = fg[edge]
    rgb_out = np.clip(rgb_f, 0, 255).astype(np.uint8)
    rgba = np.dstack([rgb_out, soft])

    ys, xs = np.where(soft > 6)
    pad = 8
    y0, y1 = max(0, int(ys.min()) - pad), min(h, int(ys.max()) + 1 + pad)
    x0, x1 = max(0, int(xs.min()) - pad), min(w, int(xs.max()) + 1 + pad)
    cropped = rgba[y0:y1, x0:x1]

    dst.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(cropped, "RGBA").save(dst, "PNG", optimize=True)
    print(
        f"{dst.name}: {original.size} -> {cropped.shape[1]}x{cropped.shape[0]} "
        f"opaque={(soft > 200).mean():.1%}"
    )


def main() -> None:
    for job in JOBS:
        print(f"cutting {job['name']} ...")
        cutout(job["src"], job["dst"], job["use_hull"], job["dilate"])


if __name__ == "__main__":
    main()
