import type { ExamBoard } from "@/types";

/** Primary GCSE boards shown in profile (business rules). */
export const PRIMARY_EXAM_BOARDS: ExamBoard[] = ["AQA", "EDEXCEL", "OCR"];

export function examBoardLabel(board: ExamBoard): string {
  if (board === "EDEXCEL") return "Edexcel";
  return board.charAt(0) + board.slice(1).toLowerCase();
}

export function examBoardSidebarLabel(board: ExamBoard): string {
  return board === "EDEXCEL" ? "EDEXCEL" : board;
}