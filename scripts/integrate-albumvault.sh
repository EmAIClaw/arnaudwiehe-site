#!/usr/bin/env bash
set -euo pipefail

ALBUMVAULT_DIR="$HOME/.openclaw/workspace/projects/albumvault-brief"
PUBLIC_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/albumvault"

echo "🔨 Building AlbumVault..."
(cd "$ALBUMVAULT_DIR" && npm run build)

echo "📦 Copying AlbumVault into public/albumvault..."
rm -rf "$PUBLIC_DIR"
mkdir -p "$PUBLIC_DIR"
cp -r "$ALBUMVAULT_DIR/dist/"* "$PUBLIC_DIR/"
mkdir -p "$PUBLIC_DIR/covers"
cp "$ALBUMVAULT_DIR/public/covers/"* "$PUBLIC_DIR/covers/" 2>/dev/null || true

# SPA redirect: everything under /albumvault/ falls back to index.html
sed -i.bak '1i\
/albumvault/*  /albumvault/index.html  200!
' "$(cd "$(dirname "$0")/.." && pwd)/public/_redirects" 2>/dev/null || true

echo "✅ AlbumVault ready in public/albumvault/"
