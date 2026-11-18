import type { PracticeQuestion } from "@/types";
import { baseYear9Question, topicCode } from "./helpers";

export const year9BiologyQuestions: PracticeQuestion[] = [
  baseYear9Question({
    id: "q-y9-bio-01",
    subject: "BIOLOGY",
    subjectName: "Biology",
    topicCode: topicCode("BIO", "4.1.1"),
    topicName: "Cell Structure",
    questionText:
      "Which structure is found in plant cells but not in animal cells?",
    options: [
      "Chloroplast",
      "Mitochondrion",
      "Nucleus",
      "Cell membrane",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Plant cells have chloroplasts for photosynthesis. Animal cells do not.",
    examTip: "Remember: cell wall + chloroplast + large permanent vacuole = plant.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
  baseYear9Question({
    id: "q-y9-bio-02",
    subject: "BIOLOGY",
    subjectName: "Biology",
    topicCode: topicCode("BIO", "4.1.1"),
    topicName: "Cell Structure",
    questionText:
      "What is the function of the nucleus in a eukaryotic cell?",
    options: [
      "Contains genetic material and controls cell activities",
      "Releases energy from respiration",
      "Synthesises proteins for export",
      "Stores cell sap in plant cells",
    ],
    correctAnswerIndex: 0,
    explanation:
      "The nucleus holds DNA and coordinates cell growth and division.",
    examTip: "Mitochondria = energy; ribosomes = protein synthesis.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
  baseYear9Question({
    id: "q-y9-bio-03",
    subject: "BIOLOGY",
    subjectName: "Biology",
    topicCode: topicCode("BIO", "4.1.3"),
    topicName: "Transport in Cells",
    questionText:
      "Which process moves particles from an area of high concentration to low concentration without using energy?",
    options: ["Diffusion", "Active transport", "Osmosis only", "Respiration"],
    correctAnswerIndex: 0,
    explanation:
      "Diffusion is passive movement down a concentration gradient.",
    examTip: "Osmosis is diffusion of water — still passive.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
  baseYear9Question({
    id: "q-y9-bio-04",
    subject: "BIOLOGY",
    subjectName: "Biology",
    topicCode: topicCode("BIO", "4.1.3"),
    topicName: "Transport in Cells",
    questionText:
      "In osmosis, water molecules move through a partially permeable membrane from…",
    options: [
      "A dilute solution to a more concentrated solution",
      "A concentrated solution to a dilute solution",
      "Only into plant roots using ATP",
      "High temperature to low temperature",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Water moves to where solute concentration is higher (dilute → concentrated side of membrane).",
    examTip: "Link 'dilute' with higher water potential.",
    difficulty: "Intermediate",
    xpReward: 25,
  }),
  baseYear9Question({
    id: "q-y9-bio-05",
    subject: "BIOLOGY",
    subjectName: "Biology",
    topicCode: topicCode("BIO", "4.2.1"),
    topicName: "Digestive System",
    questionText:
      "Where does most chemical digestion of food take place?",
    options: [
      "Small intestine",
      "Stomach only",
      "Large intestine",
      "Oesophagus",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Enzymes in the small intestine complete digestion and absorption follows.",
    examTip: "Stomach starts protein digestion; small intestine finishes most.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
];