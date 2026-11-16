"use client";

import { Pin, Play } from "lucide-react";
import { SubjectIcon } from "@/components/common/SubjectIcon";
import {
  masteryBadgeClasses,
  masteryDotClasses,
  masteryStatusFromPercent,
} from "@/lib/mastery/masteryStyles";
import {
  SYLLABUS_SUBJECTS,
  type SyllabusMainTopic,
  type SyllabusSubtopic,
  type SyllabusSubjectCode,
} from "@/data/gcseSyllabus";
import type { MasteryStatus } from "@/types";

type SyllabusNavigatorProps = {
  syllabusSubject: SyllabusSubjectCode;
  onSubjectChange: (code: SyllabusSubjectCode) => void;
  mainTopics: SyllabusMainTopic[];
  selectedMainTopicId: string;
  onMainTopicSelect: (id: string) => void;
  activeMainTopic: SyllabusMainTopic;
  pinnedSubtopicId: string;
  onPracticeSubtopic: (id: string) => void;
  onPinSubtopic: (id: string) => void;
  onPracticeWholeTopic: () => void;
};

function SubtopicTopRow({
  subtopic,
  status,
  isCurrent,
}: {
  subtopic: SyllabusSubtopic;
  status: MasteryStatus;
  isCurrent: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">
          {subtopic.code} {subtopic.name}
        </h4>
        {isCurrent && (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#0d3d32] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            <Pin className="h-3 w-3" aria-hidden />
            Current
          </span>
        )}
      </div>
      <span
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${masteryBadgeClasses(status)}`}
      >
        <span
          className={`h-2 w-2 rounded-full ${masteryDotClasses(status)}`}
          aria-hidden
        />
        {subtopic.masteryPercent}%
      </span>
    </div>
  );
}

function SubtopicRow({
  subtopic,
  isCurrent,
  onPractice,
  onPin,
}: {
  subtopic: SyllabusSubtopic;
  isCurrent: boolean;
  onPractice: () => void;
  onPin: () => void;
}) {
  const status = masteryStatusFromPercent(subtopic.masteryPercent);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2e4a73] dark:bg-[#273853] sm:p-5">
      <SubtopicTopRow subtopic={subtopic} status={status} isCurrent={isCurrent} />
      <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-[#a0b9d9] sm:text-sm">
        {subtopic.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onPractice}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#10B981] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition active:scale-[0.98] sm:text-sm"
        >
          <Play className="h-3 w-3 fill-current" aria-hidden />
          Practice Now
        </button>
        <button
          type="button"
          onClick={onPin}
          disabled={isCurrent}
          className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
            isCurrent
              ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-[#2e4a73] dark:bg-[#1a2437] dark:text-[#cdd9ea]"
          }`}
        >
          {isCurrent ? "Pinned ✓" : "Set Current"}
        </button>
      </div>
    </article>
  );
}

export function SyllabusNavigator({
  syllabusSubject,
  onSubjectChange,
  mainTopics,
  selectedMainTopicId,
  onMainTopicSelect,
  activeMainTopic,
  pinnedSubtopicId,
  onPracticeSubtopic,
  onPinSubtopic,
  onPracticeWholeTopic,
}: SyllabusNavigatorProps) {
  return (
    <section
      className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-[#2e4a73] dark:bg-[#1a2437]/50 sm:p-5"
      aria-labelledby="syllabus-navigator-heading"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3
            id="syllabus-navigator-heading"
            className="text-base font-extrabold text-slate-900 dark:text-white"
          >
            Syllabus Navigator
          </h3>
          <p className="text-xs text-slate-500 dark:text-[#a0b9d9]">
            Step 1 — Select GCSE subject → Step 2 — Main topic → Step 3 — Subtopic
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-[10px] font-semibold text-slate-500 dark:text-[#a0b9d9]">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-500" aria-hidden />
            &lt;50% Needs work
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden />
            50–79% Growing
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            80%+ Mastered
          </span>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]">
          Step 1 · Select GCSE subject
        </p>
        <div className="flex flex-wrap gap-2">
          {SYLLABUS_SUBJECTS.map((sub) => {
            const selected = syllabusSubject === sub.code;
            return (
              <button
                key={sub.code}
                type="button"
                onClick={() => onSubjectChange(sub.code)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition active:scale-[0.98] sm:text-sm ${
                  selected
                    ? "border-[#10B981] bg-[#10B981] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-[#2e4a73] dark:bg-[#273853] dark:text-[#cdd9ea]"
                }`}
              >
                <SubjectIcon subject={sub.mapsTo} size="sm" />
                {sub.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,280px)_1fr]">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]">
            Step 2 · Select main topic
          </p>
          <ul className="space-y-2">
            {mainTopics.map((topic) => {
              const selected = topic.id === selectedMainTopicId;
              const status = masteryStatusFromPercent(topic.masteryPercent);
              return (
                <li key={topic.id}>
                  <button
                    type="button"
                    onClick={() => onMainTopicSelect(topic.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selected
                        ? "border-[#10B981] bg-white shadow-md ring-1 ring-[#10B981]/30 dark:bg-[#273853]"
                        : "border-slate-200 bg-white hover:border-slate-300 dark:border-[#2e4a73] dark:bg-[#273853]/60"
                    }`}
                  >
                    <ProcessRow topic={topic} status={status} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]">
              Step 3 · Subtopics — {activeMainTopic.title}
            </p>
            <button
              type="button"
              onClick={onPracticeWholeTopic}
              className="rounded-xl border border-[#10B981] bg-white px-3 py-1.5 text-xs font-bold text-[#0F5132] transition hover:bg-emerald-50 dark:border-emerald-600 dark:bg-[#1a2437] dark:text-emerald-400"
            >
              Practice Whole Topic
            </button>
          </div>
          <ul className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {activeMainTopic.subtopics.map((st) => (
              <li key={st.id}>
                <SubtopicRow
                  subtopic={st}
                  isCurrent={st.id === pinnedSubtopicId}
                  onPractice={() => onPracticeSubtopic(st.id)}
                  onPin={() => onPinSubtopic(st.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProcessRow({
  topic,
  status,
}: {
  topic: SyllabusMainTopic;
  status: MasteryStatus;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          Topic {topic.index}: {topic.title}
        </p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-[#a0b9d9]">
          {topic.subtopics.length} subtopics
        </p>
      </div>
      <span
        className={`rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ${masteryBadgeClasses(status)}`}
      >
        {topic.masteryPercent}%
      </span>
    </div>
  );
}