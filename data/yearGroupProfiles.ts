import type { YearGroup, YearGroupProfile } from "@/types";

export const yearGroupProfiles: Record<YearGroup, YearGroupProfile> = {
  "Year 8": {
    title: "Year 8: Strong KS3 Foundations",
    subtitle: "Core skills and confidence before GCSE specifications kick in",
    stageDescription:
      "Build numeracy, literacy, and scientific thinking with shorter daily practice sessions.",
    targetFocusMins: 20,
    targetQuestions: 10,
    badgeLabel: "KS3 Bridge",
    recommendedBoard: "AQA · Edexcel KS3",
  },
  "Year 9": {
    title: "Year 9: Early GCSE Foundations",
    subtitle: "Building strong core concepts & revision habits for GCSE success",
    stageDescription:
      "Practice foundational concepts early. Master algebraic rules, microscope science, and energy basics before Year 10.",
    targetFocusMins: 30,
    targetQuestions: 15,
    badgeLabel: "GCSE Foundation Stage",
    recommendedBoard: "Edexcel & AQA Key Stages",
  },
  "Year 10": {
    title: "Year 10: Core GCSE Syllabus Deepening",
    subtitle: "Mastering specifications, spaced retrieval & multi-step problem solving",
    stageDescription:
      "Tackle official GCSE syllabus units across Sciences & Maths. Cement learning with daily retrieval questions.",
    targetFocusMins: 45,
    targetQuestions: 20,
    badgeLabel: "Core GCSE Syllabus",
    recommendedBoard: "AQA & Edexcel Specification",
  },
  "Year 11": {
    title: "Year 11: GCSE Exam Mastery & Past Papers",
    subtitle: "Exam technique, high-yield practice questions & official mark schemes",
    stageDescription:
      "Hone official exam timing, multi-mark calculation steps, and keyword precision for Grades 7 to 9.",
    targetFocusMins: 55,
    targetQuestions: 25,
    badgeLabel: "GCSE Exam Year",
    recommendedBoard: "AQA, Edexcel & OCR Past Papers",
  },
};