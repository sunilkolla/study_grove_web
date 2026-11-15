import { mockFlashcards } from "@/data/mockFlashcards";
import { initialSm2State, scheduleSm2Review, xpForSm2Rating, type Sm2Rating } from "@/lib/sm2";
import type { Flashcard, FlashcardReview, SubjectCode } from "@/types";
import {
  getSessionFlashcardReview,
  getSessionFlashcardReviews,
  setSessionFlashcardReview,
} from "./mockSessionStore";

const MOCK_USER_ID = "user-hansi";

export type DeckSummary = {
  subject: SubjectCode;
  label: string;
  totalCards: number;
  dueToday: number;
  mastered: number;
  progressPercent: number;
};

export type LeitnerBoxStat = {
  box: number;
  interval: string;
  count: number;
};

const SUBJECT_LABELS: Record<SubjectCode, string> = {
  MATHS: "Maths",
  ENGLISH_LANGUAGE: "English Language",
  ENGLISH_LITERATURE: "English Literature",
  BIOLOGY: "Biology",
  CHEMISTRY: "Chemistry",
  PHYSICS: "Physics",
  COMBINED_SCIENCE: "Combined Science",
  COMPUTER_SCIENCE: "Computer Science",
  HISTORY: "History",
  GEOGRAPHY: "Geography",
};

const LEITNER_INTERVALS: Record<number, string> = {
  1: "Every day",
  2: "Every 3 days",
  3: "Every week",
  4: "Every 2 weeks",
  5: "Mastered",
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function ensureReview(flashcardId: string): FlashcardReview {
  const existing = getSessionFlashcardReview(flashcardId);
  if (existing) return existing;
  const fresh = scheduleSm2Review(initialSm2State(), "again");
  const review: FlashcardReview = {
    id: `rev-${flashcardId}`,
    userId: MOCK_USER_ID,
    flashcardId,
    boxNumber: 1,
    easeFactor: fresh.easeFactor,
    intervalDays: 0,
    nextReviewDate: todayIso(),
  };
  setSessionFlashcardReview(review);
  return review;
}

export async function fetchFlashcards(): Promise<Flashcard[]> {
  return mockFlashcards.map((c) => ({ ...c }));
}

export async function fetchFlashcardsBySubject(
  subject: SubjectCode,
): Promise<Flashcard[]> {
  return mockFlashcards.filter((c) => c.subject === subject).map((c) => ({ ...c }));
}

export async function fetchFlashcardById(
  id: string,
): Promise<Flashcard | undefined> {
  const card = mockFlashcards.find((c) => c.id === id);
  return card ? { ...card } : undefined;
}

export async function fetchLeitnerBoxStats(): Promise<LeitnerBoxStat[]> {
  const reviews = Object.values(getSessionFlashcardReviews());
  return [1, 2, 3, 4, 5].map((box) => ({
    box,
    interval: LEITNER_INTERVALS[box] ?? `Box ${box}`,
    count: reviews.filter((r) => r.boxNumber === box).length,
  }));
}

export async function fetchDeckSummaries(): Promise<DeckSummary[]> {
  const reviews = getSessionFlashcardReviews();
  const today = todayIso();
  const subjects = [
    ...new Set(mockFlashcards.map((c) => c.subject)),
  ] as SubjectCode[];

  return subjects.map((subject) => {
    const cards = mockFlashcards.filter((c) => c.subject === subject);
    const dueToday = cards.filter((c) => {
      const rev = reviews[c.id] ?? ensureReview(c.id);
      return rev.nextReviewDate <= today;
    }).length;
    const mastered = cards.filter((c) => (reviews[c.id]?.boxNumber ?? 1) >= 5).length;
    const progressPercent =
      cards.length > 0 ? Math.round((mastered / cards.length) * 100) : 0;
    return {
      subject,
      label: SUBJECT_LABELS[subject] ?? subject,
      totalCards: cards.length,
      dueToday,
      mastered,
      progressPercent: Math.max(progressPercent, dueToday > 0 ? 8 : 0),
    };
  });
}

export async function fetchDueFlashcardsForSubject(
  subject: SubjectCode,
): Promise<Flashcard[]> {
  const today = todayIso();
  const reviews = getSessionFlashcardReviews();
  return mockFlashcards
    .filter((c) => c.subject === subject)
    .filter((c) => {
      const rev = reviews[c.id] ?? ensureReview(c.id);
      return rev.nextReviewDate <= today;
    })
    .map((c) => ({ ...c }));
}

export type SubmitReviewResult = {
  review: FlashcardReview;
  xp: number;
};

export async function submitFlashcardReview(
  flashcardId: string,
  rating: Sm2Rating,
): Promise<SubmitReviewResult> {
  const prev = ensureReview(flashcardId);
  const sm2Prev = {
    repetition: Math.max(0, prev.boxNumber - 1),
    easeFactor: prev.easeFactor,
    intervalDays: prev.intervalDays || 0,
  };
  const scheduled = scheduleSm2Review(sm2Prev, rating);
  const review: FlashcardReview = {
    ...prev,
    boxNumber: scheduled.boxNumber,
    easeFactor: scheduled.easeFactor,
    intervalDays: scheduled.intervalDays,
    nextReviewDate: scheduled.nextReviewDate,
  };
  setSessionFlashcardReview(review);
  return { review, xp: xpForSm2Rating(rating) };
}

export { SUBJECT_LABELS };