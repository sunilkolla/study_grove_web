"use client";

import { TreePine } from "lucide-react";

type FocusSessionToastProps = {
  message: string | null;
};

export function FocusSessionToast({ message }: FocusSessionToastProps) {
  if (!message) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-4 z-50 transition-opacity duration-300 sm:left-6"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex max-w-[min(100vw-2rem,360px)] items-center gap-2 rounded-full border border-slate-800/80 bg-[#1E293B] px-3 py-2 text-xs font-semibold text-white shadow-lg">
        <TreePine className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
        <span className="leading-snug">{message}</span>
      </div>
    </div>
  );
}