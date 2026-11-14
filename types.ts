// Enums
export type ExamBoard = "AQA" | "EDEXCEL" | "OCR" | "EDUQAS" | "WJEC";
export type Subject =
  | "MATHS"
  | "BIOLOGY"
  | "CHEMISTRY"
  | "PHYSICS"
  | "ENGLISH"
  | "COMPUTER_SCIENCE"
  | "GEOGRAPHY"
  | "HISTORY";
export type MasteryStatus = "RED" | "YELLOW" | "GREEN";
export type FocusStatus = "COMPLETED" | "ABANDONED" | "IN_PROGRESS";
export type QuestionType = "MULTIPLE_CHOICE" | "FILL_IN_BLANK" | "MARK_SCHEME";

// Models (expanded in Phase 2)
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

export interface Question {
  id: string;
  topicNodeId: string;
  questionType: QuestionType;
  questionText: string;
  options?: string[];
  wordBank?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Flashcard {
  id: string;
  topicNodeId: string;
  front: string;
  back: string;
  keyKeywords: string[];
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

export interface Task {
  id: string;
  userId: string;
  subject?: Subject;
  title: string;
  dueDateLabel: string;
  isCompleted: boolean;
}

export interface FocusSession {
  id: string;
  userId: string;
  subject?: Subject;
  durationMins: number;
  treeSpecies: string;
  status: FocusStatus;
  completedAt: string;
}

export interface TopicNode {
  id: string;
  subject: Subject;
  examBoard: ExamBoard;
  code: string;
  name: string;
  parentId?: string;
  children: TopicNode[];
}

export interface UserTopicMastery {
  userId: string;
  topicNodeId: string;
  attempts: number;
  correct: number;
  accuracy: number;
  status: MasteryStatus;
}