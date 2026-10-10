import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseEnv } from "node:util";

const projectRoot = process.argv[2];
const envFiles = [".env", ".env.local", ".env.production", ".env.production.local"];
const publicSettings = new Map();

for (const envFile of envFiles) {
  try {
    const parsed = parseEnv(readFileSync(join(projectRoot, envFile), "utf8"));
    for (const [key, value] of Object.entries(parsed)) {
      if (key.startsWith("NEXT_PUBLIC_")) publicSettings.set(key, value);
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

for (const [key, value] of publicSettings) {
  process.stdout.write(`${key}=${value}\0`);
}
