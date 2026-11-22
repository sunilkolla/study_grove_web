import Link from "next/link";
import { Play } from "lucide-react";
import {
  YEAR9_MATHS_TOPICS,
  type Year9MathsTopicKey,
} from "@/data/questions/year9/maths/topicRegistry";

export function MathsTopicList() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {YEAR9_MATHS_TOPICS.map((topic) => (
        <li
          key={topic.key}
          className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2e4a73] dark:bg-[#1a2437]"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {topic.title}
          </h2>
          <p className="mt-1 flex-1 text-sm text-slate-600 dark:text-[#a0b9d9]">
            {topic.description}
          </p>
          <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-[#8fa8c9]">
            {topic.questions.length} practice questions
          </p>
          <Link
            href={`/quizzes/maths/${topic.key as Year9MathsTopicKey}`}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.98]"
          >
            <Play className="h-4 w-4" aria-hidden fill="currentColor" />
            Practice all
          </Link>
        </li>
      ))}
    </ul>
  );
}