import { generateCoInteriorQuestion, assertCoInteriorQuestion } from "./coInterior";
import {
  generateCfMedianPositionQuestion,
  assertCfMedianPositionQuestion,
} from "./cfMedianPosition";

export function runGeneratorSelfTests(): string[] {
  const errors: string[] = [];
  try {
    for (const given of [62, 88, 115]) {
      const q = generateCoInteriorQuestion({ given, idSuffix: String(given) });
      assertCoInteriorQuestion(q);
    }
    for (const n of [60, 80, 100]) {
      const q = generateCfMedianPositionQuestion(n, String(n));
      assertCfMedianPositionQuestion(q);
    }
  } catch (e) {
    errors.push(e instanceof Error ? e.message : String(e));
  }
  return errors;
}