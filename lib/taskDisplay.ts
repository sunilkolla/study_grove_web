import {
  BookOpen,
  Brain,
  Clock,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import type { RevisionTaskKind } from "@/types";

export const TASK_KIND_META: Record<
  RevisionTaskKind,
  { label: string; Icon: LucideIcon }
> = {
  practice: { label: "Practice", Icon: BookOpen },
  flashcards: { label: "Flashcards", Icon: Brain },
  focus: { label: "Focus", Icon: Clock },
  review: { label: "Review", Icon: ListChecks },
  custom: { label: "Task", Icon: ListChecks },
};