"""Split the X-series group photo into four complete board cutouts."""

from pathlib import Path

import cv2
import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\qinglian.li\.cursor\projects\d-Awork-e-split-doc-rdk-doc-manage-rdk-doc\assets"
    r"\c__Users_qinglian.li_AppData_Roaming_Cursor_User_workspaceStorage_995a2a5ced3cc0550c6c0b30bd953351_images_image-c0142bfe-5864-4272-9e0d-4c8e3a053f56.png"
)
OUT_DIR = Path(r"d:\Awork\e_split_doc\rdk_doc_manage\rdk_doc\static\img\products")

NAMES = [
    ("rdk-x3-module.png", "X3 Module"),
    ("rdk-x3.png", "X3"),
    ("rdk-x5.png", "X5"),
    ("rdk-x5-module.png", "X5 Module"),
]


def keep_largest(mask: np.ndarray) -> np.ndarray:
    num, labels, stats, _ = cv2.connectedComponentsWithStats(
        (mask > 0).astype(np.uint8), connectivity=8
    )
    if num <= 1:
        return mask
    best = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    out = np.zeros_like(mask)
    out[labels == best] = 255
    return out


def cut_board(rgb: np.ndarray) -> np.ndarray:
    bg = np.array([255.0, 255.0, 255.0], dtype=np.float32)
    dist = np.linalg.norm(rgb.astype(np.float32) - bg, axis=2)
    mask = (dist > 14).astype(np.uint8) * 255
    mask = cv2.morphologyEx(
        mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
    )
    mask = keep_largest(mask)
    # Fill pin gaps / mounting holes, then pad so edges stay complete.
    mask = cv2.morphologyEx(
        mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    )
    ys, xs = np.where(mask > 0)
    pts = np.stack([xs, ys], axis=1).astype(np.int32)
    core = np.zeros(mask.shape, np.uint8)
    cv2.fillConvexPoly(core, cv2.convexHull(pts), 255)
    keep = cv2.dilate(core, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    ring = (keep > 0) & (core == 0)
    keep[ring & (dist < 18)] = 0
    soft = cv2.GaussianBlur(keep, (3, 3), 0)

    a = soft.astype(np.float32) / 255.0
    rgb_f = rgb.astype(np.float32)
    edge = (a > 0.04) & (a < 0.96)
    fg = (rgb_f - (1.0 - a)[:, :, None] * bg) / np.clip(a[:, :, None], 0.04, 1.0)
    rgb_f[edge] = fg[edge]
    rgba = np.dstack([np.clip(rgb_f, 0, 255).astype(np.uint8), soft])

    ys, xs = np.where(soft > 6)
    pad = 6
    h, w = soft.shape
    y0, y1 = max(0, int(ys.min()) - pad), min(h, int(ys.max()) + 1 + pad)
    x0, x1 = max(0, int(xs.min()) - pad), min(w, int(xs.max()) + 1 + pad)
    return rgba[y0:y1, x0:x1]


def detect_boards(rgb: np.ndarray):
    h, w = rgb.shape[:2]
    # Ignore caption row under the boards.
    band = rgb[: int(h * 0.82)]
    dist = np.linalg.norm(band.astype(np.float32) - 255, axis=2)
    mask = (dist > 20).astype(np.uint8) * 255
    mask = cv2.morphologyEx(
        mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    )
    num, _, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    boxes = []
    for i in range(1, num):
        x, y, bw, bh, area = stats[i]
        if area > 400:
            boxes.append((int(x), int(y), int(bw), int(bh)))
    boxes.sort(key=lambda b: b[0])
    return boxes


def main() -> None:
    rgb = np.array(Image.open(SRC).convert("RGB"))
    h, w = rgb.shape[:2]
    boxes = detect_boards(rgb)
    if len(boxes) != 4:
        raise RuntimeError(f"expected 4 boards, got {len(boxes)}: {boxes}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pad = 22
    for (x, y, bw, bh), (filename, label) in zip(boxes, NAMES):
        x0, y0 = max(0, x - pad), max(0, y - pad)
        x1, y1 = min(w, x + bw + pad), min(int(h * 0.84), y + bh + pad)
        crop = rgb[y0:y1, x0:x1]
        cut = cut_board(crop)
        dst = OUT_DIR / filename
        Image.fromarray(cut, "RGBA").save(dst, "PNG", optimize=True)
        print(f"{label}: {crop.shape[1]}x{crop.shape[0]} -> {cut.shape[1]}x{cut.shape[0]} {dst.name}")


if __name__ == "__main__":
    main()
