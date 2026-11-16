import type { ForestTree, GroveBucket, SubjectCode } from "@/types";
import {
  getSessionForestTrees,
  prependSessionForestTree,
} from "./mockSessionStore";
import type { FocusDuration } from "./focusService";
import type { FocusMode } from "@/lib/focusPreferences";

export async function fetchForestTrees(): Promise<ForestTree[]> {
  return getSessionForestTrees();
}

export function speciesForFocusSession(
  durationMins: FocusDuration,
  mode: FocusMode,
  subject?: SubjectCode,
): ForestTree["species"] {
  if (durationMins === 50) return "English Oak";
  if (mode === "custom") return "Rowan Sapling";
  switch (subject) {
    case "BIOLOGY":
    case "CHEMISTRY":
    case "COMBINED_SCIENCE":
      return "Silver Birch";
    case "MATHS":
    case "COMPUTER_SCIENCE":
      return "Rowan Sapling";
    default:
      return "Scots Pine";
  }
}

export function forestTreeFromFocusSession(
  durationMins: FocusDuration,
  mode: FocusMode,
  subject?: SubjectCode,
): ForestTree {
  const groveBucket: GroveBucket =
    mode === "custom" ? "CUSTOM" : (subject ?? "BIOLOGY");
  const species = speciesForFocusSession(durationMins, mode, subject);
  return {
    id: `tree-${Date.now()}`,
    species,
    durationMinutes: durationMins,
    completedAt: "Just now",
    xpEarned: durationMins === 50 ? 150 : 50,
    subject: mode === "custom" ? undefined : subject,
    groveBucket,
  };
}

export function recordForestTree(tree: ForestTree): void {
  prependSessionForestTree(tree);
}

export type SpeciesBreakdownRow = {
  name: string;
  count: number;
  xp: string;
  species: string;
};

const BREAKDOWN_META: Record<
  ForestTree["species"],
  { name: string; xp: string; species: string }
> = {
  "English Oak": {
    name: "Mature Oaks",
    xp: "+150 XP each",
    species: "50m Deep Blocks",
  },
  "Scots Pine": {
    name: "Scots Pines",
    xp: "+50 XP each",
    species: "25m Standard",
  },
  "Silver Birch": {
    name: "Silver Birches",
    xp: "+50 XP each",
    species: "Science Sprints",
  },
  "Rowan Sapling": {
    name: "Rowan Saplings",
    xp: "+50 XP each",
    species: "Maths & Custom Sprints",
  },
};

export function breakdownForestBySpecies(
  trees: ForestTree[],
): SpeciesBreakdownRow[] {
  const counts: Record<ForestTree["species"], number> = {
    "English Oak": 0,
    "Scots Pine": 0,
    "Silver Birch": 0,
    "Rowan Sapling": 0,
  };
  for (const tree of trees) {
    counts[tree.species] += 1;
  }
  return (Object.keys(BREAKDOWN_META) as ForestTree["species"][])
    .map((key) => ({
      ...BREAKDOWN_META[key],
      count: counts[key],
    }))
    .filter((row) => row.count > 0);
}

export function totalFocusMinutesFromTrees(trees: ForestTree[]): number {
  return trees.reduce((sum, t) => sum + t.durationMinutes, 0);
}

export function groupTreesByGroveBucket(
  trees: ForestTree[],
): Map<GroveBucket, ForestTree[]> {
  const map = new Map<GroveBucket, ForestTree[]>();
  for (const tree of trees) {
    const bucket = tree.groveBucket ?? tree.subject ?? "CUSTOM";
    const list = map.get(bucket) ?? [];
    list.push(tree);
    map.set(bucket, list);
  }
  return map;
}

export function countTreesByGroveBucket(
  trees: ForestTree[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const tree of trees) {
    const bucket = tree.groveBucket ?? tree.subject ?? "CUSTOM";
    counts[bucket] = (counts[bucket] ?? 0) + 1;
  }
  return counts;
}

export function recentTreesForGroveBucket(
  trees: ForestTree[],
  bucket: GroveBucket,
  limit = 4,
): ForestTree[] {
  return trees.filter((t) => (t.groveBucket ?? t.subject ?? "CUSTOM") === bucket).slice(0, limit);
}

export type SubjectGroveBreakdownRow = {
  bucket: GroveBucket;
  label: string;
  count: number;
};

export function breakdownForestByGroveBucket(
  trees: ForestTree[],
): SubjectGroveBreakdownRow[] {
  const counts = countTreesByGroveBucket(trees);
  return Object.entries(counts)
    .map(([bucket, count]) => ({
      bucket: bucket as GroveBucket,
      label: bucket === "CUSTOM" ? "Custom Focus" : bucket.replace(/_/g, " "),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}