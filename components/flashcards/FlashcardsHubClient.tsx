"use client";

import { useCallback, useState } from "react";
import { BookOpen, Layers } from "lucide-react";
import { SubjectIcon } from "@/components/common/SubjectIcon";
import type {
  DeckSummary,
  LeitnerBoxStat,
} from "@/services/flashcardService";
import type { YearGroup } from "@/types";
import { FlashcardSessionModal } from "./FlashcardSessionModal";

const BOX_ACCENT: Record<number, string> = {
  1: "text-rose-600 dark:text-rose-400",
  2: "text-amber-600 dark:text-amber-400",
  3: "text-emerald-600 dark:text-emerald-400",
  4: "text-teal-600 dark:text-teal-400",
  5: "text-sky-600 dark:text-sky-400",
};

type FlashcardsHubClientProps = {
  yearGroup: YearGroup;
  decks: DeckSummary[];
  leitnerBoxes: LeitnerBoxStat[];
  onRefresh: () => void;
};

export function FlashcardsHubClient({
  yearGroup,
  decks,
  leitnerBoxes,
  onRefresh,
}: FlashcardsHubClientProps) {
  const [activeDeck, setActiveDeck] = useState<DeckSummary | null>(null);

  const masteredTotal = decks.reduce((sum, d) => sum + d.mastered, 0);

  const handleSessionEnd = useCallback(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-[#f4f7fb]">
            {yearGroup} Spaced Repetition Flashcards
          </h1>
        </div>
        <p className="text-xs text-slate-600 dark:text-[#a0b9d9]">
          Leitner boxes powered by SM-2 — review formulas, definitions, and GCSE
          keywords.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {leitnerBoxes.map((item) => (
          <div
            key={item.box}
            className="space-y-1 rounded-xl border border-slate-200/80 bg-white p-3.5 text-center shadow-sm dark:border-[#2e4a73] dark:bg-[#1a2437]"
          >
            <div className="text-[10px] font-black uppercase text-slate-500 dark:text-[#a0b9d9]">
              Leitner Box {item.box}
            </div>
            <div
              className={`font-mono text-2xl font-black ${BOX_ACCENT[item.box] ?? "text-slate-700"}`}
            >
              {item.count}
            </div>
            <p className="text-[10px] font-medium text-slate-600 dark:text-[#a0b9d9]">
              {item.interval}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-[#f4f7fb]">
            Subject decks ({decks.length})
          </h2>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {masteredTotal} cards in box 5
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <div
              key={deck.subject}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-emerald-500/50 dark:border-[#2e4a73] dark:bg-[#1a2437] dark:hover:border-emerald-400/50"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="transition-transform group-hover:scale-105">
                      <SubjectIcon subject={deck.subject} size="lg" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-[#f4f7fb]">
                        {deck.label}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-[#a0b9d9]">
                        {deck.totalCards} cards · {deck.dueToday} due today
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    {deck.progressPercent}%
                  </span>
                </div>
                <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-[#141d2e]">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${deck.progressPercent}%` }}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDeck(deck)}
                className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-emerald-600 hover:text-white active:scale-95 dark:bg-[#22334d] dark:text-[#cdd9ea] dark:hover:bg-emerald-600"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Review {deck.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeDeck && (
        <FlashcardSessionModal
          deck={activeDeck}
          onClose={() => setActiveDeck(null)}
          onSessionEnd={handleSessionEnd}
        />
      )}
    </div>
  );
}