import { year9Questions } from "@/data/questions/year9";
import { flashcardFromPracticeQuestion } from "@/lib/flashcards/fromPracticeQuestion";

export const year9Flashcards = year9Questions.map(flashcardFromPracticeQuestion);
export const YEAR9_FLASHCARD_COUNT = year9Flashcards.length;