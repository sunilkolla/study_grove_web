// —— Exam & curriculum ——
export type ExamBoard = "AQA" | "EDEXCEL" | "OCR" | "EDUQAS" | "WJEC" | "CCEA";

export type SubjectCode =
  | "MATHS"
  | "ENGLISH_LANGUAGE"
  | "ENGLISH_LITERATURE"
  | "BIOLOGY"
  | "CHEMISTRY"
  | "PHYSICS"
  | "COMBINED_SCIENCE"
  | "COMPUTER_SCIENCE"
  | "HISTORY"
  | "GEOGRAPHY";

/** @deprecated Prefer SubjectCode */
export type Subject = SubjectCode;

export type YearGroup = "Year 8" | "Year 9" | "Year 10" | "Year 11";
export type MasteryStatus = "RED" | "YELLOW" | "GREEN";
export type QuestionDifficulty = "Foundation" | "Intermediate" | "Higher";
export type FocusStatus = "COMPLETED" | "ABANDONED" | "IN_PROGRESS";
export type QuestionType = "MULTIPLE_CHOICE" | "FILL_IN_BLANK" | "MARK_SCHEME";

export type PracticeQuestionSource = "original" | "adapted";
export type PracticeQuestionStatus = "draft" | "reviewed";

// —— Practice & quiz ——
export interface PracticeQuestion {
  id: string;
  subject: SubjectCode;
  subjectName: string;
  examBoard: ExamBoard;
  topicCode: string;
  topicName: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  examTip?: string;
  yearGroup: YearGroup;
  difficulty: QuestionDifficulty;
  xpReward: number;
  /** Fine-grained skill tag, e.g. MAT.3.3.cf_median */
  subskillId?: string;
  /** Internal QA: why each option is right or wrong (not shown in UI). */
  distractorRationale?: [string, string, string, string];
  source?: PracticeQuestionSource;
  status?: PracticeQuestionStatus;
  /** Renders an SVG in the quiz UI when set (e.g. Year 9 maths). */
  diagramKey?: string;
  diagramParams?: PracticeQuestionDiagramParams;
}

export type PracticeQuestionBarChartParams = {
  kind: "barChart";
  title: string;
  yLabel: string;
  xLabel: string;
  yMax: number;
  yStep: number;
  bars: { label: string; value: number }[];
};

export type PracticeQuestionCumulativeFrequencyParams = {
  kind: "cumulativeFrequency";
  title: string;
  xLabel: string;
  yLabel: string;
  xMin: number;
  xMax: number;
  xStep: number;
  yMax: number;
  yStep: number;
  totalFrequency: number;
  /** Smooth CF curve through upper class bounds (x) and cumulative totals (y). */
  points: { x: number; cf: number }[];
  highlight?: {
    type: "median";
    xValue: number;
    cfLine: number;
  } | {
    type: "readBelow";
    xValue: number;
    cfValue: number;
  } | {
    type: "cfPosition";
    cfValue: number;
  };
};

export type PracticeQuestionBoxPlotParams = {
  kind: "boxPlot";
  title: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  axisMin?: number;
  axisMax?: number;
  highlight?: "iqr" | "range";
};

export type PracticeQuestionParallelLinesParams = {
  kind: "parallelLines";
  lineA: string;
  lineB: string;
  /** Degrees shown on the diagram */
  givenAngle: number;
  /** Label for the angle to find */
  unknownLabel: string;
  angleRelation: "alternate" | "coInterior" | "corresponding";
};

export type PracticeQuestionDiagramParams =
  | PracticeQuestionBarChartParams
  | PracticeQuestionCumulativeFrequencyParams
  | PracticeQuestionBoxPlotParams
  | PracticeQuestionParallelLinesParams;

// —— Tasks / revision schedule ——
export type RevisionTaskKind =
  | "practice"
  | "flashcards"
  | "focus"
  | "review"
  | "custom";

export type RevisionTaskSource = "manual" | "suggested" | "year_plan";

export type AcademicTermId = "autumn" | "spring" | "summer";

