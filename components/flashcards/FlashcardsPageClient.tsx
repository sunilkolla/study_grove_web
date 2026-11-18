"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SHELL_DATA_CHANGED } from "@/lib/shellEvents";
import {
  fetchDeckSummaries,
  fetchLeitnerBoxStats,
  type DeckSummary,
  type LeitnerBoxStat,
} from "@/services/flashcardService";
import { fetchUserStats } from "@/services/userService";
import type { ExamBoard, YearGroup } from "@/types";
import { FlashcardsHubClient } from "./FlashcardsHubClient";

type FlashcardsPageClientProps = {
  initialYearGroup: YearGroup;
  initialExamBoard: ExamBoard;
  initialDecks: DeckSummary[];
  initialLeitnerBoxes: LeitnerBoxStat[];
};

export function FlashcardsPageClient({
  initialYearGroup,
  initialExamBoard,
  initialDecks,
  initialLeitnerBoxes,
}: FlashcardsPageClientProps) {
  const router = useRouter();
  const [yearGroup, setYearGroup] = useState(initialYearGroup);
  const [examBoard, setExamBoard] = useState(initialExamBoard);
  const [decks, setDecks] = useState(initialDecks);
  const [leitnerBoxes, setLeitnerBoxes] = useState(initialLeitnerBoxes);

  const reloadDecks = useCallback(async () => {
    const stats = await fetchUserStats();
    const board = stats.examBoard ?? "AQA";
    const filters = { yearGroup: stats.yearGroup, examBoard: board };
    const [nextDecks, nextBoxes] = await Promise.all([
      fetchDeckSummaries(filters),
      fetchLeitnerBoxStats(filters),
    ]);
    setYearGroup(stats.yearGroup);
    setExamBoard(board);
    setDecks(nextDecks);
    setLeitnerBoxes(nextBoxes);
  }, []);

  useEffect(() => {
    setYearGroup(initialYearGroup);
    setExamBoard(initialExamBoard);
    setDecks(initialDecks);
    setLeitnerBoxes(initialLeitnerBoxes);
  }, [initialYearGroup, initialExamBoard, initialDecks, initialLeitnerBoxes]);

  useEffect(() => {
    void reloadDecks();
    const onShell = () => void reloadDecks();
    window.addEventListener(SHELL_DATA_CHANGED, onShell);
    return () => window.removeEventListener(SHELL_DATA_CHANGED, onShell);
  }, [reloadDecks]);

  const handleRefresh = useCallback(async () => {
    await reloadDecks();
    router.refresh();
  }, [reloadDecks, router]);

  return (
    <FlashcardsHubClient
      yearGroup={yearGroup}
      examBoard={examBoard}
      decks={decks}
      leitnerBoxes={leitnerBoxes}
      onRefresh={() => void handleRefresh()}
    />
  );
}