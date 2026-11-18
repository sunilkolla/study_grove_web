import type { PracticeQuestion } from "@/types";
import { baseYear9Question, topicCode } from "./helpers";

export const year9ChemistryQuestions: PracticeQuestion[] = [
  baseYear9Question({
    id: "q-y9-che-01",
    subject: "CHEMISTRY",
    subjectName: "Chemistry",
    topicCode: topicCode("CHE", "1.1"),
    topicName: "Atoms & Elements",
    questionText:
      "An atom has 6 protons. What element is it?",
    options: ["Carbon", "Oxygen", "Nitrogen", "Helium"],
    correctAnswerIndex: 0,
    explanation: "Atomic number = number of protons. 6 protons = carbon.",
    examTip: "Use the periodic table: atomic number is proton count.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
  baseYear9Question({
    id: "q-y9-che-02",
    subject: "CHEMISTRY",
    subjectName: "Chemistry",
    topicCode: topicCode("CHE", "1.1"),
    topicName: "Atoms & Elements",
    questionText:
      "Where are electrons found in an atom?",
    options: [
      "In energy levels (shells) around the nucleus",
      "Inside the nucleus with protons",
      "Mixed evenly with neutrons only",
      "Only in the outermost neutron shell",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Electrons occupy shells around the nucleus; protons and neutrons are in the nucleus.",
    examTip: "Mass is mostly in the nucleus; size is mostly empty space.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
  baseYear9Question({
    id: "q-y9-che-03",
    subject: "CHEMISTRY",
    subjectName: "Chemistry",
    topicCode: topicCode("CHE", "1.2"),
    topicName: "Bonding",
    questionText:
      "Sodium chloride (NaCl) is held together by which type of bond?",
    options: [
      "Ionic bonding",
      "Covalent bonding only",
      "Metallic bonding only",
      "Weak intermolecular forces only",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Metal + non-metal transfers electrons, forming oppositely charged ions.",
    examTip: "Covalent = non-metals sharing electrons.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
  baseYear9Question({
    id: "q-y9-che-04",
    subject: "CHEMISTRY",
    subjectName: "Chemistry",
    topicCode: topicCode("CHE", "1.2"),
    topicName: "Bonding",
    questionText:
      "In a molecule of water (H₂O), atoms are joined by…",
    options: [
      "Covalent bonds",
      "Ionic bonds",
      "Metallic bonds",
      "Hydrogen gas bonds",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Non-metal atoms share electrons in covalent bonds.",
    examTip: "Don't confuse covalent bonds with weak hydrogen bonds between molecules.",
    difficulty: "Intermediate",
    xpReward: 25,
  }),
  baseYear9Question({
    id: "q-y9-che-05",
    subject: "CHEMISTRY",
    subjectName: "Chemistry",
    topicCode: topicCode("CHE", "2.2"),
    topicName: "Acids & Alkalis",
    questionText:
      "What is the pH of a neutral solution at room temperature?",
    options: ["7", "1", "14", "0"],
    correctAnswerIndex: 0,
    explanation: "pH 7 is neutral; below 7 acidic, above 7 alkaline.",
    examTip: "Universal indicator is green at pH 7.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
];