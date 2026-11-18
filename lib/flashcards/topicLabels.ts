import { getSubtopicById } from "@/data/gcseSyllabus";

export function labelForTopicNodeId(topicNodeId: string): string {
  const fromSyllabus = getSubtopicById(topicNodeId);
  if (fromSyllabus) return fromSyllabus.name;
  const dash = topicNodeId.indexOf("-");
  if (dash >= 0) return topicNodeId.slice(dash + 1);
  return topicNodeId;
}