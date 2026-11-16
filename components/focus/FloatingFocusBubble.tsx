"use client";

import { Pause, Play, TreePine } from "lucide-react";
import type { FocusDuration } from "@/services/focusService";
import type { FocusTimerSnapshot } from "./useFocusTimer";

type FloatingFocusBubbleProps = {
  todayFocusMins: number;
  defaultDuration: FocusDuration;
  focusMode: "subject" | "custom";
  subjectLabel: string;
  session: FocusTimerSnapshot | null;
  onToggle: () => void;
  onOpenSettings?: () => void;
};

export function FloatingFocusBubble({
  todayFocusMins,
  defaultDuration,
  focusMode,
  subjectLabel,
  session,
  onToggle,
  onOpenSettings,
}: FloatingFocusBubbleProps) {
  const isRunning = session?.phase === "running";
  const isPaused = session?.phase === "paused";
  const isOn = isRunning || isPaused;
  const duration = session?.selectedDuration ?? defaultDuration;
  const treeLabel = session?.treeLabel ?? (duration === 50 ? "Mature Tree" : "Sapling");

  return (
    <aside
      aria-label="Deep focus timer"
      className="pointer-events-none fixed bottom-6 right-4 z-40 sm:right-[340px]"
    >
      <div className="pointer-events-auto flex items-stretch gap-0 overflow-hidden rounded-2xl border border-emerald-950/60 bg-gradient-to-r from-[#0c4a3e] to-[#1e3a34] text-white shadow-xl ring-2 ring-emerald-500/15">
        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 text-left transition hover:bg-white/5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-900/80">
            <TreePine
              className={`h-4 w-4 text-emerald-200 ${isRunning ? "animate-pulse" : ""}`}
              aria-hidden
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-1.5 text-xs font-bold leading-tight">
              {isOn ? (
                <span className="font-mono text-sm tabular-nums tracking-tight">
                  {session?.formattedTime}
                </span>
              ) : (
                <span className="text-sm">{duration}m Focus</span>
              )}
              <span className="text-[10px] font-semibold text-emerald-300/90">
                ({todayFocusMins}m today)
              </span>
            </div>
            <p className="mt-0.5 text-[10px] leading-snug text-emerald-200/75">
              {focusMode === "custom" ? "Custom focus" : subjectLabel} · Grow 1{" "}
              {treeLabel} · Click to toggle
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="flex w-11 shrink-0 items-center justify-center border-l border-emerald-900/50 bg-emerald-950/30 transition hover:bg-emerald-900/40"
          aria-label={isRunning ? "Pause focus" : isPaused ? "Resume focus" : "Start focus"}
          title={isRunning ? "Pause" : isPaused ? "Resume" : "Start"}
        >
          {isOn ? (
            isRunning ? (
              <Pause className="h-4 w-4 fill-white text-white" />
            ) : (
              <Play className="h-4 w-4 fill-white text-white" />
            )
          ) : (
            <Play className="h-4 w-4 fill-emerald-200" />
          )}
        </button>
      </div>

      {onOpenSettings && (
        <button
          type="button"
          onClick={onOpenSettings}
          className="pointer-events-auto mt-1.5 w-full text-center text-[10px] font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
        >
          Deep Focus settings
        </button>
      )}
    </aside>
  );
}