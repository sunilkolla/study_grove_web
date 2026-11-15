"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, GraduationCap, Save } from "lucide-react";
import { yearGroupProfiles } from "@/data/yearGroupProfiles";
import { examBoardLabel, PRIMARY_EXAM_BOARDS } from "@/lib/examBoards";
import { notifyShellDataChanged } from "@/lib/shellEvents";
import { YEAR_GROUPS, yearGroupTrackLabel } from "@/lib/yearGroups";
import { updateUserProfile } from "@/services/userService";
import type { ExamBoard, UserStats, YearGroup } from "@/types";

type ProfileSettingsClientProps = {
  initialStats: UserStats;
};

export function ProfileSettingsClient({
  initialStats,
}: ProfileSettingsClientProps) {
  const router = useRouter();
  const [yearGroup, setYearGroup] = useState<YearGroup>(initialStats.yearGroup);
  const [examBoard, setExamBoard] = useState<ExamBoard>(
    initialStats.examBoard ?? "AQA",
  );
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const profile = yearGroupProfiles[yearGroup];
  const initialBoard = initialStats.examBoard ?? "AQA";

  const handleSave = async () => {
    setSaving(true);
    await updateUserProfile({ yearGroup, examBoard });
    notifyShellDataChanged();
    router.refresh();
    setSaved(true);
    setSaving(false);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const dirty =
    yearGroup !== initialStats.yearGroup || examBoard !== initialBoard;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-[#f4f7fb]">
            Your GCSE profile
          </h1>
        </div>
        <p className="text-xs text-slate-600 dark:text-[#a0b9d9]">
          Set your year and exam board. Practice questions and targets update to
          match.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-[#2e4a73] dark:bg-[#1a2437]">
        <p className="text-sm font-bold text-slate-800 dark:text-[#f4f7fb]">
          {initialStats.name}
        </p>
        <p className="text-xs text-slate-500 dark:text-[#a0b9d9]">
          {initialStats.school}
        </p>
      </div>

      <section className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-[#2e4a73] dark:bg-[#1a2437]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-[#f4f7fb]">
          Year group
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {YEAR_GROUPS.map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => setYearGroup(yr)}
              className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-all ${
                yearGroup === yr
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-[#2e4a73] dark:text-[#a0b9d9]"
              }`}
            >
              {yearGroupTrackLabel(yr)}
            </button>
          ))}
        </div>
        {profile && (
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-[#a0b9d9]">
            {profile.stageDescription}
          </p>
        )}
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-[#2e4a73] dark:bg-[#1a2437]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-[#f4f7fb]">
          Exam board
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {PRIMARY_EXAM_BOARDS.map((board) => (
            <button
              key={board}
              type="button"
              onClick={() => setExamBoard(board)}
              className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                examBoard === board
                  ? "border-[#1E293B] bg-[#1E293B] text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-400 dark:border-[#2e4a73] dark:bg-[#273853] dark:text-[#cdd9ea]"
              }`}
            >
              {examBoardLabel(board)}
            </button>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={!dirty || saving}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save profile"}
        </button>
        {saved && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Check className="h-4 w-4" />
            Saved
          </span>
        )}
        <Link
          href="/dashboard"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-[#a0b9d9] dark:hover:text-white"
        >
          Back to Practice Hub
        </Link>
      </div>
    </div>
  );
}