"use client";

import { useState } from "react";
import {
  SYLLABUS_SUBJECTS,
  type SyllabusMainTopic,
  type SyllabusSubjectCode,
} from "@/data/gcseSyllabus";
import { TERM_LABELS } from "@/lib/academicYear";
import { listMainTopics } from "@/services/scheduleService";
import type { AcademicTermId, AcademicYearPlan } from "@/types";

type ScheduleYearViewProps = {
  plan: AcademicYearPlan;
  onSpreadTopic: (
    syllabusSubject: SyllabusSubjectCode,
    mainTopicId: string,
    termId: AcademicTermId,
  ) => Promise<void>;
  onMilestoneReminders: () => Promise<void>;
};

export function ScheduleYearView({
  plan,
  onSpreadTopic,
  onMilestoneReminders,
}: ScheduleYearViewProps) {
  const [wizard, setWizard] = useState<{
    subject: SyllabusSubjectCode;
    topic: SyllabusMainTopic;
    termId: AcademicTermId;
  } | null>(null);
  const [busy, setBusy] = useState(false);

  const terms: AcademicTermId[] = ["autumn", "spring", "summer"];

  const isPlanned = (
    termId: AcademicTermId,
    subject: SyllabusSubjectCode,
    mainTopicId: string,
  ) =>
    plan.termGoals.some(
      (g) =>
        g.termId === termId &&
        g.syllabusSubject === subject &&
        g.mainTopicId === mainTopicId,
    );

  const confirmWizard = async () => {
    if (!wizard) return;
    setBusy(true);
    try {
      await onSpreadTopic(wizard.subject, wizard.topic.id, wizard.termId);
      setWizard(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-600 dark:text-[#a0b9d9]">
          Academic year {plan.yearLabel} · plan what to cover each term.
        </p>
        <button
          type="button"
          onClick={() => void onMilestoneReminders()}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-[#2e4a73] dark:text-[#cdd9ea]"
        >
          Add milestone reminders
        </button>
      </div>

      <div className="space-y-4">
        {terms.map((termId) => (
          <section
            key={termId}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#2e4a73] dark:bg-[#273853]"
          >
            <h3 className="mb-3 text-sm font-extrabold text-[#0F5132] dark:text-emerald-400">
              {TERM_LABELS[termId]}
            </h3>
            <div className="space-y-3">
              {SYLLABUS_SUBJECTS.map((sub) => {
                const topics = listMainTopics(sub.code);
                return (
                  <div key={sub.code}>
                    <p className="mb-1 text-xs font-bold text-slate-700 dark:text-[#f4f7fb]">
                      {sub.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {topics.map((topic) => {
                        const planned = isPlanned(termId, sub.code, topic.id);
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() =>
                              setWizard({
                                subject: sub.code,
                                topic,
                                termId,
                              })
                            }
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                              planned
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#1a2437] dark:text-[#cdd9ea]"
                            }`}
                          >
                            {topic.title}
                            {planned ? " ✓" : ""}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="rounded-xl border border-dashed border-slate-300 p-4 dark:border-[#2e4a73]">
        <h3 className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">
          Milestones
        </h3>
        <ul className="space-y-1 text-sm text-slate-700 dark:text-[#cdd9ea]">
          {plan.milestones.map((m) => (
            <li key={m.id} className="flex justify-between gap-2">
              <span>{m.label}</span>
              <span className="tabular-nums text-slate-400">{m.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {wizard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal
        >
          <div className="max-w-md rounded-2xl bg-white p-5 shadow-xl dark:bg-[#1a2437]">
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Break into weekly tasks?
            </h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#a0b9d9]">
              Spread <strong>{wizard.topic.title}</strong> (
              {wizard.topic.subtopics.length} subtopics) across{" "}
              {TERM_LABELS[wizard.termId].toLowerCase()}. You can edit dates in
              the week view.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setWizard(null)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void confirmWizard()}
                className="rounded-lg bg-[#10B981] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
              >
                {busy ? "Creating…" : "Create tasks"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}