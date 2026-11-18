import type { SubjectCode } from "@/types";
import { year9BiologyQuestions } from "./biology";
import { year9ChemistryQuestions } from "./chemistry";
import { year9MathsQuestions } from "./maths";
import { year9PhysicsQuestions } from "./physics";

export { topicCode, YEAR9_BOARD, YEAR9_GROUP } from "./helpers";

export const year9Questions = [
  ...year9BiologyQuestions,
  ...year9ChemistryQuestions,
  ...year9PhysicsQuestions,
  ...year9MathsQuestions,
];

type Year9TopicMeta = {
  subtopicCodes: readonly string[];
  questionIds: readonly string[];
};

export const YEAR9_TOPICS: Record<
  Extract<SubjectCode, "BIOLOGY" | "CHEMISTRY" | "PHYSICS" | "MATHS">,
  Year9TopicMeta
> = {
  BIOLOGY: {
    subtopicCodes: ["4.1.1", "4.1.3", "4.2.1"],
    questionIds: year9BiologyQuestions.map((q) => q.id),
  },
  CHEMISTRY: {
    subtopicCodes: ["1.1", "1.2", "2.2"],
    questionIds: year9ChemistryQuestions.map((q) => q.id),
  },
  PHYSICS: {
    subtopicCodes: ["1.1", "1.5", "2.2"],
    questionIds: year9PhysicsQuestions.map((q) => q.id),
  },
  MATHS: {
    subtopicCodes: ["2.1", "2.2", "3.1"],
    questionIds: year9MathsQuestions.map((q) => q.id),
  },
};

export const YEAR9_QUESTION_COUNT = year9Questions.length;