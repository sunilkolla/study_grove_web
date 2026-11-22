import type { PracticeQuestion } from "@/types";
import type { SyllabusSubtopic } from "@/data/gcseSyllabus";

export type TopicPracticeScope =
  | { mode: "subtopic"; subtopic: SyllabusSubtopic }
  | { mode: "mainTopic"; mainTopicId: string; subtopicIds: string[] }
  | { mode: "subject"; subject: string }
  | { mode: "all" };

/** e.g. BIO-AQA-4.1.1 ↔ subtopic id BIOLOGY-4.1.1, code 4.1.1 */
export function topicCodeMatchesSubtopic(
  questionTopicCode: string,
  subtopic: SyllabusSubtopic,
): boolean {
  const dotted = subtopic.code;
  const dashed = subtopic.code.replaceAll(".", "-");
  const upper = questionTopicCode.toUpperCase();
  return (
    upper.includes(dotted) ||
    upper.includes(dashed) ||
    upper.includes(subtopic.id) ||
    upper.endsWith(dotted) ||
    upper.endsWith(dashed)
  );
}

/** Resolve questions for the active practice scope (topic codes + subject). */
export function filterQuestionsForScope(
  questions: PracticeQuestion[],
  scope: TopicPracticeScope,
  subtopicsById: Map<string, SyllabusSubtopic>,
): PracticeQuestion[] {
  if (scope.mode === "all") return questions;

  if (scope.mode === "subject") {
    const subject = scope.subject;
    return questions.filter((q) => {
      if (q.subject === subject) return true;
      if (subject === "ENGLISH") {
        return (
          q.subject === "ENGLISH_LANGUAGE" ||
          q.subject === "ENGLISH_LITERATURE"
        );
      }
      return false;
    });
  }

  if (scope.mode === "subtopic") {
    const { subtopic } = scope;
    const byCode = questions.filter((q) =>
      topicCodeMatchesSubtopic(q.topicCode, subtopic),
    );
    if (byCode.length > 0) return byCode;
    return questions.filter((q) => q.subject === subtopic.subject);
  }

  const subtopics = scope.subtopicIds
    .map((id) => subtopicsById.get(id))
    .filter(Boolean) as SyllabusSubtopic[];

  const matched = questions.filter((q) =>
    subtopics.some((st) => topicCodeMatchesSubtopic(q.topicCode, st)),
  );
  if (matched.length > 0) return matched;

  const subject = subtopics[0]?.subject;
  if (subject) {
    return questions.filter((q) => q.subject === subject);
  }
  return questions;
}