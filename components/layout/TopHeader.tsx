"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  Bell,
  Clock,
  Flame,
  Search,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { examBoardLabel } from "@/lib/examBoards";
import { yearGroupTrackLabel } from "@/lib/yearGroups";
import type { ShellUserStats } from "@/types";

type TopHeaderProps = {
  stats: ShellUserStats;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onQuickFocusStart?: () => void;
};

export function TopHeader({
  stats,
  searchQuery,
  onSearchChange,
  onQuickFocusStart,
}: TopHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const levelProgress = Math.round(
    (stats.currentLevelXP / stats.xpForNextLevel) * 100,
  );

  const initials = stats.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md transition-colors duration-200 dark:border-[#2e4a73]/60 dark:bg-[#1a2437]/95 sm:gap-6 sm:px-6">
      <div className="relative max-w-md flex-1">
        <label htmlFor="global-search" className="sr-only">
          Search topics, formulas, or exam boards
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#a0b9d9]" />
        <input
          id="global-search"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search ${stats.yearGroup} GCSE practice…`}
          className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] py-1.5 pl-9 pr-14 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 dark:border-[#2e4a73] dark:bg-[#273853] dark:text-[#f4f7fb] dark:placeholder:text-[#a0b9d9]/60 dark:focus:border-[#10B981]"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-400 dark:border-[#2e4a73] dark:bg-[#1a2437] dark:text-[#a0b9d9] sm:inline">
          ⌘K
        </kbd>
      </div>

      <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
        <div
          className="hidden items-center rounded-lg border border-slate-200 bg-[#F8FAFC] px-2.5 py-1.5 md:flex dark:border-[#2e4a73] dark:bg-[#273853]"
          title="Year group — edit in profile"
        >
          <span className="text-[11px] font-bold text-[#1E293B] dark:text-[#f4f7fb]">
            {stats.yearGroup}
          </span>
        </div>

        <div
          className="hidden items-center gap-1.5 rounded-lg border border-amber-200/80 bg-amber-50 px-2.5 py-1.5 sm:flex dark:border-amber-700/50 dark:bg-amber-950/40"
          title="Daily study streak"
        >
          <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="text-xs font-bold tabular-nums text-amber-950 dark:text-amber-100">
            {stats.dailyStreak}
          </span>
          <span className="hidden text-[11px] font-medium text-amber-800 dark:text-amber-300 lg:inline">
            Day Streak
          </span>
        </div>

        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-[#F8FAFC] px-2.5 py-1.5 lg:flex dark:border-[#2e4a73] dark:bg-[#273853]">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1E293B] text-white dark:bg-[#395e90]">
            <Award className="h-3.5 w-3.5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800 dark:text-[#f4f7fb]">
              <span>Lvl {stats.level}</span>
              <span className="font-mono text-slate-500 dark:text-[#a0b9d9]">
                {stats.totalXP.toLocaleString()} XP
              </span>
            </div>
            <div className="mt-0.5 h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-[#1a2437]">
              <div
                className="h-full rounded-full bg-[#10B981] transition-all"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        <ThemeSwitcher variant="compact" className="!text-slate-600" />

        <button
          type="button"
          onClick={onQuickFocusStart}
          className="hidden items-center gap-1.5 rounded-lg bg-[#1E293B] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 sm:inline-flex"
        >
          <Clock className="h-3.5 w-3.5" />
          Quick 25m Focus
        </button>

        <button
          type="button"
          onClick={() => setShowNotifications((v) => !v)}
          className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-[#a0b9d9] dark:hover:bg-[#273853] dark:hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-[#1a2437]" />
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-lg dark:border-[#395e90] dark:bg-[#273853]">
            <p className="font-semibold text-slate-800 dark:text-[#f4f7fb]">
              Activity &amp; alerts
            </p>
            <p className="mt-1 text-slate-500 dark:text-[#a0b9d9]">
              Complete a Pomodoro to grow a Sapling and earn focus XP.
            </p>
          </div>
        )}

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu((v) => !v)}
            className="flex items-center gap-2 rounded-lg p-1 pl-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-[#273853]"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#0F5132] to-[#10B981] text-xs font-bold text-white"
              aria-hidden
            >
              {initials}
            </div>
            <div className="hidden text-left md:block">
              <div className="text-xs font-semibold leading-none text-slate-800 dark:text-[#f4f7fb]">
                {stats.name}
              </div>
              <div className="mt-1 text-[10px] font-bold leading-none text-slate-500 dark:text-[#a0b9d9]">
                {yearGroupTrackLabel(stats.yearGroup)} ·{" "}
                {examBoardLabel(stats.examBoard)}
              </div>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-lg dark:border-[#395e90] dark:bg-[#273853]">
              <div className="border-b border-slate-100 pb-2 dark:border-[#395e90]/60">
                <p className="font-bold text-slate-800 dark:text-[#f4f7fb]">
                  {stats.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-[#a0b9d9]">
                  {stats.school}
                </p>
              </div>
              <p className="mt-2 text-[11px] text-slate-600 dark:text-[#a0b9d9]">
                {yearGroupTrackLabel(stats.yearGroup)} ·{" "}
                {examBoardLabel(stats.examBoard)}
              </p>
              <p className="mt-1 border-t border-slate-100 pt-2 text-[11px] text-slate-500 dark:border-[#395e90]/60 dark:text-[#a0b9d9]">
                {stats.todayQuestionsSolved} questions practiced today
              </p>
              <Link
                href="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-500"
              >
                Edit profile →
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}