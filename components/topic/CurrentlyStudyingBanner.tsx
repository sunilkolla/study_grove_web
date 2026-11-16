"use client";

import { Settings } from "lucide-react";
import {
  SYLLABUS_SUBJECTS,
  getSubtopicById,
  type SyllabusSubjectCode,
} from "@/data/gcseSyllabus";

type CurrentlyStudyingBannerProps = {
  focusSubject: SyllabusSubjectCode;
  currentBySubject: Record<SyllabusSubjectCode, string>;
  showSyllabus: boolean;
  onOpenSubject: (subject: SyllabusSubjectCode) => void;
  onToggleSelections: () => void;
};

function topicLinkLabel(
  subjectLabel: string,
  pinned: ReturnType<typeof getSubtopicById>,
): string {
  if (!pinned) return `${subjectLabel}: —`;
  return `${subjectLabel}: ${pinned.code} ${pinned.name}`;
}

export function CurrentlyStudyingBanner({
  focusSubject,
  currentBySubject,
  showSyllabus,
  onOpenSubject,
  onToggleSelections,
}: CurrentlyStudyingBannerProps) {
  return (
    <section className="rounded-xl bg-gradient-to-br from-[#0d3d32] via-[#0f4d3f] to-[#0a3229] px-3 py-2 text-white shadow-sm sm:px-4 sm:py-2.5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="min-w-0 text-[11px] leading-relaxed text-emerald-50/90 sm:text-xs">
          <span className="mr-1" aria-hidden>
            📌
          </span>
          <span className="font-medium text-emerald-100/80">Currently topics:</span>{" "}
          <span className="inline-flex flex-wrap items-center gap-x-1 gap-y-1">
            {SYLLABUS_SUBJECTS.map((sub, index) => {
              const pinned = getSubtopicById(currentBySubject[sub.code]);
              const isFocus = sub.code === focusSubject;
              const label = topicLinkLabel(sub.label, pinned);
              return (
                <span key={sub.code} className="inline-flex items-center">
                  {index > 0 && (
                    <span className="mx-0.5 text-emerald-100/40" aria-hidden>
                      ,
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onOpenSubject(sub.code)}
                    title={pinned ? `${pinned.code} ${pinned.name}` : sub.label}
                    className={`rounded-full border px-2 py-0.5 text-left text-[10px] font-medium transition hover:bg-white/10 sm:text-[11px] ${
                      isFocus
                        ? "border-white/45 bg-white/12 text-white"
                        : "border-white/20 bg-white/5 text-emerald-50"
                    }`}
                  >
                    {label}
                  </button>
                </span>
              );
            })}
          </span>
        </p>

        <button
          type="button"
          onClick={onToggleSelections}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 self-end rounded-lg border border-white/25 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/95 transition hover:bg-white/10 sm:self-center sm:text-xs"
        >
          <Settings className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {showSyllabus ? "Hide Selections" : "Change Selections"}
        </button>
      </div>
    </section>
  );
}