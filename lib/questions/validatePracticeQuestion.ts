import type { PracticeQuestion, QuestionDifficulty } from "@/types";

const DIFFICULTIES: QuestionDifficulty[] = [
  "Foundation",
  "Intermediate",
  "Higher",
];

export type QuestionValidationIssue = {
  id: string;
  rule: string;
  message: string;
};

export function validatePracticeQuestion(q: PracticeQuestion): QuestionValidationIssue[] {
  const issues: QuestionValidationIssue[] = [];
  const push = (rule: string, message: string) =>
    issues.push({ id: q.id, rule, message });

  if (!q.id?.trim()) push("id", "Missing id");
  if (!q.explanation?.trim()) push("explanation", "Explanation is required");
  if (!DIFFICULTIES.includes(q.difficulty)) {
    push("difficulty", `Invalid difficulty: ${q.difficulty}`);
  }
  if (q.options.length !== 4) {
    push("options", `Expected 4 options, got ${q.options.length}`);
  }
  const uniqueOptions = new Set(q.options);
  if (uniqueOptions.size !== q.options.length) {
    push("options", "Options must be distinct");
  }
  if (q.correctAnswerIndex < 0 || q.correctAnswerIndex > 3) {
    push("correctAnswerIndex", `Out of range: ${q.correctAnswerIndex}`);
  }

  const mentionsDiagram =
    /\bdiagram\b/i.test(q.questionText) ||
    /\bgraph shows\b/i.test(q.questionText) ||
    /\bchart shows\b/i.test(q.questionText);
  if (mentionsDiagram && !q.diagramKey && !q.diagramParams) {
    push("diagram", "Stem mentions a diagram but neither diagramKey nor diagramParams is set");
  }

  if (q.distractorRationale && q.distractorRationale.length !== 4) {
    push("distractorRationale", "distractorRationale must have exactly 4 entries");
  }

  if (q.status === "reviewed" && !q.subskillId) {
    push("subskillId", 'Reviewed items should set subskillId (e.g. "MAT.3.3.cf_median")');
  }

  return issues;
}

export function validateQuestionBank(questions: PracticeQuestion[]): QuestionValidationIssue[] {
  const issues: QuestionValidationIssue[] = [];
  const seenIds = new Set<string>();

  for (const q of questions) {
    issues.push(...validatePracticeQuestion(q));
    if (seenIds.has(q.id)) {
      issues.push({
        id: q.id,
        rule: "id_unique",
        message: `Duplicate question id: ${q.id}`,
      });
    }
    seenIds.add(q.id);
  }

  return issues;
}