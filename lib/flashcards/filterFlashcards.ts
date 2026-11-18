import type { ExamBoard, Flashcard, YearGroup } from "@/types";

const MIN_BOARD_MATCH = 3;

export type FlashcardFilters = {
  yearGroup?: YearGroup;
  examBoard?: ExamBoard;
};

function practiceYearForGroup(yearGroup: YearGroup): YearGroup {
  return yearGroup === "Year 8" ? "Year 9" : yearGroup;
}

export function filterFlashcardsForProfile(
  cards: Flashcard[],
  filters: FlashcardFilters,
): Flashcard[] {
  const { yearGroup, examBoard } = filters;
  if (!yearGroup) return cards.map((c) => ({ ...c }));

  const practiceYear = practiceYearForGroup(yearGroup);
  const byYear = cards.filter((c) => {
    if (!c.yearGroup) return false;
    return c.yearGroup === practiceYear;
  });

  if (!examBoard) return byYear.map((c) => ({ ...c }));

  const byBoard = byYear.filter((c) => c.examBoard === examBoard);
  return byBoard.length >= MIN_BOARD_MATCH
    ? byBoard.map((c) => ({ ...c }))
    : byYear.map((c) => ({ ...c }));
}