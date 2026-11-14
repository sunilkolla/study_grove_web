import { mockQuestions } from "@/data/mockQuestions";
import type { PracticeQuestion, SubjectCode, YearGroup } from "@/types";

export type QuestionFilters = {
  yearGroup?: YearGroup;
  subject?: SubjectCode | "ALL";
};

function practiceYearForGroup(yearGroup: YearGroup): YearGroup {
  return yearGroup === "Year 8" ? "Year 9" : yearGroup;
}

export async function fetchPracticeQuestions(
  filters: QuestionFilters = {},
): Promise<PracticeQuestion[]> {
  const { yearGroup, subject } = filters;
  const practiceYear = yearGroup ? practiceYearForGroup(yearGroup) : undefined;
  return mockQuestions.filter((q) => {
    if (practiceYear && q.yearGroup !== practiceYear) return false;
    if (subject && subject !== "ALL" && q.subject !== subject) return false;
    return true;
  });
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