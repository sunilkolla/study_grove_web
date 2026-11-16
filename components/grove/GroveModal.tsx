"use client";

import { useState } from "react";
import {
  Check,
  Compass,
  Sparkles,
  TreePine,
  X,
} from "lucide-react";
import {
  breakdownForestByGroveBucket,
  breakdownForestBySpecies,
  totalFocusMinutesFromTrees,
} from "@/services/groveService";
import type { ForestTree, UserStats } from "@/types";

type GroveModalProps = {
  isOpen: boolean;
  onClose: () => void;
  trees: ForestTree[];
  stats: UserStats;
};

const GROVE_REWARDS = [
  {
    id: "oak_scholar",
    name: "Oak Scholar Avatar",
    costTrees: 5,
    type: "Avatar Badge",
    description: "Golden oak laurel insignia on your student profile.",
    icon: "🌳",
  },
  {
    id: "sakura_blossom",
    name: "Cherry Blossom Grove",
    costTrees: 15,
    type: "Tree Species",
    description: "Unlock pink sakura trees for 25m Pomodoro sessions.",
    icon: "🌸",
  },
  {
    id: "midnight_owl",
    name: "Midnight Owl Theme",
    costTrees: 20,
    type: "Study Ambience",
    description: "Deep starlight background with soothing owl hoot chimes.",
    icon: "🦉",
  },
  {
    id: "redwood_giant",
    name: "Redwood Giant",
    costTrees: 30,
    type: "Tree Species",
    description: "Towering ancient redwoods for 50m crunch blocks (+200 XP).",
    icon: "🌲",
  },
] as const;

