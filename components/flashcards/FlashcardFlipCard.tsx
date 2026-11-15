"use client";

import { RotateCw } from "lucide-react";
import type { Flashcard } from "@/types";

type FlashcardFlipCardProps = {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
};

export function FlashcardFlipCard({
  card,
  isFlipped,
  onFlip,
}: FlashcardFlipCardProps) {
  return (
    <div className="flashcard-scene w-full select-none">
      <button
        type="button"
        onClick={onFlip}
        className={`flashcard-inner mx-auto min-h-64 w-full max-w-md ${isFlipped ? "is-flipped" : ""}`}
        aria-pressed={isFlipped}
        aria-label={isFlipped ? "Show question" : "Flip to answer"}
      >
        <div className="flashcard-face flashcard-front flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-[#fafcff] p-6 text-center shadow-sm dark:border-[#2e4a73] dark:bg-[#141d2e]">
          <span className="mb-2 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Question · tap to flip
          </span>
          <p className="text-base font-bold leading-relaxed text-slate-800 dark:text-[#f4f7fb] sm:text-lg">
            {card.front}
          </p>
          <span className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#a0b9d9]">
            <RotateCw className="h-3.5 w-3.5" />
            GCSE {card.examBoard} · {card.subject}
          </span>
        </div>

        <div className="flashcard-face flashcard-back flex flex-col items-center justify-center rounded-2xl border-2 border-emerald-500/40 bg-white p-6 text-center shadow-md dark:bg-[#1a2437]">
          <span className="mb-2 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Answer
          </span>
          <p className="whitespace-pre-line text-base font-semibold leading-relaxed text-slate-800 dark:text-[#f4f7fb] sm:text-lg">
            {card.back}
          </p>
          {card.keyKeywords.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {card.keyKeywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}