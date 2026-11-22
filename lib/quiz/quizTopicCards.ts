import {
  GCSE_SYLLABUS_BY_SUBJECT,
  SYLLABUS_SUBJECTS,
  type SyllabusMainTopic,
  type SyllabusSubjectCode,
} from "@/data/gcseSyllabus";
import { YEAR9_MATHS_TOPICS } from "@/data/questions/year9/maths/topicRegistry";
import {
  QUIZ_SUBJECT_FILTERS,
  subjectFilterLabel,
  type SubjectFilter,
} from "@/lib/quiz/subjectFilters";
import { topicCodeMatchesSubtopic } from "@/lib/topic/topicPractice";
import type { PracticeQuestion, SubjectCode, YearGroup } from "@/types";

export type QuizTopicCardModel = {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  practiceHref: string;
  subjectLabel?: string;
};

function syllabusCodeForSubject(subject: SubjectCode): SyllabusSubjectCode | undefined {
  return SYLLABUS_SUBJECTS.find((s) => s.mapsTo === subject)?.code;
}

export function countQuestionsForMainTopic(
  questions: PracticeQuestion[],
  mainTopic: SyllabusMainTopic,
): PracticeQuestion[] {
  return questions.filter((q) =>
    mainTopic.subtopics.some((st) => topicCodeMatchesSubtopic(q.topicCode, st)),
  );
}

export function buildTopicCardsForSubject(
  subject: SubjectCode,
  questions: PracticeQuestion[],
  yearGroup: YearGroup,
): QuizTopicCardModel[] {
  if (subject === "MATHS" && (yearGroup === "Year 9" || yearGroup === "Year 8")) {
    return YEAR9_MATHS_TOPICS.map((t) => ({
      id: t.key,
      title: t.title,
      description: t.description,
      questionCount: t.questions.length,
      practiceHref: `/quizzes/maths/${t.key}`,
    }));
  }

  const syllabusCode = syllabusCodeForSubject(subject);
  if (!syllabusCode) {
    const pool = questions.filter((q) => q.subject === subject);
    if (pool.length === 0) return [];
    return [
      {
        id: `${subject}-all`,
        title: subjectFilterLabel(subject),
        description: `All available ${subjectFilterLabel(subject)} practice questions.`,
        questionCount: pool.length,
        practiceHref: `/quizzes/topic/${subject}/_all`,
      },
    ];
  }

  const mainTopics = GCSE_SYLLABUS_BY_SUBJECT[syllabusCode];
  const cards: QuizTopicCardModel[] = [];

  for (const main of mainTopics) {
    const pool = countQuestionsForMainTopic(questions, main);
    if (pool.length === 0) continue;
    const blurb =
      main.subtopics.map((s) => s.name).slice(0, 2).join(" · ") ||
      `${main.subtopics.length} syllabus areas in this topic.`;
    cards.push({
      id: main.id,
      title: main.title,
      description: blurb,
      questionCount: pool.length,
      practiceHref: `/quizzes/topic/${subject}/${main.id}`,
    });
  }

  if (cards.length === 0) {
    const pool = questions.filter((q) => q.subject === subject);
    if (pool.length > 0) {
      cards.push({
        id: `${subject}-all`,
        title: subjectFilterLabel(subject),
        description: `All available ${subjectFilterLabel(subject)} practice questions.`,
        questionCount: pool.length,
        practiceHref: `/quizzes/topic/${subject}/_all`,
      });
    }
  }

  return cards;
}

export function buildTopicCardsForAll(
  questions: PracticeQuestion[],
  yearGroup: YearGroup,
): QuizTopicCardModel[] {
  const subjects = QUIZ_SUBJECT_FILTERS.filter((f): f is SubjectCode => f !== "ALL");
  return subjects.flatMap((subject) =>
    buildTopicCardsForSubject(subject, questions, yearGroup).map((card) => ({
      ...card,
      subjectLabel: subjectFilterLabel(subject),
    })),
  );
}

export function resolveMainTopicPractice(
  questions: PracticeQuestion[],
  subject: SubjectCode,
  mainTopicId: string,
): { title: string; questions: PracticeQuestion[] } | null {
  if (mainTopicId === "_all") {
    const pool = questions.filter((q) => q.subject === subject);
    return pool.length
      ? { title: subjectFilterLabel(subject as SubjectFilter), questions: pool }
      : null;
  }

  const syllabusCode = syllabusCodeForSubject(subject);
  if (!syllabusCode) return null;
  const main = GCSE_SYLLABUS_BY_SUBJECT[syllabusCode].find((t) => t.id === mainTopicId);
  if (!main) return null;
  const pool = countQuestionsForMainTopic(questions, main);
  return pool.length ? { title: main.title, questions: pool } : null;
}