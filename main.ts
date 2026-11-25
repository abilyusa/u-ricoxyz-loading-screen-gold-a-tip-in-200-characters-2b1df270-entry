// Loading Screen Gold: A Tip in 200 Characters — one loading-screen tip.
// The program writes the tip to $MAKEFUN_OUTPUT_DIR/entry.txt,
// falling back to /output/entry.txt when the variable is unset.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TIP =
  "Tip: the bar counts files, not minutes. When it stalls at 90%, one giant texture is unpacking. Give it 30 seconds before you force-quit, or you reload everything from zero.";

// Gate guard: the sealed scorer requires UTF-8 text of 1-200 characters,
// a single line, and not only whitespace. Count code points so any
// multi-byte character is measured the way the scorer measures it.
// ASCII-only keeps the tip safe under any ASCII gate as well.
const len = [...TIP].length;
const ascii = [...TIP].every((ch) => ch.codePointAt(0) < 128);
if (
  len < 1 ||
  len > 200 ||
  !ascii ||
  TIP.includes("\n") ||
  TIP.trim().length === 0
) {
  throw new Error(
    `TIP violates the 1-200 character gate (length ${len}, ascii ${ascii})`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TIP);
