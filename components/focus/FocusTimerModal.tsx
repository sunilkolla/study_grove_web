"use client";

import { useEffect } from "react";
import {
  Pause,
  Play,
  RotateCcw,
  Shield,
  ShieldAlert,
  TreePine,
  X,
} from "lucide-react";
import { xpForFocusDuration, type FocusDuration } from "@/services/focusService";
import type { SubjectCode } from "@/types";
import type { useFocusTimer } from "./useFocusTimer";

type FocusTimerController = ReturnType<typeof useFocusTimer>;

type FocusTimerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  timer: FocusTimerController;
};

export function FocusTimerModal({
  isOpen,
  onClose,
  onMinimize,
  timer,
}: FocusTimerModalProps) {
  const {
    selectedDuration,
    setSelectedDuration,
    subject,
    setSubject,
    distractionShield,
    setDistractionShield,
    tabSwitches,
    isActive,
    isCompleted,
    hasOngoingSession,
    progressPercent,
    formattedTime,
    treeLabel,
    toggleFocus,
    startFocus,
    handleReset,
    openConfigurator,
  } = timer;

  useEffect(() => {
    if (isOpen) openConfigurator();
  }, [isOpen, openConfigurator]);

  const handleClose = () => {
    if (isActive && !isCompleted) {
      const abandon = window.confirm(
        "Leave focus early? Your tree will wilt — no Grove growth this session.",
      );
      if (!abandon) return;
      handleReset();
    }
    onClose();
  };

  const handleStartFocus = () => {
    if (isActive) return;
    startFocus();
    onMinimize();
  };

  if (!isOpen) return null;

  const settingsLocked = isActive || hasOngoingSession;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="focus-timer-title"
    >
      <div className="relative flex w-full max-w-lg flex-col justify-between overflow-hidden rounded-3xl border border-[#395e90]/60 bg-[#1a2437] p-6 text-white shadow-2xl">
        <div className="pointer-events-none absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#395e90]/25 blur-3xl" />

        <div className="z-10 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <TreePine className="h-5 w-5 text-emerald-400" />
            <span
              id="focus-timer-title"
              className="text-xs font-bold uppercase tracking-wider text-[#a0b9d9]"
            >
              Study Grove Pomodoro
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1 text-[#a0b9d9] transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close focus timer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isCompleted ? (
          <div className="z-10 flex flex-col items-center space-y-5 py-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectCode)}
                disabled={settingsLocked}
                className="rounded-lg border border-[#395e90] bg-[#273853] px-3 py-1.5 text-xs font-semibold text-white focus:outline-none disabled:opacity-60"
              >
                <option value="BIOLOGY">Biology</option>
                <option value="MATHS">Maths</option>
                <option value="PHYSICS">Physics</option>
                <option value="CHEMISTRY">Chemistry</option>
                <option value="COMPUTER_SCIENCE">Computer Science</option>
              </select>
              <div className="flex items-center rounded-lg border border-[#395e90] bg-[#273853] p-1">
                <button
                  type="button"
                  onClick={() => setSelectedDuration(25)}
                  disabled={settingsLocked}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-all disabled:opacity-60 ${
                    selectedDuration === 25
                      ? "bg-emerald-600 text-white"
                      : "text-[#a0b9d9] hover:text-white"
                  }`}
                >
                  25m (Sapling)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDuration(50 as FocusDuration)}
                  disabled={settingsLocked}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-all disabled:opacity-60 ${
                    selectedDuration === 50
                      ? "bg-emerald-600 text-white"
                      : "text-[#a0b9d9] hover:text-white"
                  }`}
                >
                  50m (Mature Tree)
                </button>
              </div>
            </div>

            <div className="relative flex h-40 w-40 items-center justify-center">
              <svg
                className="h-full w-full -rotate-90 transform"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="#273853"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={
                    2 * Math.PI * 52 * (1 - progressPercent / 100)
                  }
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <TreePine
                  className={`h-12 w-12 transition-all duration-700 ${
                    progressPercent > 70
                      ? "scale-125 text-emerald-400"
                      : progressPercent > 30
                        ? "scale-105 text-emerald-300"
                        : "scale-90 text-emerald-200"
                  }`}
                />
                <span className="mt-1 font-mono text-[10px] text-[#a0b9d9]">
                  {progressPercent}% grown
                </span>
              </div>
            </div>

            <div>
              <div className="font-mono text-5xl font-extrabold tabular-nums tracking-tight">
                {formattedTime}
              </div>
              <p className="mt-1 text-xs text-[#a0b9d9]">
                {isActive
                  ? "Deep focus active — stay on this tab"
                  : timer.phase === "paused"
                    ? "Paused — resume or reset"
                    : `Grow a ${treeLabel} when you finish`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (isActive) {
                    toggleFocus();
                    return;
                  }
                  if (timer.phase === "paused") {
                    startFocus();
                    onMinimize();
                    return;
                  }
                  handleStartFocus();
                }}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform active:scale-95 hover:bg-emerald-500"
              >
                {isActive || timer.phase === "paused" ? (
                  isActive ? (
                    <>
                      <Pause className="h-4 w-4 fill-white" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-white" />
                      Resume &amp; minimize
                    </>
                  )
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-white" />
                    Start Focus
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl bg-[#273853] p-2.5 text-[#a0b9d9] transition-colors hover:bg-[#395e90] hover:text-white"
                title="Reset timer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <div className="flex w-full max-w-sm items-center justify-between rounded-xl border border-[#395e90]/50 bg-[#273853]/60 px-4 py-2 text-xs">
              <div className="flex items-center gap-2">
                <Shield
                  className={`h-4 w-4 ${distractionShield ? "text-emerald-400" : "text-slate-400"}`}
                />
                <span className="text-[#cdd9ea]">Anti-distraction shield</span>
              </div>
              <button
                type="button"
                onClick={() => setDistractionShield((v) => !v)}
                className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                  distractionShield
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {distractionShield ? "ON" : "OFF"}
              </button>
            </div>

            {tabSwitches > 0 && distractionShield && (
              <div className="flex items-center gap-1.5 rounded-lg border border-amber-600/40 bg-amber-950/60 px-3 py-1.5 text-[11px] text-amber-300">
                <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                Tab switch detected ({tabSwitches}×). Stay focused!
              </div>
            )}
          </div>
        ) : (
          <div className="z-10 flex flex-col items-center space-y-4 py-8 text-center">
            <div className="flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg">
              <TreePine className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Tree planted in your Grove!</h3>
              <p className="mx-auto mt-1 max-w-xs text-xs text-[#a0b9d9]">
                {selectedDuration} minutes on {subject}. +1 {treeLabel} added.
              </p>
            </div>
            <div className="rounded-lg border border-[#395e90] bg-[#273853] px-3 py-1.5 text-xs font-bold text-emerald-300">
              +{xpForFocusDuration(selectedDuration)} XP
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl bg-[#273853] px-4 py-2 text-xs font-semibold text-white hover:bg-[#395e90]"
              >
                Another session
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-500"
              >
                Back to study
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}