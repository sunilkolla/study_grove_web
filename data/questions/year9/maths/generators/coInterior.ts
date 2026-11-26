import type { PracticeQuestion } from "@/types";
import { baseYear9Question, topicCode } from "../../helpers";

const GEO = "Geometrical Reasoning";

export type CoInteriorSeed = { given: number; idSuffix: string };

export function generateCoInteriorQuestion(
  seed: CoInteriorSeed,
): PracticeQuestion {
  const other = 180 - seed.given;
  const options = [`${other}°`, `${seed.given}°`, `90°`, `${360 - seed.given}°`];
  const correct = 0;
  return baseYear9Question({
    id: `q-y9-mat-gen-co-${seed.idSuffix}`,
    subject: "MATHS",
    subjectName: "Mathematics",
    topicCode: topicCode("MAT", "1.1"),
    topicName: GEO,
    subskillId: "MAT.1.1.co_interior",
    status: "draft",
    source: "original",
    questionText: `Use the diagram. Parallel lines are cut by a transversal. One co-interior angle is ${seed.given}°.\n\nWork out the size of the other co-interior angle.`,
    options,
    correctAnswerIndex: correct,
    explanation: `Co-interior angles are supplementary: 180° − ${seed.given}° = ${other}°.`,
    examTip: "Co-interior (same-side interior) angles add to 180°.",
    difficulty: "Foundation",
    xpReward: 20,
    diagramParams: {
      kind: "parallelLines",
      lineA: "L",
      lineB: "M",
      givenAngle: seed.given,
      unknownLabel: "?",
      angleRelation: "coInterior",
    },
    distractorRationale: [
      `Correct: 180 − ${seed.given} = ${other}°`,
      `Error: treated as equal angles`,
      `Error: assumed right angle`,
      `Error: used full turn subtraction`,
    ],
  });
}

export function assertCoInteriorQuestion(q: PracticeQuestion): void {
  const match = q.questionText.match(/(\d+)°/);
  if (!match) throw new Error(`No angle in stem: ${q.id}`);
  const given = Number(match[1]);
  const expected = `${180 - given}°`;
  if (q.options[q.correctAnswerIndex] !== expected) {
    throw new Error(
      `${q.id}: expected correct option ${expected}, got ${q.options[q.correctAnswerIndex]}`,
    );
  }
}