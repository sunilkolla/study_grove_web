import type { SyllabusSubtopic } from "@/data/gcseSyllabus";
import {
  filterQuestionsForScope,
  type TopicPracticeScope,
} from "@/lib/topic/topicPractice";
import type { SubjectFilter } from "@/lib/quiz/subjectFilters";
import type { PracticeQuestion, SubjectCode } from "@/types";

/**
 * ALL → respect pinned syllabus scope; a subject chip → full year pool for that subject.
 */
export function questionsForSubjectFilter(
  questions: PracticeQuestion[],
  scope: TopicPracticeScope,
  subjectFilter: SubjectFilter,
  subtopicsById: Map<string, SyllabusSubtopic>,
): PracticeQuestion[] {
  if (subjectFilter === "ALL") {
    return filterQuestionsForScope(questions, scope, subtopicsById);
  }
  return questions.filter((q) => q.subject === subjectFilter);
}

export function countBySubject(
  questions: PracticeQuestion[],
): Map<SubjectCode, number> {
  const counts = new Map<SubjectCode, number>();
  for (const q of questions) {
    counts.set(q.subject, (counts.get(q.subject) ?? 0) + 1);
  }
  return counts;
}

export function subjectQuestionCount(
  questions: PracticeQuestion[],
  filter: SubjectFilter,
): number {
  if (filter === "ALL") return questions.length;
  return questions.filter((q) => q.subject === filter).length;
}