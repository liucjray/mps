#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
preview_runtime="${project_root}/.preview-runtime"

command -v rsync >/dev/null || {
  echo "preview-isolated.sh requires rsync." >&2
  exit 69
}

mkdir -p "${preview_runtime}"
preview_root="$(mktemp -d "${preview_runtime}/project-XXXXXXXX")"
echo "Preview snapshot: ${preview_root}"
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

while IFS= read -r -d '' public_setting; do
  public_key="${public_setting%%=*}"
  if [[ ! -v "${public_key}" ]]; then
    export "${public_setting}"
  fi
done < <(node "${project_root}/scripts/preview-public-env.mjs" "${project_root}")

cd "${preview_root}"
# A caller may itself be running inside sites-env.sh. Force the snapshot's
# build scripts to initialize their own project-scoped environment.
unset SITES_ENV_READY SITES_PROJECT_ROOT
npm run build
exec env WRANGLER_LOG_PATH=.wrangler/wrangler.log \
  "${project_root}/node_modules/.bin/vinext" start --port "${PORT:-1102}"
