import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";

const projectRoot = new URL("..", import.meta.url).pathname;

async function waitForPreview(child, getPort) {
  const deadline = Date.now() + 5 * 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error("Preview exited before becoming ready.");
    const port = getPort();
    if (port !== null) {
      try {
        const response = await fetch(`http://127.0.0.1:${port}/`);
        if (response.ok) return port;
      } catch {
        // Vinext has logged its listener before the first request is accepted.
      }
    }
    await delay(1000);
  }
  throw new Error("Timed out waiting for isolated preview.");
}

async function assertRoutesServeLatestBuild(port) {
  for (const route of ["/", "/knowledge/striae-comparison"]) {
    const response = await fetch(`http://127.0.0.1:${port}${route}`);
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
      PORT: "0",
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-PREVIEWENVOVERRIDE",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let previewOutput = "";
  let port = null;
  const readOutput = (chunk) => {
    previewOutput += chunk.toString();
    const match = previewOutput.match(/Production server running at http:\/\/[^:\s]+:(\d+)/);
    if (match) port = Number(match[1]);
  };
  preview.stdout.on("data", readOutput);
  preview.stderr.on("data", readOutput);

  try {
    port = await waitForPreview(preview, () => port);
    assert.ok(port < 1104 || port > 1108, "test preview must avoid the AT preview port range");
    assert.ok(
      existsSync(join(projectRoot, ".preview-runtime", `project-${preview.pid}`, ".sites-runtime", "home")),
      "preview build should use the snapshot's project-scoped runtime",
    );
    await assertRoutesServeLatestBuild(port);

    const gate = spawn("npm", ["run", "build"], { stdio: "inherit" });
    const gateStatus = await new Promise((resolve, reject) => {
      gate.once("error", reject);
      gate.once("exit", (code) => resolve(code));
    });
    assert.equal(gateStatus, 0, "gate build should succeed while preview is running");

    await assertRoutesServeLatestBuild(port);
    await assertRoutesServeLatestBuild(port);
  } finally {
    preview.kill("SIGTERM");
    await new Promise((resolve) => {
      if (preview.exitCode !== null) resolve();
      else preview.once("exit", resolve);
    });
  }
});
