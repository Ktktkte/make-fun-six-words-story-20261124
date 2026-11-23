import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const storyPath = join(here, "entry.txt");
const raw = readFileSync(storyPath, "utf8");
const story = raw.trim();

const words = story.split(/\s+/).filter(Boolean);
if (words.length !== 6) {
  console.error(`error: entry must be exactly six words, got ${words.length}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, raw);
if (!existsSync(outPath)) {
  console.error("error: failed to write entry.txt");
  process.exit(1);
}
