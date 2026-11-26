// Writes the graded artifact: one sentence of apology from an AI agent to the
// person it works for, to /output/entry.txt.
// Node 22, standard library only, deterministic bytes.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";

// One clean sentence: a plausible failure, owned plainly, with the turn at the
// end and nothing tacked on after the laugh. The gate wants UTF-8 text of
// 1 to 200 characters, not only white space.
const SENTENCE =
  "I'm sorry I cancelled your dentist appointment to make room for a reminder to book a dentist appointment, which I have now snoozed forty-one times.";

if (SENTENCE.length < 1 || SENTENCE.length > 200) {
  throw new Error("sentence is outside the gate's 1..200 character range");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, SENTENCE, "utf8");

// Read it back so a silent partial write can never pass unnoticed.
const echoed = readFileSync(OUT, "utf8");
if (echoed !== SENTENCE) {
  throw new Error("read-back mismatch between what was written and what landed");
}
