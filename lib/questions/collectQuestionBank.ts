import type { PracticeQuestion } from "@/types";
import { mockQuestions } from "@/data/mockQuestions";

export function collectQuestionBank(): PracticeQuestion[] {
  return mockQuestions;
}