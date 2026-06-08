import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.join(import.meta.dir, "..");

function resolveBun() {
  const candidates = [
    process.env.BUN_INSTALL &&
      path.join(process.env.BUN_INSTALL, "bin", process.platform === "win32" ? "bun.exe" : "bun"),
    path.join(os.homedir(), ".bun", "bin", process.platform === "win32" ? "bun.exe" : "bun"),
    process.execPath,
  ].filter((candidate): candidate is string => Boolean(candidate));

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  throw new Error("Could not find bun executable. Install from https://bun.com");
}

const bun = resolveBun();

const procs = [
  Bun.spawn([bun, "--hot", "index.ts"], {
    cwd: root,
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
  }),
  Bun.spawn([bun, "x", "--bun", "prisma", "studio"], {
    cwd: root,
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
  }),
  Bun.spawn([bun, "run", "dev"], {
    cwd: path.join(root, "frontend"),
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
  }),
];

const shutdown = () => {
  for (const proc of procs) proc.kill();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

await Promise.race(procs.map((proc) => proc.exited));
shutdown();
