import { connection } from "next/server";
import { FlashcardsPageClient } from "@/components/flashcards/FlashcardsPageClient";
import {
  fetchDeckSummaries,
  fetchLeitnerBoxStats,
} from "@/services/flashcardService";
import { fetchUserStats } from "@/services/userService";

export default async function FlashcardsPage() {
  await connection();
  const [stats, decks, leitnerBoxes] = await Promise.all([
    fetchUserStats(),
    fetchDeckSummaries(),
    fetchLeitnerBoxStats(),
  ]);

  return (
    <FlashcardsPageClient
      initialYearGroup={stats.yearGroup}
      initialDecks={decks}
      initialLeitnerBoxes={leitnerBoxes}
    />
  );
}