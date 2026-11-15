import { mockQuestions } from "@/data/mockQuestions";
import type { ExamBoard, PracticeQuestion, SubjectCode, YearGroup } from "@/types";

const MIN_BOARD_MATCH = 3;

export type QuestionFilters = {
  yearGroup?: YearGroup;
  subject?: SubjectCode | "ALL";
  examBoard?: ExamBoard;
};

function practiceYearForGroup(yearGroup: YearGroup): YearGroup {
  return yearGroup === "Year 8" ? "Year 9" : yearGroup;
}

export async function fetchPracticeQuestions(
  filters: QuestionFilters = {},
): Promise<PracticeQuestion[]> {
  const { yearGroup, subject, examBoard } = filters;
  const practiceYear = yearGroup ? practiceYearForGroup(yearGroup) : undefined;
  const byYearAndSubject = mockQuestions.filter((q) => {
    if (practiceYear && q.yearGroup !== practiceYear) return false;
    if (subject && subject !== "ALL" && q.subject !== subject) return false;
    return true;
  });
  if (!examBoard) return byYearAndSubject;
  const byBoard = byYearAndSubject.filter((q) => q.examBoard === examBoard);
  return byBoard.length >= MIN_BOARD_MATCH ? byBoard : byYearAndSubject;
}

export async function fetchQuestionById(
  id: string,
): Promise<PracticeQuestion | undefined> {
  return mockQuestions.find((q) => q.id === id);
}

export async function fetchDailyQuizSet(
  yearGroup: YearGroup,
  limit = 5,
): Promise<PracticeQuestion[]> {
  const pool = await fetchPracticeQuestions({ yearGroup });
  return pool.slice(0, limit);
}