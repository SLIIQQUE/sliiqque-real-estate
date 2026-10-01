// Enforces the project standard: no source file may exceed MAX_LINES lines.
// Run via `npm run check:length` (also runs automatically before `npm run build`).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const MAX_LINES = 300;
const ROOT = process.cwd();
const EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
]);
const IGNORED = new Set([
  "node_modules",
  ".next",
  ".git",
  "_legacy-static",
  "out",
  // Generated Payload migrations (`npm run payload migrate:create`) and uploaded files.
  "migrations",
  "media",
]);
// Tool-generated files that cannot be split (regenerate, never hand-edit).
const IGNORED_FILES = new Set([
  "next-env.d.ts",
  "package-lock.json",
  "payload-types.ts",
]);

const offenders = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (IGNORED.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (EXTENSIONS.has(extname(name)) && !IGNORED_FILES.has(name)) {
      const lines = readFileSync(path, "utf8").split("\n").length;
      if (lines > MAX_LINES)
        offenders.push({ path: path.slice(ROOT.length + 1), lines });
    }
  }
}

walk(ROOT);

if (offenders.length) {
  console.error(`\n✖ File length limit exceeded (max ${MAX_LINES} lines):\n`);
  for (const { path, lines } of offenders)
    console.error(`  ${path}: ${lines} lines`);
  console.error(
    "\nSplit these into smaller components/modules. See CLAUDE.md > Code standards.\n",
  );
  process.exit(1);
}
console.log(`✔ All source files are within ${MAX_LINES} lines.`);
