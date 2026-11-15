/** Anki-style quality mapped to classic SM-2 (0–5). */
export type Sm2Rating = "again" | "hard" | "good" | "easy";

const RATING_TO_QUALITY: Record<Sm2Rating, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

export type Sm2CardState = {
  repetition: number;
  easeFactor: number;
  intervalDays: number;
};

export type Sm2ScheduleResult = Sm2CardState & {
  boxNumber: number;
  nextReviewDate: string;
};

const MIN_EASE = 1.3;

function addDays(from: Date, days: number): string {
  const next = new Date(from);
  next.setDate(next.getDate() + Math.max(1, Math.round(days)));
  return next.toISOString().slice(0, 10);
}

function intervalToLeitnerBox(intervalDays: number, repetition: number): number {
  if (repetition <= 0) return 1;
  if (intervalDays < 3) return 2;
  if (intervalDays < 7) return 3;
  if (intervalDays < 14) return 4;
  return 5;
}

export function initialSm2State(): Sm2CardState {
  return {
    repetition: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  };
}

/** SuperMemo-2 schedule update after a review. */
export function scheduleSm2Review(
  state: Sm2CardState,
  rating: Sm2Rating,
  reviewedOn = new Date(),
): Sm2ScheduleResult {
  const q = RATING_TO_QUALITY[rating];
  let { repetition, easeFactor, intervalDays } = state;

  if (q < 3) {
    repetition = 0;
    intervalDays = 1;
  } else {
    if (repetition === 0) {
      intervalDays = 1;
    } else if (repetition === 1) {
      intervalDays = rating === "hard" ? 3 : 6;
    } else {
      const multiplier =
        rating === "easy" ? easeFactor * 1.3 : rating === "hard" ? easeFactor * 0.85 : easeFactor;
      intervalDays = Math.max(1, Math.round(intervalDays * multiplier));
    }
    repetition += 1;
    easeFactor = Math.max(
      MIN_EASE,
      easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)),
    );
    if (rating === "easy") {
      intervalDays = Math.round(intervalDays * 1.25);
    }
  }

  return {
    repetition,
    easeFactor,
    intervalDays,
    boxNumber: intervalToLeitnerBox(intervalDays, repetition),
    nextReviewDate: addDays(reviewedOn, intervalDays || 1),
  };
}

export function xpForSm2Rating(rating: Sm2Rating): number {
  switch (rating) {
    case "again":
      return 5;
    case "hard":
      return 8;
    case "good":
      return 12;
    case "easy":
      return 15;
  }
}