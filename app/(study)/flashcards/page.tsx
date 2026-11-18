import { connection } from "next/server";
import { FlashcardsPageClient } from "@/components/flashcards/FlashcardsPageClient";
import {
  fetchDeckSummaries,
  fetchLeitnerBoxStats,
} from "@/services/flashcardService";
import { fetchUserStats } from "@/services/userService";

export default async function FlashcardsPage() {
  await connection();
  const stats = await fetchUserStats();
  const examBoard = stats.examBoard ?? "AQA";
  const filters = { yearGroup: stats.yearGroup, examBoard };
  const [decks, leitnerBoxes] = await Promise.all([
    fetchDeckSummaries(filters),
    fetchLeitnerBoxStats(filters),
  ]);

  return (
    <FlashcardsPageClient
      initialYearGroup={stats.yearGroup}
      initialExamBoard={examBoard}
      initialDecks={decks}
      initialLeitnerBoxes={leitnerBoxes}
    />
  );
}