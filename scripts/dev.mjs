import { execSync, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function resolveBun() {
  const bunName = process.platform === "win32" ? "bun.exe" : "bun";
  const candidates = [
    process.env.BUN_EXECUTABLE,
    process.env.BUN_INSTALL && path.join(process.env.BUN_INSTALL, "bin", bunName),
    path.join(os.homedir(), ".bun", "bin", bunName),
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  try {
    const cmd = process.platform === "win32" ? "where bun" : "which bun";
    const found = execSync(cmd, { encoding: "utf8" }).trim().split(/\r?\n/)[0];
    if (found && existsSync(found)) return found;
  } catch {
    // not on PATH
  }

  return bunName;
}

const bun = resolveBun();

const procs = [
  spawn(bun, ["--hot", "index.ts"], { cwd: root, stdio: "inherit", shell: false }),
  spawn(bun, ["x", "--bun", "prisma", "studio"], { cwd: root, stdio: "inherit", shell: false }),
  spawn(bun, ["run", "dev"], { cwd: path.join(root, "frontend"), stdio: "inherit", shell: false }),
];

const shutdown = () => {
  for (const proc of procs) proc.kill();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

await Promise.race(
  procs.map(
    (proc) =>
      new Promise((resolve) => {
        proc.on("exit", resolve);
      }),
  ),
);
shutdown();
