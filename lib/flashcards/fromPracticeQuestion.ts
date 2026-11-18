import type { Flashcard, PracticeQuestion, SubjectCode } from "@/types";

/** Syllabus subtopic id, e.g. BIOLOGY-4.1.1 from BIO-AQA-4.1.1 */
export function subtopicIdFromTopicCode(
  topicCode: string,
  subject: SubjectCode,
): string {
  const parts = topicCode.split("-");
  const subtopicCode = parts[parts.length - 1] ?? topicCode;
  return `${subject}-${subtopicCode}`;
}

function buildKeyKeywords(q: PracticeQuestion): string[] {
  const answer = q.options[q.correctAnswerIndex] ?? "";
  const tokens = `${q.topicName} ${answer}`
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3);
  const unique = [...new Set(tokens)];
  const fromTopic = q.topicName
    .toLowerCase()
    .split(/\s+/)
    .slice(0, 2)
    .filter(Boolean);
  const merged = [...new Set([...fromTopic, ...unique])];
  return merged.slice(0, 4);
}

function buildBack(q: PracticeQuestion): string {
  const answer = q.options[q.correctAnswerIndex] ?? "";
  const lines = [`Answer: ${answer}`, "", q.explanation];
  if (q.examTip) {
    lines.push("", `Tip: ${q.examTip}`);
  }
  return lines.join("\n");
}

export function flashcardFromPracticeQuestion(q: PracticeQuestion): Flashcard {
  const id = q.id.startsWith("q-") ? q.id.replace(/^q-/, "fc-") : `fc-${q.id}`;
  return {
    id,
    topicNodeId: subtopicIdFromTopicCode(q.topicCode, q.subject),
    subject: q.subject,
    examBoard: q.examBoard,
    front: q.questionText,
    back: buildBack(q),
    keyKeywords: buildKeyKeywords(q),
    yearGroup: q.yearGroup,
    sourceQuestionId: q.id,
  };
}