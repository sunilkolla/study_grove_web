import type { ForestTree, SubjectCode } from "@/types";

const ROTATE_25: ForestTree["species"][] = [
  "Scots Pine",
  "Silver Birch",
  "Rowan Sapling",
];

const SUBJECTS: SubjectCode[] = [
  "BIOLOGY",
  "MATHS",
  "CHEMISTRY",
  "PHYSICS",
  "COMPUTER_SCIENCE",
];

/** Matches initial `forestTreesCount: 18` in mock user stats. */
export const mockForestTrees: ForestTree[] = Array.from({ length: 18 }, (_, i) => {
  const isMature = i % 5 === 0;
  return {
    id: `tree-seed-${i + 1}`,
    species: isMature ? "English Oak" : ROTATE_25[i % ROTATE_25.length],
    durationMinutes: isMature ? 50 : 25,
    completedAt:
      i === 0
        ? "Today, 11:20 AM"
        : i === 1
          ? "Today, 08:45 AM"
          : i < 5
            ? "Yesterday"
            : `${Math.floor(i / 3)} days ago`,
    xpEarned: isMature ? 150 : 50,
    subject: SUBJECTS[i % SUBJECTS.length],
  };
});