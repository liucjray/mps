import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

test("preview environment helper forwards only public settings with production dotenv precedence", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/preview-public-env.mjs", "tests/fixtures/preview-env"],
    { cwd: projectRoot, encoding: "utf8" },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "NEXT_PUBLIC_PREVIEW_ENV=production-local\0");
  assert.doesNotMatch(result.stdout, /PRIVATE_PREVIEW_ENV/);
});
