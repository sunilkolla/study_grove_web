// Enums
type ExamBoard = 'AQA' | 'EDEXCEL' | 'OCR' | 'EDUQAS' | 'WJEC';
type Subject = 'MATHS' | 'BIOLOGY' | 'CHEMISTRY' | 'PHYSICS' | 'ENGLISH' | 'COMPUTER_SCIENCE' | 'GEOGRAPHY' | 'HISTORY';
type MasteryStatus = 'RED' | 'YELLOW' | 'GREEN';
type FocusStatus = 'COMPLETED' | 'ABANDONED' | 'IN_PROGRESS';
type QuestionType = 'MULTIPLE_CHOICE' | 'FILL_IN_BLANK' | 'MARK_SCHEME';

// Models
interface User { id, name, email, tier, streak, longestStreak, totalXP, treesCount, targetDailyMins, lastActive }
interface Question { id, topicNodeId, questionType, questionText, options?, wordBank?, correctAnswer, explanation }
interface Flashcard { id, topicNodeId, front, back, keyKeywords[] }
interface FlashcardReview { id, userId, flashcardId, boxNumber, easeFactor, intervalDays, nextReviewDate }
interface Task { id, userId, subject?, title, dueDateLabel, isCompleted }
interface FocusSession { id, userId, subject?, durationMins, treeSpecies, status, completedAt }
interface TopicNode { id, subject, examBoard, code, name, parentId?, children[] }
interface UserTopicMastery { userId, topicNodeId, attempts, correct, accuracy, status }