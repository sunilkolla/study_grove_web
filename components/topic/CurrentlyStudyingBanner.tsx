"use client";

import { MapPin } from "lucide-react";

type CurrentlyStudyingBannerProps = {
  subjectLabel: string;
  subtopicCode?: string;
  subtopicName?: string;
  onPinTopic: () => void;
};

/** Compact “Current Study” chip — sits on the subject tabs row (mockup). */
export function CurrentlyStudyingBanner({
  subjectLabel,
  subtopicCode,
  subtopicName,
  onPinTopic,
}: CurrentlyStudyingBannerProps) {
  const hasPin = Boolean(subtopicCode && subtopicName);
  const summary = hasPin
    ? `${subjectLabel} · ${subtopicCode} ${subtopicName}`
    : `${subjectLabel} · Pin a topic`;

  return (
    <button
      type="button"
      onClick={onPinTopic}
      className="group ml-auto inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-full border border-emerald-200/90 bg-emerald-50/95 px-3 py-1.5 text-left text-[11px] font-semibold text-[#0F5132] shadow-sm transition hover:border-emerald-300 hover:bg-emerald-100/90 active:scale-[0.98] dark:border-emerald-700/50 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/70"
      title="Change pinned weekly topic"
    >
      <span className="hidden text-[10px] font-bold uppercase tracking-wide text-emerald-800/70 sm:inline dark:text-emerald-300/80">
        Current Study
      </span>
      <MapPin
        className="h-3.5 w-3.5 shrink-0 text-emerald-600 group-hover:text-emerald-700 dark:text-emerald-400"
        aria-hidden
      />
      <span className="truncate font-semibold text-slate-800 dark:text-emerald-50">
        {summary}
      </span>
    </button>
  );
}