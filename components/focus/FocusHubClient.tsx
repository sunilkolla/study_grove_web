"use client";

import { Play, TreePine } from "lucide-react";
import { requestOpenFocusTimer } from "@/lib/focusEvents";

export function FocusHubClient() {
  return (
    <section className="mx-auto max-w-xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-[#2e4a73] dark:bg-[#1a2437]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700">
          <TreePine className="h-9 w-9 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Pomodoro Forest
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-[#a0b9d9]">
          25 minutes grows a Sapling; 50 minutes grows a Mature Tree. Quitting
          early wilts your tree — no Grove growth that session.
        </p>
        <button
          type="button"
          onClick={requestOpenFocusTimer}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1E293B] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-slate-800"
        >
          <Play className="h-4 w-4 fill-white" />
          Start focus timer
        </button>
      </div>
    </section>
  );
}