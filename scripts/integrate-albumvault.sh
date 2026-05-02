#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PUBLIC_DIR="$PROJECT_DIR/public/albumvault"

# Check if AlbumVault dist already exists in public/ (pre-built, committed)
if [ -f "$PUBLIC_DIR/index.html" ] && [ -f "$PUBLIC_DIR/assets/index-Ba8teeub.js" ]; then
  echo "✅ AlbumVault already in public/albumvault/ — skipping build"
  exit 0
fi

# Try local build if albumvault-brief project is available
ALBUMVAULT_DIR="$HOME/.openclaw/workspace/projects/albumvault-brief"
if [ -d "$ALBUMVAULT_DIR" ]; then
  echo "🔨 Building AlbumVault from local project..."
  (cd "$ALBUMVAULT_DIR" && npm run build)
  mkdir -p "$PUBLIC_DIR"
  cp -r "$ALBUMVAULT_DIR/dist/"* "$PUBLIC_DIR/"
  mkdir -p "$PUBLIC_DIR/covers"
  cp "$ALBUMVAULT_DIR/public/covers/"* "$PUBLIC_DIR/covers/" 2>/dev/null || true
  echo "✅ AlbumVault built and copied to public/albumvault/"
else
  echo "⚠️  AlbumVault source not found and no pre-built copy — skipping"
fi