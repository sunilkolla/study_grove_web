"use client";

import { Pause, Play, Timer, TreePine } from "lucide-react";
import type { FocusTimerSnapshot } from "./useFocusTimer";

type FloatingFocusBubbleProps = {
  todayFocusMins: number;
  session: FocusTimerSnapshot | null;
  onOpenTimer: () => void;
  onPause?: () => void;
  onResume?: () => void;
};

export function FloatingFocusBubble({
  todayFocusMins,
  session,
  onOpenTimer,
  onPause,
  onResume,
}: FloatingFocusBubbleProps) {
  const isRunning = session?.phase === "running";
  const isPaused = session?.phase === "paused";

  return (
    <aside
      aria-label="Quick focus timer"
      className="pointer-events-none fixed bottom-6 right-4 z-40 sm:right-[340px]"
    >
      <div className="pointer-events-auto flex items-center gap-1">
        {(isRunning || isPaused) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isRunning) onPause?.();
              else onResume?.();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/40 bg-[#1e3a34] text-white shadow-lg ring-4 ring-emerald-500/10 hover:bg-emerald-800"
            title={isRunning ? "Pause focus" : "Resume focus"}
          >
            {isRunning ? (
              <Pause className="h-4 w-4 fill-white" />
            ) : (
              <Play className="h-4 w-4 fill-white" />
            )}
          </button>
        )}

        <button
          type="button"
          onClick={onOpenTimer}
          className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-white shadow-lg ring-4 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 ${
            isRunning
              ? "border-emerald-300/60 bg-gradient-to-r from-emerald-500 to-emerald-800 ring-emerald-400/30"
              : "border-emerald-400/40 bg-gradient-to-r from-emerald-600 to-[#1e3a34] ring-emerald-500/10 dark:from-emerald-500 dark:to-[#132722]"
          }`}
          title={
            isRunning || isPaused
              ? "Open focus timer"
              : "Open Pomodoro Focus Timer"
          }
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
            <TreePine
              className={`h-3.5 w-3.5 text-emerald-200 ${isRunning ? "animate-pulse" : ""}`}
            />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 text-xs font-bold leading-none">
              {isRunning || isPaused ? (
                <span className="font-mono text-sm tabular-nums tracking-tight">
                  {session?.formattedTime}
                </span>
              ) : (
                <span>{session?.selectedDuration ?? 25}m Focus</span>
              )}
              <span className="font-mono text-[10px] font-semibold text-emerald-300">
                ({todayFocusMins}m today)
              </span>
            </div>
            <div className="mt-1 text-[10px] leading-none text-emerald-200/80">
              {isRunning
                ? "Deep focus running…"
                : isPaused
                  ? "Paused — tap to manage"
                  : "Grow 1 Sapling"}
            </div>
          </div>
          <Timer
            className={`h-4 w-4 shrink-0 text-emerald-200 ${isRunning ? "animate-spin" : ""}`}
            style={isRunning ? { animationDuration: "4s" } : undefined}
          />
        </button>
      </div>
    </aside>
  );
}