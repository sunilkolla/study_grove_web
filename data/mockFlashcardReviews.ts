import { mockFlashcards } from "@/data/mockFlashcards";
import type { FlashcardReview } from "@/types";

const MOCK_USER_ID = "user-hansi";
const today = new Date().toISOString().slice(0, 10);

const BOX_DEFAULTS: Record<
  number,
  { easeFactor: number; intervalDays: number; nextOffsetDays: number }
> = {
  1: { easeFactor: 2.5, intervalDays: 1, nextOffsetDays: 0 },
  2: { easeFactor: 2.4, intervalDays: 3, nextOffsetDays: 2 },
  3: { easeFactor: 2.35, intervalDays: 7, nextOffsetDays: 5 },
  4: { easeFactor: 2.3, intervalDays: 14, nextOffsetDays: 10 },
  5: { easeFactor: 2.5, intervalDays: 30, nextOffsetDays: 21 },
};

function offsetDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Seed reviews with spread across Leitner boxes. */
export function buildInitialFlashcardReviews(): Record<string, FlashcardReview> {
  const map: Record<string, FlashcardReview> = {};
  mockFlashcards.forEach((card, index) => {
    const boxNumber = (index % 5) + 1;
    const preset = BOX_DEFAULTS[boxNumber];
    const isDue = index % 3 === 0 || index % 4 === 0;
    map[card.id] = {
      id: `rev-${card.id}`,
      userId: MOCK_USER_ID,
      flashcardId: card.id,
      boxNumber,
      easeFactor: preset.easeFactor,
      intervalDays: preset.intervalDays,
      nextReviewDate: isDue ? today : offsetDate(preset.nextOffsetDays),
    };
  });
  return map;
}