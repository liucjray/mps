#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
preview_root="${project_root}/.preview-runtime/project-${BASHPID}"

command -v rsync >/dev/null || {
  echo "preview-isolated.sh requires rsync." >&2
  exit 69
}

mkdir -p "${preview_root}"
rsync -a \
  --exclude='/.git/' \
  --exclude='/node_modules/' \
  --exclude='/.env*' \
  --exclude='/dist/' \
  --exclude='/.next/' \
  --exclude='/.preview-runtime/' \
  --exclude='/.sites-runtime/' \
  --exclude='/.wrangler/' \
  "${project_root}/" "${preview_root}/"
ln -sfn "${project_root}/node_modules" "${preview_root}/node_modules"

cd "${preview_root}"
npm run build
exec env WRANGLER_LOG_PATH=.wrangler/wrangler.log \
  "${project_root}/node_modules/.bin/vinext" start --port "${PORT:-1102}"
