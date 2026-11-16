"use client";

import { Play, TreePine } from "lucide-react";
import { requestOpenFocusTimer } from "@/lib/focusEvents";
import type { ForestTree } from "@/types";

type FocusHubClientProps = {
  trees: ForestTree[];
  forestTreesCount: number;
};

function subjectLabel(code: ForestTree["subject"]): string {
  if (code === "COMPUTER_SCIENCE") return "CS";
  return code.replace(/_/g, " ");
}

function GroveTreeCard({ tree }: { tree: ForestTree }) {
  return (
    <article className="flex min-w-[148px] flex-1 flex-col items-center rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-5 text-center dark:border-[#2e4a73] dark:bg-[#1a2437]/60">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
        <TreePine className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
        {tree.species}
      </h3>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]">
        {tree.durationMinutes}m · {subjectLabel(tree.subject)}
      </p>
      <p className="mt-2 text-[11px] text-slate-400 dark:text-[#8fa8c9]">
        {tree.completedAt}
      </p>
    </article>
  );
}

export function FocusHubClient({
  trees,
  forestTreesCount,
}: FocusHubClientProps) {
  const recentTrees = trees.slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6">
      <header className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-5 py-6 text-white shadow-md sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <TreePine className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
              Study Forest Pomodoro Engine
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Deep Focus &amp; Forest Habit Loop
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300">
              Stay in your study zone while solving GCSE practice problems.
              Every 25m or 50m sprint plants a tree in your Grove.
            </p>
            <button
              type="button"
              onClick={requestOpenFocusTimer}
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#0f172a] shadow-md transition hover:bg-slate-100 active:scale-[0.98]"
            >
              <Play className="h-4 w-4 fill-[#0f172a]" />
              Start focus timer
            </button>
          </div>

          <div className="shrink-0 text-right sm:pt-1">
            <p className="text-4xl font-extrabold tabular-nums text-[#10B981] sm:text-5xl">
              {forestTreesCount}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400">
              Trees in Grove
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2e4a73] dark:bg-[#273853] sm:p-6">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
          Your Study Grove (This Term)
        </h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {recentTrees.length > 0 ? (
            recentTrees.map((tree) => (
              <GroveTreeCard key={tree.id} tree={tree} />
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-[#a0b9d9]">
              Complete a focus session to plant your first tree.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}