"use client";

import { TopicQuizSlideDeck } from "./TopicQuizSlideDeck";
import type { PracticeQuestion } from "@/types";

type MathsTopicQuizClientProps = {
  topicTitle: string;
  questions: PracticeQuestion[];
};

export function MathsTopicQuizClient({
  topicTitle,
  questions,
}: MathsTopicQuizClientProps) {
  return (
    <TopicQuizSlideDeck
      topicTitle={topicTitle}
      questions={questions}
      exitHref="/quizzes?subject=MATHS"
    />
  );
}