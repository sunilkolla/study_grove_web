"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchDeckSummaries,
  fetchLeitnerBoxStats,
  type DeckSummary,
  type LeitnerBoxStat,
} from "@/services/flashcardService";
import type { YearGroup } from "@/types";
import { FlashcardsHubClient } from "./FlashcardsHubClient";

type FlashcardsPageClientProps = {
  initialYearGroup: YearGroup;
  initialDecks: DeckSummary[];
  initialLeitnerBoxes: LeitnerBoxStat[];
};

export function FlashcardsPageClient({
  initialYearGroup,
  initialDecks,
  initialLeitnerBoxes,
}: FlashcardsPageClientProps) {
  const router = useRouter();
  const [decks, setDecks] = useState(initialDecks);
  const [leitnerBoxes, setLeitnerBoxes] = useState(initialLeitnerBoxes);

  const handleRefresh = useCallback(async () => {
    const [nextDecks, nextBoxes] = await Promise.all([
      fetchDeckSummaries(),
      fetchLeitnerBoxStats(),
    ]);
    setDecks(nextDecks);
    setLeitnerBoxes(nextBoxes);
    router.refresh();
  }, [router]);

  return (
    <FlashcardsHubClient
      yearGroup={initialYearGroup}
      decks={decks}
      leitnerBoxes={leitnerBoxes}
      onRefresh={() => void handleRefresh()}
    />
  );
}