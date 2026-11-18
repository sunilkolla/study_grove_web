"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DeckTopicOption } from "@/services/flashcardService";

export type DeckTopicSelection = "mixed" | string[];

type DeckTopicMultiSelectProps = {
  topics: DeckTopicOption[];
  value: DeckTopicSelection;
  onChange: (next: DeckTopicSelection) => void;
};

function selectionLabel(value: DeckTopicSelection, topics: DeckTopicOption[]): string {
  if (value === "mixed") return "Mixed";
  if (value.length === 0) return "Mixed";
  if (value.length === 1) {
    const t = topics.find((x) => x.topicNodeId === value[0]);
    return t?.label ?? "1 topic";
  }
  return `${value.length} topics`;
}

export function DeckTopicMultiSelect({
  topics,
  value,
  onChange,
}: DeckTopicMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const isMixed = value === "mixed";
  const selectedSet = isMixed ? new Set<string>() : new Set(value);

  const toggleTopic = (topicNodeId: string) => {
    if (isMixed) {
      onChange([topicNodeId]);
      return;
    }
    const next = new Set(selectedSet);
    if (next.has(topicNodeId)) next.delete(topicNodeId);
    else next.add(topicNodeId);
    if (next.size === 0) onChange("mixed");
    else onChange([...next]);
  };

  const pickMixed = () => {
    onChange("mixed");
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative mb-3">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]">
        Topics
      </p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1.5 text-left text-[11px] font-semibold text-slate-700 dark:border-[#2e4a73] dark:bg-[#141d2e] dark:text-[#cdd9ea]"
      >
        <span>{selectionLabel(value, topics)}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 z-20 mt-1 max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-[#2e4a73] dark:bg-[#1a2437]">
          <button
            type="button"
            onClick={pickMixed}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[11px] font-semibold hover:bg-slate-50 dark:hover:bg-[#22334d] ${isMixed ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-[#f4f7fb]"}`}
          >
            <span
              className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${isMixed ? "border-emerald-500 bg-emerald-500" : "border-slate-300 dark:border-[#2e4a73]"}`}
            >
              {isMixed && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
            </span>
            Mixed (all topics)
          </button>
          {topics.map((t) => {
            const checked = !isMixed && selectedSet.has(t.topicNodeId);
            return (
              <button
                key={t.topicNodeId}
                type="button"
                onClick={() => toggleTopic(t.topicNodeId)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[11px] hover:bg-slate-50 dark:hover:bg-[#22334d]"
              >
                <span
                  className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${checked ? "border-emerald-500 bg-emerald-500" : "border-slate-300 dark:border-[#2e4a73]"}`}
                >
                  {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span className="text-slate-800 dark:text-[#f4f7fb]">
                  {t.label}{" "}
                  <span className="font-normal text-slate-500 dark:text-[#a0b9d9]">
                    ({t.cardCount})
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function deckCountsForSelection(
  deck: { topics: DeckTopicOption[]; totalCards: number; dueToday: number },
  selection: DeckTopicSelection,
): { totalCards: number; dueToday: number } {
  if (selection === "mixed") {
    return { totalCards: deck.totalCards, dueToday: deck.dueToday };
  }
  if (selection.length === 0) {
    return { totalCards: deck.totalCards, dueToday: deck.dueToday };
  }
  const picked = new Set(selection);
  const topics = deck.topics.filter((t) => picked.has(t.topicNodeId));
  return {
    totalCards: topics.reduce((s, t) => s + t.cardCount, 0),
    dueToday: topics.reduce((s, t) => s + t.dueToday, 0),
  };
}