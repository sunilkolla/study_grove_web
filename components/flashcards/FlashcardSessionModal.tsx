"use client";

import { useCallback, useEffect, useState } from "react";
import { BookOpen, Sparkles, X } from "lucide-react";
import { xpForSm2Rating, type Sm2Rating } from "@/lib/sm2";
import { notifyShellDataChanged } from "@/lib/shellEvents";
import {
  fetchDueFlashcardsForSubject,
  submitFlashcardReview,
  type DeckSummary,
} from "@/services/flashcardService";
import type { ExamBoard, YearGroup } from "@/types";
import type { DeckTopicSelection } from "./DeckTopicMultiSelect";
import { awardFlashcardReviewXp } from "@/services/userService";
import type { Flashcard } from "@/types";
import { SubjectIcon } from "@/components/common/SubjectIcon";
import { FlashcardFlipCard } from "./FlashcardFlipCard";

const SM2_BUTTONS: {
  rating: Sm2Rating;
  label: string;
  hint: string;
  className: string;
}[] = [
  {
    rating: "again",
    label: "Again",
    hint: `+${xpForSm2Rating("again")} XP`,
    className:
      "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800",
  },
  {
    rating: "hard",
    label: "Hard",
    hint: `+${xpForSm2Rating("hard")} XP`,
    className:
      "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800",
  },
  {
    rating: "good",
    label: "Good",
    hint: `+${xpForSm2Rating("good")} XP`,
    className:
      "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500 shadow-sm",
  },
  {
    rating: "easy",
    label: "Easy",
    hint: `+${xpForSm2Rating("easy")} XP`,
    className:
      "bg-sky-600 text-white border-sky-500 hover:bg-sky-500 shadow-sm",
  },
];

type FlashcardSessionModalProps = {
  deck: DeckSummary;
  yearGroup: YearGroup;
  examBoard: ExamBoard;
  topicSelection?: DeckTopicSelection;
  onClose: () => void;
  onSessionEnd: () => void;
};

function topicNodeIdsFromSelection(
  selection: DeckTopicSelection | undefined,
): string[] | undefined {
  if (!selection || selection === "mixed" || selection.length === 0) {
    return undefined;
  }
  return selection;
}

export function FlashcardSessionModal({
  deck,
  yearGroup,
  examBoard,
  topicSelection = "mixed",
  onClose,
  onSessionEnd,
}: FlashcardSessionModalProps) {
  const [queue, setQueue] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadQueue = useCallback(async () => {
    setLoading(true);
    const due = await fetchDueFlashcardsForSubject(
      deck.subject,
      { yearGroup, examBoard },
      { topicNodeIds: topicNodeIdsFromSelection(topicSelection) },
    );
    setQueue(due.length > 0 ? due : []);
    setIndex(0);
    setIsFlipped(false);
    setLoading(false);
  }, [deck.subject, yearGroup, examBoard, topicSelection]);

  useEffect(() => {
    void loadQueue();
  }, [loadQueue]);

  const current = queue[index];
  const isDone = !loading && (queue.length === 0 || index >= queue.length);

  const handleRate = async (rating: Sm2Rating) => {
    if (!current) return;
    const { xp } = await submitFlashcardReview(current.id, rating);
    await awardFlashcardReviewXp(xp);
    setSessionXp((s) => s + xp);
    notifyShellDataChanged();
    setIsFlipped(false);
    if (index + 1 < queue.length) {
      setIndex((i) => i + 1);
    } else {
      onSessionEnd();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-emerald-500/30 bg-white p-6 shadow-2xl dark:bg-[#1a2437]">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-[#2e4a73]">
          <div className="flex items-center gap-2.5">
            <SubjectIcon subject={deck.subject} size="md" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {deck.label} review
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-[#a0b9d9]">
                {loading
                  ? "Loading deck…"
                  : isDone
                    ? "Session complete"
                    : `Card ${index + 1} of ${queue.length} · SM-2`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-slate-500">Loading cards…</p>
        ) : isDone ? (
          <div className="space-y-4 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/50">
              <Sparkles className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-[#f4f7fb]">
              {queue.length === 0
                ? "No cards due right now — check back tomorrow."
                : `Deck cleared! +${sessionXp} XP this session.`}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500"
            >
              Back to decks
            </button>
          </div>
        ) : (
          current && (
            <div className="space-y-4 pt-4">
              <FlashcardFlipCard
                card={current}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped((f) => !f)}
              />

              {isFlipped ? (
                <div className="space-y-2">
                  <p className="text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]">
                    Rate recall (SM-2)
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {SM2_BUTTONS.map((btn) => (
                      <button
                        key={btn.rating}
                        type="button"
                        onClick={() => void handleRate(btn.rating)}
                        className={`rounded-xl border py-2.5 text-xs font-bold transition-colors ${btn.className}`}
                      >
                        {btn.label}
                        <span className="mt-0.5 block text-[10px] font-medium opacity-90">
                          {btn.hint}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-500"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Reveal answer
                </button>
              )}

              {sessionXp > 0 && (
                <p className="text-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Session XP: +{sessionXp}
                </p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}