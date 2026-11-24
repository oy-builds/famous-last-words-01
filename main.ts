import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Final: the phone kept its owner's whole life alive — boarding pass,
// alarm, the unsent text — and the owner spends its last breath on the
// weather. The punch lands on the most banal errand of all.
const ENTRY =
  "I dimmed myself to a whisper, kept your boarding pass, your alarm, and your ex's unread text alive — and you spent my last breath checking if it might rain tomorrow.";

const MAX_CHARS = 199;

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`,
    );
  }
  if (/[\r\n]/.test(ENTRY)) {
    throw new Error("entry must be a single line");
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and verify what landed on disk is exactly the entry.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error(`read-back mismatch: ${outPath} differs from entry`);
  }
  console.log(ENTRY);
}

main();
