"""Regenerate algorithm-toolchain card wordmarks on a transparent background."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(r"d:\Awork\e_split_doc\rdk_doc_manage\rdk_doc\static\img\products")
BUILD = Path(r"d:\Awork\e_split_doc\rdk_doc_manage\rdk_doc\build\img\products")
BG = (0, 0, 0, 0)
INK = (41, 37, 36, 255)
FONT = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_FALLBACK = r"C:\Windows\Fonts\arialbd.ttf"
CANVAS_W = 480
PAD = 40
GAP = 22

CARDS = [
    ("oe-s.png", "S Series", "Algorithm Toolchain"),
    ("oe-llm-s100.png", "S100 LLM", "Toolchain"),
    ("oe-llm-s600.png", "S600 LLM", "Toolchain"),
    ("oe-x5.png", "X5", "Algorithm Toolchain"),
    ("oe-x3.png", "X3", "Algorithm Toolchain"),
]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(FONT, size=size)
    except OSError:
        return ImageFont.truetype(FONT_FALLBACK, size=size)


def text_size(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont):
    box = draw.textbbox((0, 0), text, font=font, anchor="lt")
    return box[2] - box[0], box[3] - box[1]


def wrap_line(draw, text: str, font, max_width: int) -> list[str]:
    words = text.split()
    if not words:
        return []
    lines = []
    current = words[0]
    for word in words[1:]:
        trial = f"{current} {word}"
        w, _ = text_size(draw, trial, font)
        if w <= max_width:
            current = trial
        else:
            lines.append(current)
            current = word
    lines.append(current)
    return lines


def fit_font_for_words(draw, words: list[str], max_width: int, start: int = 72) -> ImageFont.FreeTypeFont:
    size = start
    while size >= 36:
        font = load_font(size)
        if all(text_size(draw, word, font)[0] <= max_width for word in words):
            return font
        size -= 1
    return load_font(36)


def render(product: str, subtitle: str) -> Image.Image:
    scratch = Image.new("RGBA", (CANVAS_W, 800), BG)
    draw = ImageDraw.Draw(scratch)
    max_w = CANVAS_W - PAD * 2
    words = product.split() + subtitle.split()
    font = fit_font_for_words(draw, words, max_w, 72)
    lines = wrap_line(draw, product, font, max_w) + wrap_line(draw, subtitle, font, max_w)
    sizes = [text_size(draw, text, font) for text in lines]
    total_h = sum(h for _, h in sizes) + GAP * (len(lines) - 1)
    height = int(total_h + PAD * 2)
    im = Image.new("RGBA", (CANVAS_W, height), BG)
    draw = ImageDraw.Draw(im)
    y = PAD
    for i, (text, (w, h)) in enumerate(zip(lines, sizes)):
        x = (CANVAS_W - w) / 2
        draw.text((x, y), text, font=font, fill=INK, anchor="lt")
        y += h + (GAP if i < len(lines) - 1 else 0)
    return im


def main():
    BUILD.mkdir(parents=True, exist_ok=True)
    for filename, product, subtitle in CARDS:
        im = render(product, subtitle)
        dest = OUT / filename
        im.save(dest, "PNG", optimize=True)
        im.save(BUILD / filename, "PNG", optimize=True)
        print("wrote", dest.name, im.size)


if __name__ == "__main__":
    main()
