# Assets for ArnaudWiehe.com

`public/images/` is the single canonical source for images served by the website.

This `assets/` directory is archive-only source material and should not be referenced by app code. If an image is meant to appear on the live site, place it in `public/images/` and wire that path directly.

## Folder Structure

```
assets/
├── images/          # Archive/source material only
├── photos/          # Archive event/source photos
└── documents/       # Archive PDFs or other source material
```

## Usage

Use this directory only for offline/source material that is not part of the live site pipeline.
Do not reference `/assets/...` paths from pages, components, or generated content.

## Canonical Runtime Paths

- Headshots: `public/images/headshots/`
- Speaking photos: `public/images/speaking/`
- Music and instrument photos: `public/images/music/` and `public/images/instruments/`
- Book covers: `public/images/books/`
