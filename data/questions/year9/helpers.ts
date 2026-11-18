import type { ExamBoard, PracticeQuestion, YearGroup } from "@/types";

export const YEAR9_GROUP: YearGroup = "Year 9";
export const YEAR9_BOARD: ExamBoard = "AQA";

/** e.g. topicCode("BIO", "4.1.1") → BIO-AQA-4.1.1 */
export function topicCode(prefix: string, subtopicCode: string): string {
  return `${prefix}-AQA-${subtopicCode}`;
}

export function baseYear9Question(
  partial: Omit<
    PracticeQuestion,
    "yearGroup" | "examBoard" | "options" | "correctAnswerIndex"
  > &
    Pick<PracticeQuestion, "options" | "correctAnswerIndex">,
): PracticeQuestion {
  return {
    ...partial,
    yearGroup: YEAR9_GROUP,
    examBoard: YEAR9_BOARD,
  };
}