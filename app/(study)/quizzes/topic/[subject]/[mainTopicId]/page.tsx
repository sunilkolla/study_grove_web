import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { SyllabusTopicQuizClient } from "@/components/quiz/SyllabusTopicQuizClient";
import { GCSE_SYLLABUS_BY_SUBJECT, SYLLABUS_SUBJECTS } from "@/data/gcseSyllabus";
import type { SubjectCode } from "@/types";
import { QUIZ_SUBJECT_FILTERS } from "@/lib/quiz/subjectFilters";

const VALID_SUBJECTS = QUIZ_SUBJECT_FILTERS.filter((f) => f !== "ALL") as SubjectCode[];

export function generateStaticParams() {
  const params: { subject: string; mainTopicId: string }[] = [];
  for (const subject of VALID_SUBJECTS) {
    const subjectLower = subject.toLowerCase();
    params.push({ subject: subjectLower, mainTopicId: "_all" });
    const syllabus = SYLLABUS_SUBJECTS.find((s) => s.mapsTo === subject)?.code;
    if (!syllabus) continue;
    for (const main of GCSE_SYLLABUS_BY_SUBJECT[syllabus]) {
      params.push({ subject: subjectLower, mainTopicId: main.id });
    }
  }
  return params;
}

type TopicQuizPageProps = {
  params: Promise<{ subject: string; mainTopicId: string }>;
};

export default async function SyllabusTopicQuizPage({ params }: TopicQuizPageProps) {
  await connection();
  const { subject: rawSubject, mainTopicId } = await params;
  const subject = rawSubject.toUpperCase() as SubjectCode;

  if (!VALID_SUBJECTS.includes(subject)) {
    notFound();
  }

  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
      <SyllabusTopicQuizClient subject={subject} mainTopicId={mainTopicId} />
    </Suspense>
  );
}