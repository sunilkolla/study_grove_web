import {
  GCSE_SYLLABUS_BY_SUBJECT,
  SYLLABUS_SUBJECTS,
  type SyllabusMainTopic,
  type SyllabusSubjectCode,
} from "@/data/gcseSyllabus";
import {
  academicYearLabel,
  defaultMilestonesForYear,
  termStartIso,
  weeksInTerm,
} from "@/lib/academicYear";
import { addDaysIso, mondayOfWeekIso, todayIso } from "@/lib/revisionDates";
import type {
  AcademicTermId,
  AcademicYearPlan,
  SubjectCode,
  TermGoalAssignment,
} from "@/types";
import {
  getSessionAcademicYearPlan,
  setSessionAcademicYearPlan,
} from "./mockSessionStore";
import { bulkCreateTasks } from "./taskService";
import { getSessionUserStats } from "./mockSessionStore";

export async function fetchAcademicYearPlan(): Promise<AcademicYearPlan> {
  const plan = getSessionAcademicYearPlan();
  const stats = getSessionUserStats();
  const label = academicYearLabel();
  if (plan.yearLabel !== label) {
    const refreshed: AcademicYearPlan = {
      yearLabel: label,
      yearGroup: stats.yearGroup,
      examBoard: stats.examBoard ?? "AQA",
      termGoals: plan.termGoals,
      milestones: defaultMilestonesForYear(label),
    };
    setSessionAcademicYearPlan(refreshed);
    return refreshed;
  }
  return plan;
}

export async function saveTermGoal(
  goal: TermGoalAssignment,
): Promise<AcademicYearPlan> {
  const plan = getSessionAcademicYearPlan();
  const without = plan.termGoals.filter(
    (g) =>
      !(
        g.termId === goal.termId &&
        g.syllabusSubject === goal.syllabusSubject &&
        g.mainTopicId === goal.mainTopicId
      ),
  );
  const next: AcademicYearPlan = {
    ...plan,
    termGoals: [...without, goal],
  };
  setSessionAcademicYearPlan(next);
  return next;
}

export async function removeTermGoal(
  termId: AcademicTermId,
  syllabusSubject: string,
  mainTopicId: string,
): Promise<AcademicYearPlan> {
  const plan = getSessionAcademicYearPlan();
  const next: AcademicYearPlan = {
    ...plan,
    termGoals: plan.termGoals.filter(
      (g) =>
        !(
          g.termId === termId &&
          g.syllabusSubject === syllabusSubject &&
          g.mainTopicId === mainTopicId
        ),
    ),
  };
  setSessionAcademicYearPlan(next);
  return next;
}

function syllabusSubjectToCode(code: SyllabusSubjectCode): SubjectCode {
  return SYLLABUS_SUBJECTS.find((s) => s.code === code)?.mapsTo ?? "BIOLOGY";
}

function mainTopicsFor(subject: SyllabusSubjectCode): SyllabusMainTopic[] {
  return GCSE_SYLLABUS_BY_SUBJECT[subject] ?? [];
}

export function listMainTopics(
  syllabusSubject: SyllabusSubjectCode,
): SyllabusMainTopic[] {
  return mainTopicsFor(syllabusSubject);
}

/** Spread subtopics from a main topic evenly across weeks in a term. */
export async function spreadMainTopicToWeekTasks(input: {
  syllabusSubject: SyllabusSubjectCode;
  mainTopicId: string;
  termId: AcademicTermId;
}): Promise<number> {
  const topics = mainTopicsFor(input.syllabusSubject);
  const main = topics.find((t) => t.id === input.mainTopicId);
  if (!main) return 0;
  const subject = syllabusSubjectToCode(input.syllabusSubject);
  const subtopics = main.subtopics;
  if (subtopics.length === 0) return 0;

  const termStart = termStartIso(input.termId);
  const weekCount = weeksInTerm(input.termId);
  const items = subtopics.map((st, index) => {
    const weekIndex = Math.min(
      weekCount - 1,
      Math.floor((index / subtopics.length) * weekCount),
    );
    const weekMonday = addDaysIso(mondayOfWeekIso(termStart), weekIndex * 7);
    const dueDate = addDaysIso(weekMonday, 2);
    return {
      id: `year-${input.termId}-${st.id}`,
      title: `Practice: ${st.name} (10 questions)`,
      subject,
      dueDate,
      kind: "practice" as const,
      source: "year_plan" as const,
      topicNodeId: st.id,
      termId: input.termId,
    };
  });

  await bulkCreateTasks(items);
  await saveTermGoal({
    termId: input.termId,
    syllabusSubject: input.syllabusSubject,
    mainTopicId: input.mainTopicId,
    subtopicIds: subtopics.map((s) => s.id),
  });
  return items.length;
}

/** Add reminder tasks the week before each milestone. */
export async function addMilestoneReminderTasks(): Promise<number> {
  const plan = await fetchAcademicYearPlan();
  const today = todayIso();
  let created = 0;
  const items = plan.milestones
    .filter((m) => m.date >= today)
    .map((m) => {
      const dueDate = addDaysIso(m.date, -7);
      return {
        id: `ms-task-${m.id}`,
        title: `Prepare: ${m.label}`,
        subject: "MATHS" as SubjectCode,
        dueDate: dueDate < today ? today : dueDate,
        kind: "review" as const,
        source: "year_plan" as const,
      };
    });
  await bulkCreateTasks(items);
  created = items.length;
  return created;
}