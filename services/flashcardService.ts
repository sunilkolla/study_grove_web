import { mockFlashcards } from "@/data/mockFlashcards";
import type { Flashcard, SubjectCode } from "@/types";

export async function fetchFlashcards(): Promise<Flashcard[]> {
  return mockFlashcards;
}

export async function fetchFlashcardsBySubject(
  subject: SubjectCode,
): Promise<Flashcard[]> {
  return mockFlashcards.filter((c) => c.subject === subject);
}

export async function fetchFlashcardById(
  id: string,
): Promise<Flashcard | undefined> {
  return mockFlashcards.find((c) => c.id === id);
}