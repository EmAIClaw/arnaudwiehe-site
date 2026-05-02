#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent / 'public' / 'images'

MAX_BY_GROUP = {
    'articles': (1200, 1200),
    'books': (700, 1050),
    'headshots': (700, 1050),
    'speaking': (1400, 1400),
    'music': (1200, 1600),
    'instruments': (1200, 1600),
    'logos': (500, 500),
    'certifications': (300, 300),
}

THUMB_GROUPS = {'articles', 'books', 'headshots', 'speaking', 'music', 'instruments'}
THUMB_MAX = (640, 960)
RASTER_EXTS = {'.jpg', '.jpeg', '.png', '.webp'}
SKIP_NAMES = {'.DS_Store'}


def fit_size(size: tuple[int, int], max_size: tuple[int, int]) -> tuple[int, int]:
    w, h = size
    mw, mh = max_size
    scale = min(mw / w, mh / h, 1)
    return max(1, round(w * scale)), max(1, round(h * scale))


def open_image(path: Path) -> Image.Image:
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)
    if img.mode not in ('RGB', 'RGBA'):
        img = img.convert('RGBA' if 'A' in img.getbands() else 'RGB')
    return img


def save_webp(img: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, 'WEBP', quality=82, method=6)


def optimize_variant(src: Path, dest: Path, max_size: tuple[int, int]) -> tuple[int, int]:
    img = open_image(src)
    target = fit_size(img.size, max_size)
    if target != img.size:
        img = img.resize(target, Image.Resampling.LANCZOS)
    save_webp(img, dest)
    return target


def should_make_thumb(group: str, size: tuple[int, int]) -> bool:
    return group in THUMB_GROUPS and (size[0] > THUMB_MAX[0] or size[1] > THUMB_MAX[1])


def main() -> None:
    total_before = 0
    total_after = 0
    for src in sorted(ROOT.rglob('*')):
        if not src.is_file() or src.name in SKIP_NAMES or src.suffix.lower() not in RASTER_EXTS:
            continue

        rel = src.relative_to(ROOT)
        group = rel.parts[0] if len(rel.parts) > 1 else 'root'
        max_size = MAX_BY_GROUP.get(group, (1200, 1200))
        total_before += src.stat().st_size

        # Main optimized asset
        if src.suffix.lower() == '.webp':
            main_dest = src
        else:
            main_dest = src.with_suffix('.webp')
        main_size = optimize_variant(src, main_dest, max_size)
        total_after += main_dest.stat().st_size
        print(f'optimized\t{rel}\t->\t{main_dest.relative_to(ROOT)}\t{main_size[0]}x{main_size[1]}')

        # Thumbnail asset when useful
        if should_make_thumb(group, main_size):
            thumb_dest = main_dest.with_name(f'{main_dest.stem}-thumb.webp')
            thumb_size = optimize_variant(src, thumb_dest, THUMB_MAX)
            total_after += thumb_dest.stat().st_size
            print(f'thumb\t{rel}\t->\t{thumb_dest.relative_to(ROOT)}\t{thumb_size[0]}x{thumb_size[1]}')

    print(f'bytes_before={total_before}')
    print(f'bytes_after_generated={total_after}')


if __name__ == '__main__':
    main()