export function GroveModal({ isOpen, onClose, trees, stats }: GroveModalProps) {
  const [activeTab, setActiveTab] = useState<"forest" | "rewards">("forest");
  const [unlockedItems, setUnlockedItems] = useState<string[]>(["oak_scholar"]);

  if (!isOpen) return null;

  const treeCount = stats.forestTreesCount;
  const breakdown = breakdownForestBySpecies(trees);
  const bySubject = breakdownForestByGroveBucket(trees);
  const totalMins = totalFocusMinutesFromTrees(trees);

  const handleUnlock = (id: string, cost: number) => {
    if (treeCount >= cost && !unlockedItems.includes(id)) {
      setUnlockedItems((prev) => [...prev, id]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="grove-modal-title"
    >
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-emerald-700/50 bg-[#142823] p-6 text-white shadow-2xl dark:bg-[#0f1f1b]">
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/20 text-emerald-300">
              <TreePine className="h-6 w-6" />
            </div>
            <div>
              <h2
                id="grove-modal-title"
                className="flex items-center gap-2 text-base font-bold text-white"
              >
                <span>{stats.name}&apos;s Study Grove</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-bold text-emerald-300">
                  {treeCount} Trees
                </span>
              </h2>
              <p className="text-xs text-emerald-200/70">
                Each tree represents 25–50 minutes of deep GCSE revision.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-emerald-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close grove"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative z-10 flex items-center gap-2 pb-3 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab("forest")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === "forest"
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-white/5 text-emerald-200 hover:bg-white/10"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Lush Forest Canopy ({treeCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("rewards")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === "rewards"
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-white/5 text-emerald-200 hover:bg-white/10"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Grove Rewards &amp; Customization</span>
          </button>
        </div>

        <div className="relative z-10 flex-1 space-y-4 overflow-y-auto py-1 pr-1">
          {activeTab === "forest" ? (
            <div>
              <div className="mb-4 rounded-2xl border border-emerald-600/30 bg-gradient-to-b from-[#1a3831] to-[#0c1815] p-5 text-center">
                <span className="mb-3 block text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                  Grove Ecosystem Health: Flourishing 🍃
                </span>
                <div className="flex flex-wrap items-end justify-center gap-2 py-4">
                  {Array.from({ length: treeCount }).map((_, i) => {
                    const isOak = i % 3 === 0;
                    const isPine = i % 3 === 1;
                    return (
                      <div
                        key={`canopy-${i}`}
                        className="group relative flex flex-col items-center"
                      >
                        <TreePine
                          className={`transition-transform duration-200 group-hover:scale-125 ${
                            isOak
                              ? "h-9 w-9 text-emerald-400 drop-shadow-[0_2px_8px_rgba(52,211,153,0.3)]"
                              : isPine
                                ? "h-8 w-8 text-emerald-500"
                                : "h-7 w-7 text-teal-400"
                          }`}
                        />
                        <div className="mt-0.5 h-1 w-5 rounded-full bg-black/40" />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 text-xs text-emerald-100/70">
                  Total study time invested:{" "}
                  <strong className="text-white">{totalMins} minutes</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {(breakdown.length > 0
                  ? breakdown
                  : [
                      {
                        name: "No trees yet",
                        count: 0,
                        xp: "—",
                        species: "Complete a Pomodoro",
                      },
                    ]
                ).map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl border border-emerald-500/20 bg-white/5 p-3 text-center"
                  >
                    <TreePine className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
                    <span className="block text-xs font-bold text-white">
                      {item.name}
                    </span>
                    <span className="font-mono text-base font-extrabold text-emerald-300">
                      {item.count}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-emerald-200/60">
                      {item.species}
                    </span>
                  </div>
                ))}
              </div>

              {bySubject.length > 0 && (
                <div className="mt-4 rounded-xl border border-emerald-600/20 bg-black/20 p-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-300/80">
                    By subject grove
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
                    {bySubject.map((row) => (
                      <li
                        key={row.bucket}
                        className="flex justify-between gap-2 rounded-lg bg-white/5 px-2 py-1.5 text-emerald-100/90"
                      >
                        <span>{row.label}</span>
                        <span className="font-bold text-emerald-300">
                          {row.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {trees.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-300/80">
                    Recent plantings
                  </p>
                  <ul className="max-h-40 space-y-1 overflow-y-auto rounded-xl border border-emerald-600/20 bg-black/20 p-2 text-left text-[11px]">
                    {trees.slice(0, 8).map((tree) => (
                      <li
                        key={tree.id}
                        className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-emerald-100/90 hover:bg-white/5"
                      >
                        <span className="font-medium">{tree.species}</span>
                        <span className="text-emerald-300/70">
                          {tree.durationMinutes}m ·{" "}
                          {tree.subject ?? "Custom"} · +
                          {tree.xpEarned} XP
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-200">
                <span>
                  Available Grove Balance:{" "}
                  <strong>{treeCount} Trees</strong>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-amber-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Keep growing to unlock more!
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {GROVE_REWARDS.map((reward) => {
                  const isUnlocked = unlockedItems.includes(reward.id);
                  const canAfford = treeCount >= reward.costTrees;
                  return (
                    <div
                      key={reward.id}
                      className="flex flex-col justify-between space-y-2 rounded-xl border border-emerald-500/20 bg-white/5 p-3.5 transition-colors hover:border-emerald-400/40"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{reward.icon}</span>
                          <div>
                            <span className="block text-xs font-bold text-white">
                              {reward.name}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-300">
                              {reward.type}
                            </span>
                          </div>
                        </div>
                        {isUnlocked ? (
                          <span className="flex items-center gap-1 rounded-full border border-emerald-600/50 bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                            <Check className="h-3 w-3" />
                            Unlocked
                          </span>
                        ) : (
                          <span className="rounded-full border border-amber-600/40 bg-amber-950/60 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                            {reward.costTrees} Trees
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed text-emerald-100/70">
                        {reward.description}
                      </p>
                      <div className="pt-1">
                        {isUnlocked ? (
                          <button
                            type="button"
                            disabled
                            className="w-full rounded-lg bg-emerald-600/40 py-1.5 text-xs font-semibold text-emerald-200"
                          >
                            Equipped
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleUnlock(reward.id, reward.costTrees)
                            }
                            disabled={!canAfford}
                            className={`w-full rounded-lg py-1.5 text-xs font-bold transition-all ${
                              canAfford
                                ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500"
                                : "cursor-not-allowed bg-white/10 text-white/40"
                            }`}
                          >
                            {canAfford
                              ? "Unlock with Trees"
                              : `Need ${reward.costTrees - treeCount} More Trees`}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}