import type { ForestTree, SubjectCode } from "@/types";
import {
  getSessionForestTrees,
  prependSessionForestTree,
} from "./mockSessionStore";
import type { FocusDuration } from "./focusService";

export async function fetchForestTrees(): Promise<ForestTree[]> {
  return getSessionForestTrees();
}

export function forestTreeFromFocusSession(
  durationMins: FocusDuration,
  subject: SubjectCode,
): ForestTree {
  const species: ForestTree["species"] =
    durationMins === 50 ? "English Oak" : "Scots Pine";
  return {
    id: `tree-${Date.now()}`,
    species,
    durationMinutes: durationMins,
    completedAt: "Just now",
    xpEarned: durationMins === 50 ? 150 : 50,
    subject,
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
    species: "Maths Sprints",
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