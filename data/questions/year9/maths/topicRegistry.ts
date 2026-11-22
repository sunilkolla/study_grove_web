import type { PracticeQuestion } from "@/types";
import { year9MathsGeometricalQuestions } from "./geometrical";
import { year9MathsSimultaneousQuestions } from "./simultaneous";
import { year9MathsStatisticsQuestions } from "./statistics";
import { year9MathsProportionalQuestions } from "./proportional";

export const YEAR9_MATHS_TOPIC_KEYS = [
  "geometrical",
  "simultaneous",
  "statistics",
  "proportional",
] as const;

export type Year9MathsTopicKey = (typeof YEAR9_MATHS_TOPIC_KEYS)[number];

export type Year9MathsTopicMeta = {
  key: Year9MathsTopicKey;
  title: string;
  description: string;
  questions: PracticeQuestion[];
};

export const YEAR9_MATHS_TOPICS: Year9MathsTopicMeta[] = [
  {
    key: "geometrical",
    title: "Geometrical Reasoning",
    description: "Angles, polygons, and Pythagoras' theorem.",
    questions: year9MathsGeometricalQuestions,
  },
  {
    key: "simultaneous",
    title: "Simultaneous Equations",
    description: "Elimination, substitution, word problems, and graphs.",
    questions: year9MathsSimultaneousQuestions,
  },
  {
    key: "statistics",
    title: "Statistics",
    description: "Averages, quartiles, cumulative frequency, and box plots.",
    questions: year9MathsStatisticsQuestions,
  },
  {
    key: "proportional",
    title: "Proportional Reasoning",
    description: "Fractions, percentages, ratio, and standard form.",
    questions: year9MathsProportionalQuestions,
  },
];

export const YEAR9_MATHS_TOPIC_BY_KEY: Record<
  Year9MathsTopicKey,
  Year9MathsTopicMeta
> = Object.fromEntries(
  YEAR9_MATHS_TOPICS.map((t) => [t.key, t]),
) as Record<Year9MathsTopicKey, Year9MathsTopicMeta>;

export function isYear9MathsTopicKey(
  value: string,
): value is Year9MathsTopicKey {
  return (YEAR9_MATHS_TOPIC_KEYS as readonly string[]).includes(value);
}

export function getYear9MathsTopic(
  key: Year9MathsTopicKey,
): Year9MathsTopicMeta {
  return YEAR9_MATHS_TOPIC_BY_KEY[key];
}