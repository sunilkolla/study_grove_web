"use client";

import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw, TreePine } from "lucide-react";
import { SYLLABUS_SUBJECTS } from "@/data/gcseSyllabus";
import {
  type FocusSessionBroadcast,
  FOCUS_SESSION_CHANGED,
  requestFocusPresetCustom,
  requestFocusPresetForSubject,
  requestFocusReset,
  requestFocusToggle,
  requestOpenFocusTimer,
} from "@/lib/focusEvents";
import { subjectCodeToLabel } from "@/lib/studyFocusBridge";
import {
  countTreesByGroveBucket,
  recentTreesForGroveBucket,
} from "@/services/groveService";
import type { ForestTree, GroveBucket, SubjectCode } from "@/types";

type FocusHubClientProps = {
  trees: ForestTree[];
  forestTreesCount: number;
};

function GroveTreeCard({ tree }: { tree: ForestTree }) {
  const bucket = tree.groveBucket ?? tree.subject ?? "CUSTOM";
  const subLabel =
    bucket === "CUSTOM"
      ? "Custom"
      : subjectCodeToLabel(bucket as SubjectCode);
  return (
    <article className="flex min-w-[148px] flex-1 flex-col items-center rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-5 text-center dark:border-[#2e4a73] dark:bg-[#1a2437]/60">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
        <TreePine className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
        {tree.species}
      </h3>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]">
        {tree.durationMinutes}m · {subLabel}
      </p>
      <p className="mt-2 text-[11px] text-slate-400 dark:text-[#8fa8c9]">
        {tree.completedAt}
      </p>
    </article>
  );
}

type GroveSectionProps = {
  title: string;
  count: number;
  trees: ForestTree[];
  onFocus?: () => void;
};

function GroveSection({ title, count, trees, onFocus }: GroveSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#2e4a73] dark:bg-[#273853] sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
          {title}{" "}
          <span className="font-semibold text-slate-500 dark:text-[#a0b9d9]">
            · {count} {count === 1 ? "tree" : "trees"}
          </span>
        </h2>
        {onFocus && (
          <button
            type="button"
            onClick={onFocus}
            className="text-xs font-bold text-[#0F5132] hover:underline dark:text-emerald-400"
          >
            Focus here →
          </button>
        )}
      </div>
      {trees.length > 0 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {trees.map((tree) => (
            <GroveTreeCard key={tree.id} tree={tree} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 dark:text-[#a0b9d9]">
          No trees yet — start a focus session for this subject.
        </p>
      )}
    </section>
  );
}

export function FocusHubClient({
  trees,
  forestTreesCount,
}: FocusHubClientProps) {
  const counts = countTreesByGroveBucket(trees);
  const customCount = counts.CUSTOM ?? 0;

  const [session, setSession] = useState<FocusSessionBroadcast | null>(null);

  useEffect(() => {
    const onSession = (e: Event) => {
      setSession((e as CustomEvent<FocusSessionBroadcast>).detail);
    };
    window.addEventListener(FOCUS_SESSION_CHANGED, onSession);
    return () => window.removeEventListener(FOCUS_SESSION_CHANGED, onSession);
  }, []);

  const focusLive = session?.isLive ?? false;

  const sessionSubjectLabel =
    session && focusLive
      ? session.focusMode === "custom"
        ? "Custom focus"
        : subjectCodeToLabel(session.subject)
      : null;

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
              Every 25m or 50m sprint plants a tree in your subject Grove.
            </p>
            {focusLive && session ? (
              <div className="mt-2 space-y-2">
                <p className="text-xs font-semibold text-emerald-200/95">
                  Growing for{" "}
                  <span className="text-white">{sessionSubjectLabel}</span>
                  <span className="text-slate-400">
                    {" "}
                    · {session.selectedDuration}m · {session.treeLabel}
                  </span>
                </p>
                <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
                  <span className="min-w-[4.25rem] px-2 py-2 text-center font-mono text-sm font-bold tabular-nums text-white">
                    {session.formattedTime}
                  </span>
                  <button
                    type="button"
                    onClick={requestFocusToggle}
                    className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-400 active:scale-[0.98]"
                  >
                    {session.phase === "running" ? (
                      <>
                        <Pause className="h-3.5 w-3.5 fill-white" aria-hidden />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 fill-white" aria-hidden />
                        Resume
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={requestFocusReset}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    Restart
                  </button>
                </div>
                <button
                  type="button"
                  onClick={requestOpenFocusTimer}
                  className="text-xs font-bold text-emerald-300 underline-offset-2 hover:underline"
                >
                  Timer settings
                </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={requestOpenFocusTimer}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#0f172a] shadow-md transition hover:bg-slate-100 active:scale-[0.98]"
              >
                <Play className="h-4 w-4 fill-[#0f172a]" />
                Start focus timer
              </button>
            )}
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

      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
          Your Study Grove (This Term)
        </h2>

        {SYLLABUS_SUBJECTS.map((sub) => {
          const bucket = sub.mapsTo as GroveBucket;
          const count = counts[bucket] ?? 0;
          const recent = recentTreesForGroveBucket(trees, bucket, 4);
          return (
            <GroveSection
              key={sub.code}
              title={`${sub.label} grove`}
              count={count}
              trees={recent}
              onFocus={() => requestFocusPresetForSubject(sub.mapsTo)}
            />
          );
        })}

        <GroveSection
          title="Custom focus grove"
          count={customCount}
          trees={recentTreesForGroveBucket(trees, "CUSTOM", 4)}
          onFocus={requestFocusPresetCustom}
        />
      </div>
    </section>
  );
}