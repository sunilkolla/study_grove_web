import type { PracticeQuestion } from "@/types";
import { year9MathsGeometricalQuestions } from "./maths/geometrical";
import { year9MathsSimultaneousQuestions } from "./maths/simultaneous";
import { year9MathsStatisticsQuestions } from "./maths/statistics";
import { year9MathsProportionalQuestions } from "./maths/proportional";

export const year9MathsQuestions: PracticeQuestion[] = [
  ...year9MathsGeometricalQuestions,
  ...year9MathsSimultaneousQuestions,
  ...year9MathsStatisticsQuestions,
  ...year9MathsProportionalQuestions,
];

export {
  year9MathsGeometricalQuestions,
  year9MathsSimultaneousQuestions,
  year9MathsStatisticsQuestions,
  year9MathsProportionalQuestions,
};