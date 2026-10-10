import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";

const port = 1106;
const baseUrl = `http://127.0.0.1:${port}`;
const projectRoot = new URL("..", import.meta.url).pathname;

async function waitForPreview(child) {
  const deadline = Date.now() + 5 * 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error("Preview exited before becoming ready.");
    try {
      const response = await fetch(`${baseUrl}/`);
      if (response.ok) return;
    } catch {
      // The isolated snapshot is still building.
    }
    await delay(1000);
  }
  throw new Error("Timed out waiting for isolated preview.");
}

async function assertRoutesServeLatestBuild() {
  for (const route of ["/", "/knowledge/striae-comparison"]) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, `${route} should remain available`);
    const html = await response.text();
    assert.match(html, /<!doctype html>/i, `${route} should return rendered HTML`);
    if (route === "/") {
      assert.match(html, /G-PREVIEWENVOVERRIDE/, "preview should retain caller public environment values");
    }
  }
}

test("running preview survives gate rebuild and repeated requests", { timeout: 10 * 60_000 }, async () => {
  const preview = spawn("bash", ["scripts/preview-isolated.sh"], {
    cwd: projectRoot,
    env: {
      ...process.env,
      PORT: String(port),
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-PREVIEWENVOVERRIDE",
    },
    stdio: "ignore",
  });

  try {
    await waitForPreview(preview);
    assert.ok(
      existsSync(join(projectRoot, ".preview-runtime", `project-${preview.pid}`, ".sites-runtime", "home")),
      "preview build should use the snapshot's project-scoped runtime",
    );
    await assertRoutesServeLatestBuild();

    const gate = spawn("npm", ["run", "build"], { stdio: "inherit" });
    const gateStatus = await new Promise((resolve, reject) => {
      gate.once("error", reject);
      gate.once("exit", (code) => resolve(code));
    });
    assert.equal(gateStatus, 0, "gate build should succeed while preview is running");

    await assertRoutesServeLatestBuild();
    await assertRoutesServeLatestBuild();
  } finally {
    preview.kill("SIGTERM");
    await new Promise((resolve) => {
      if (preview.exitCode !== null) resolve();
      else preview.once("exit", resolve);
    });
  }
});
