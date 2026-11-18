import type { Flashcard } from "@/types";
import { year9Flashcards } from "./flashcards/year9";

const legacyFlashcards: Flashcard[] = [
  {
    id: "fc-bio-1",
    topicNodeId: "BIOLOGY-4.1.1",
    subject: "BIOLOGY",
    examBoard: "AQA",
    yearGroup: "Year 10",
    front: "What is active transport?",
    back: "Movement of particles against a concentration gradient using energy from respiration (ATP).",
    keyKeywords: ["active transport", "ATP", "concentration gradient"],
  },
  {
    id: "fc-bio-2",
    topicNodeId: "BIOLOGY-4.1.1",
    subject: "BIOLOGY",
    examBoard: "AQA",
    yearGroup: "Year 10",
    front: "Define osmosis.",
    back: "Net movement of water molecules through a partially permeable membrane from a dilute to a concentrated solution.",
    keyKeywords: ["osmosis", "water", "membrane"],
  },
  {
    id: "fc-mat-1",
    topicNodeId: "MATHS-2.3.4",
    subject: "MATHS",
    examBoard: "EDEXCEL",
    yearGroup: "Year 10",
    front: "State SOH for right-angled triangles.",
    back: "sin(θ) = Opposite ÷ Hypotenuse",
    keyKeywords: ["SOH", "trigonometry", "sine"],
  },
  {
    id: "fc-phy-1",
    topicNodeId: "PHYSICS-3.1.2",
    subject: "PHYSICS",
    examBoard: "OCR",
    yearGroup: "Year 10",
    front: "Kinetic energy equation",
    back: "Ek = ½mv² (Joules)",
    keyKeywords: ["kinetic", "energy", "Ek"],
  },
  {
    id: "fc-che-1",
    topicNodeId: "CHEMISTRY-1.2.1",
    subject: "CHEMISTRY",
    examBoard: "AQA",
    yearGroup: "Year 10",
    front: "Group 7 reactivity trend",
    back: "Reactivity decreases down Group 7 (halogens).",
    keyKeywords: ["Group 7", "halogens", "reactivity"],
  },
  {
    id: "fc-cs-1",
    topicNodeId: "COMPUTER_SCIENCE-2.1.1",
    subject: "COMPUTER_SCIENCE",
    examBoard: "OCR",
    yearGroup: "Year 10",
    front: "Binary search prerequisite",
    back: "The data must be sorted in ascending or descending order.",
    keyKeywords: ["binary search", "sorted", "O(log n)"],
  },
];

export const mockFlashcards: Flashcard[] = [
  ...legacyFlashcards,
  ...year9Flashcards,
];