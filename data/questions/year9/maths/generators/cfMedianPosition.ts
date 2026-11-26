import type { PracticeQuestion } from "@/types";
import { baseYear9Question, topicCode } from "../../helpers";

const STAT = "Statistics";

export function generateCfMedianPositionQuestion(
  n: number,
  idSuffix: string,
): PracticeQuestion {
  const medianPos = n / 2;
  return baseYear9Question({
    id: `q-y9-mat-gen-cfpos-${idSuffix}`,
    subject: "MATHS",
    subjectName: "Mathematics",
    topicCode: topicCode("MAT", "3.3"),
    topicName: STAT,
    subskillId: "MAT.3.3.cf_median_position",
    status: "draft",
    source: "original",
    questionText: `The cumulative frequency graph shows the distribution of scores for ${n} students.\n\nOn the cumulative frequency axis, how far up should you read to estimate the median?`,
    options: [`${medianPos}`, `${n}`, `${n / 4}`, `${n - 10}`],
    correctAnswerIndex: 0,
    explanation: `Median position is half the total frequency: ${n} ÷ 2 = ${medianPos}.`,
    examTip: "On a CF curve, median ↔ n/2 on the vertical axis.",
    difficulty: "Foundation",
    xpReward: 20,
    diagramParams: {
      kind: "cumulativeFrequency",
      title: `Test scores — ${n} students`,
      xLabel: "Score",
      yLabel: "Cumulative frequency",
      xMin: 0,
      xMax: 100,
      xStep: 10,
      yMax: n,
      yStep: n / 5,
      totalFrequency: n,
      points: [
        { x: 20, cf: Math.round(n * 0.12) },
        { x: 40, cf: Math.round(n * 0.35) },
        { x: 60, cf: Math.round(n * 0.62) },
        { x: 80, cf: Math.round(n * 0.88) },
        { x: 100, cf: n },
      ],
      highlight: { type: "cfPosition", cfValue: medianPos },
    },
    distractorRationale: [
      `Correct: n/2 = ${medianPos}`,
      `Error: used full n`,
      `Error: used n/4 (lower quartile position)`,
      `Error: arbitrary offset from n`,
    ],
  });
}

export function assertCfMedianPositionQuestion(q: PracticeQuestion): void {
  const match = q.questionText.match(/(\d+) students/);
  if (!match) throw new Error(`No student count in stem: ${q.id}`);
  const n = Number(match[1]);
  const expected = `${n / 2}`;
  if (q.options[q.correctAnswerIndex] !== expected) {
    throw new Error(`${q.id}: expected ${expected}`);
  }
}