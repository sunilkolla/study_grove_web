import { connection } from "next/server";
import { notFound } from "next/navigation";
import { MathsTopicQuizClient } from "@/components/quiz/MathsTopicQuizClient";
import {
  getYear9MathsTopic,
  isYear9MathsTopicKey,
  YEAR9_MATHS_TOPIC_KEYS,
} from "@/data/questions/year9/maths/topicRegistry";

export function generateStaticParams() {
  return YEAR9_MATHS_TOPIC_KEYS.map((topicKey) => ({ topicKey }));
}

type MathsTopicPageProps = {
  params: Promise<{ topicKey: string }>;
};

export default async function MathsTopicQuizPage({ params }: MathsTopicPageProps) {
  await connection();
  const { topicKey } = await params;

  if (!isYear9MathsTopicKey(topicKey)) {
    notFound();
  }

  const topic = getYear9MathsTopic(topicKey);

  return (
    <MathsTopicQuizClient
      topicTitle={topic.title}
      questions={topic.questions}
    />
  );
}