export interface TaskItem {
  id: string;
  title: string;
  subject: SubjectCode;
  /** ISO date YYYY-MM-DD */
  dueDate: string;
  /** Human label for dock (derived from dueDate). */
  dueDateLabel: string;
  isCompleted: boolean;
  priority?: "high" | "medium" | "low";
  source: RevisionTaskSource;
  kind: RevisionTaskKind;
  topicNodeId?: string;
  plannedMinutes?: number;
  /** ISO Monday of the week this task belongs to. */
  weekOf?: string;
  termId?: AcademicTermId;
}

/** Alias for schedule planning copy. */
export type RevisionTask = TaskItem;

export type TermGoalAssignment = {
  termId: AcademicTermId;
  syllabusSubject: string;
  mainTopicId: string;
  subtopicIds?: string[];
  note?: string;
};

export type PlanMilestone = {
  id: string;
  date: string;
  label: string;
  type: "mock" | "exam" | "custom";
};

export interface AcademicYearPlan {
  yearLabel: string;
  yearGroup: YearGroup;
  examBoard: ExamBoard;
  termGoals: TermGoalAssignment[];
  milestones: PlanMilestone[];
}

// —— Flashcards (SM-2 ready) ——
export interface Flashcard {
  id: string;
  topicNodeId: string;
  subject: SubjectCode;
  examBoard: ExamBoard;
  front: string;
  back: string;
  keyKeywords: string[];
  yearGroup?: YearGroup;
  sourceQuestionId?: string;
}

export interface FlashcardReview {
  id: string;
  userId: string;
  flashcardId: string;
  boxNumber: number;
  easeFactor: number;
  intervalDays: number;
  nextReviewDate: string;
}

// —— User & gamification ——
export interface UserStats {
  name: string;
  yearGroup: YearGroup;
  examBoard: ExamBoard;
  school: string;
  avatarUrl?: string;
  dailyStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  xpForNextLevel: number;
  currentLevelXP: number;
  targetDailyFocusMins: number;
  todayFocusMins: number;
  todayQuestionsSolved: number;
  targetDailyQuestions: number;
  accuracyToday: number;
  forestTreesCount: number;
  subscriptionTier: "PRO" | "FREE";
}

export type ShellUserStats = Pick<
  UserStats,
  | "name"
  | "yearGroup"
  | "examBoard"
  | "school"
  | "dailyStreak"
  | "totalXP"
  | "level"
  | "currentLevelXP"
  | "xpForNextLevel"
  | "todayQuestionsSolved"
  | "forestTreesCount"
>;

export interface YearGroupProfile {
  title: string;
  subtitle: string;
  stageDescription: string;
  targetFocusMins: number;
  targetQuestions: number;
  badgeLabel: string;
  recommendedBoard: string;
}

// —— Topics, focus, schedule (Phase 3+) ——
export interface ActiveTopic {
  id: string;
  code: string;
  name: string;
  subject: SubjectCode;
  subjectName: string;
  examBoard: ExamBoard;
  accuracyPercentage: number;
  status: MasteryStatus;
  questionsAttempted: number;
  totalQuestions: number;
  formulaNote?: string;
  yearGroup: YearGroup;
}

export type GroveBucket = SubjectCode | "CUSTOM";

export interface ForestTree {
  id: string;
  species: "English Oak" | "Scots Pine" | "Silver Birch" | "Rowan Sapling";
  durationMinutes: number;
  completedAt: string;
  xpEarned: number;
  /** Omitted for custom-focus sessions. */
  subject?: SubjectCode;
  groveBucket: GroveBucket;
}

export interface FocusSession {
  id: string;
  userId: string;
  subject?: SubjectCode;
  durationMins: number;
  treeSpecies: string;
  status: FocusStatus;
  completedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  tier: string;
  streak: number;
  longestStreak: number;
  totalXP: number;
  treesCount: number;
  targetDailyMins: number;
  lastActive: string;
}

// —— App routing ——
export const STUDY_NAV_ROUTES = [
  "/dashboard",
  "/focus",
  "/schedule",
  "/mindmaps",
  "/flashcards",
  "/quizzes",
  "/profile",
  "/settings",
] as const;

export type StudyNavHref = (typeof STUDY_NAV_ROUTES)[number];