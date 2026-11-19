"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Info, Snowflake } from "lucide-react";
import {
  ScubaMonsterAvatar,
  StreakFlameMascot,
} from "@/components/common/SubjectIcon";
import { yearGroupProfiles } from "@/data/yearGroupProfiles";
import { buildStreakWeekDays } from "@/lib/streak/streakWeek";
import type { UserStats } from "@/types";

const MAX_WEEKS_BACK = 11;

type StudyStreakIndicatorProps = {
  stats: Pick<
    UserStats,
    "name" | "yearGroup" | "dailyStreak" | "todayQuestionsSolved"
  >;
  onQuickPractice: () => void;
};

export function StudyStreakIndicator({
  stats,
}: StudyStreakIndicatorProps) {
  const profile = yearGroupProfiles[stats.yearGroup];
  const targetQuestions = profile?.targetQuestions ?? 20;
  const questionsLeft = Math.max(0, targetQuestions - stats.todayQuestionsSolved);
  const isGoalMetToday = stats.todayQuestionsSolved >= targetQuestions;

  const [availableFreezes, setAvailableFreezes] = useState(2);
  const [streakFrozen, setStreakFrozen] = useState(false);
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const handleActivateFreeze = () => {
    if (availableFreezes > 0 && !streakFrozen) {
      setStreakFrozen(true);
      setAvailableFreezes((prev) => prev - 1);
      setShowFreezeModal(false);
    }
  };

  const weekView = useMemo(
    () =>
      buildStreakWeekDays(weekOffset, {
        dailyStreak: stats.dailyStreak,
        todayMet: isGoalMetToday,
        frozenToday: streakFrozen,
      }),
    [weekOffset, stats.dailyStreak, isGoalMetToday, streakFrozen],
  );

  const canGoOlder = weekOffset > -MAX_WEEKS_BACK;
  const canGoNewer = weekOffset < 0;

  return (
    <>
      <div className="relative mb-6">
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#cdd9ea]/80 bg-white p-5 shadow-sm transition-colors dark:border-[#2e4a73] dark:bg-[#1a2437] sm:p-6 lg:flex-row lg:items-stretch">
          <div className="flex items-center gap-5">
            <div className="shrink-0 transition-transform hover:scale-105">
              <ScubaMonsterAvatar sizePx={72} />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-extrabold tracking-tight text-[#1a2437] dark:text-[#f4f7fb] sm:text-3xl">
                Hi {stats.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFreezeModal(true)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#bae6fd] bg-[#e0f2fe] px-3 py-1 text-xs font-bold text-[#0284c7] shadow-sm transition-all hover:bg-[#bae6fd] active:scale-95 dark:border-[#0284c7]/40 dark:bg-[#163354] dark:text-[#7dd3fc]"
                >
                  <span className="text-sm">🧊</span>
                  <span>{availableFreezes} freezes</span>
                </button>
                {streakFrozen && (
                  <span className="flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-300">
                    <Snowflake className="h-3.5 w-3.5 animate-spin text-sky-500" />
                    Streak Shield Active Today
                  </span>
                )}
                {!streakFrozen && !isGoalMetToday && (
                  <span className="text-xs text-[#6d94c3] dark:text-[#a0b9d9]">
                    {questionsLeft} questions left today
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4 border-t border-[#e8edf6] pt-4 dark:border-[#2e4a73] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="shrink-0 transition-transform hover:scale-110">
                  <StreakFlameMascot sizePx={44} />
                </div>
                <div>
                  <div className="font-mono text-xl font-black leading-none text-[#ea580c] dark:text-[#fb923c] sm:text-2xl">
                    {stats.dailyStreak} days
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-[#6d94c3] dark:text-[#a0b9d9]">
                    Current streak
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={!canGoOlder}
                  onClick={() => setWeekOffset((w) => w - 1)}
                  aria-label="Previous week"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#6d94c3] transition-colors hover:bg-[#f4f7fb] disabled:cursor-not-allowed disabled:opacity-30 dark:text-[#a0b9d9] dark:hover:bg-[#273853]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="min-w-[8.5rem] rounded-full border border-[#e8edf6] bg-[#f8fafc] px-3 py-1.5 text-center text-xs font-bold text-[#395e90] dark:border-[#2e4a73] dark:bg-[#141d2e] dark:text-[#cdd9ea]">
                  {weekView.rangeLabel}
                </div>
                <button
                  type="button"
                  disabled={!canGoNewer}
                  onClick={() => setWeekOffset((w) => w + 1)}
                  aria-label="Next week"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#6d94c3] transition-colors hover:bg-[#f4f7fb] disabled:cursor-not-allowed disabled:opacity-30 dark:text-[#a0b9d9] dark:hover:bg-[#273853]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  title="Orange days count toward your streak. Use freezes to protect a miss day. Navigate arrows to see past weeks."
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e8edf6] text-[#6d94c3] dark:border-[#2e4a73] dark:text-[#a0b9d9]"
                  aria-label="How streak weeks work"
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
              {weekView.days.map((item) => (
                <div
                  key={item.iso}
                  title={item.iso}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black transition-all ${
                    item.isFrozen
                      ? "bg-sky-500 text-white shadow-sm"
                      : item.completed
                        ? "bg-[#ea580c] text-white shadow-sm ring-2 ring-orange-200 dark:ring-orange-950"
                        : item.isToday
                          ? "animate-pulse border-2 border-dashed border-[#ea580c] bg-orange-50 text-[#ea580c] dark:bg-orange-950/60"
                          : item.isFuture
                            ? "bg-[#f4f7fb] text-[#cbd5e1] dark:bg-[#273853] dark:text-[#475569]"
                            : "bg-[#f4f7fb] text-[#94a3b8] dark:bg-[#273853] dark:text-[#64748b]"
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showFreezeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm space-y-3 rounded-2xl border border-sky-200 bg-white p-5 text-center shadow-xl dark:border-sky-900 dark:bg-[#1a2437]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-2xl dark:bg-sky-950/80 dark:text-sky-400">
              🧊
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a2437] dark:text-white">
                Use 1 Streak Freeze?
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#4b77ac] dark:text-[#a0b9d9]">
                You have <strong>{availableFreezes} freezes</strong>. This keeps
                your {stats.dailyStreak}-day streak if you need a rest day today.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowFreezeModal(false)}
                className="flex-1 rounded-xl border border-[#cdd9ea] py-2 text-xs font-medium text-[#4b77ac] hover:bg-[#f4f7fb] dark:border-[#2e4a73] dark:text-[#a0b9d9] dark:hover:bg-[#273853]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleActivateFreeze}
                disabled={availableFreezes <= 0}
                className="flex-1 rounded-xl bg-sky-600 py-2 text-xs font-bold text-white shadow-sm hover:bg-sky-500 disabled:opacity-50"
              >
                Activate Freeze
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}