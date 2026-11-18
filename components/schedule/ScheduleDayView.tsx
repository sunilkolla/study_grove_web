"use client";

import { RevisionTaskRow } from "./RevisionTaskRow";
import type { SuggestionDraft } from "@/services/revisionSuggester";
import type { TaskItem } from "@/types";

type ScheduleDayViewProps = {
  dateLabel: string;
  planned: TaskItem[];
  completed: TaskItem[];
  suggestions: SuggestionDraft[];
  onToggle: (id: string) => void;
  onAcceptSuggestion: (s: SuggestionDraft) => void;
  onDismissSuggestion: (id: string) => void;
};

export function ScheduleDayView({
  dateLabel,
  planned,
  completed,
  suggestions,
  onToggle,
  onAcceptSuggestion,
  onDismissSuggestion,
}: ScheduleDayViewProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-bold text-slate-700 dark:text-[#cdd9ea]">
        {dateLabel}
      </h2>

      {suggestions.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Suggested for today
          </h3>
          <div className="space-y-2">
            {suggestions.map((s) => (
              <RevisionTaskRow
                key={s.id}
                item={s}
                isSuggestion
                onAcceptSuggestion={() => onAcceptSuggestion(s)}
                onDismiss={() => onDismissSuggestion(s.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-600 dark:text-[#a0b9d9]">
          My plan
        </h3>
        {planned.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-[#2e4a73] dark:text-[#a0b9d9]">
            Pick something from suggestions or add a task from your week view.
          </p>
        ) : (
          <div className="space-y-2">
            {planned.map((t) => (
              <RevisionTaskRow
                key={t.id}
                item={t}
                onToggle={() => onToggle(t.id)}
              />
            ))}
          </div>
        )}
      </section>

      {completed.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
            Completed
          </h3>
          <div className="space-y-2">
            {completed.map((t) => (
              <RevisionTaskRow
                key={t.id}
                item={t}
                onToggle={() => onToggle(t.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}