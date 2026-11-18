import type { PracticeQuestion } from "@/types";
import { baseYear9Question, topicCode } from "./helpers";

export const year9PhysicsQuestions: PracticeQuestion[] = [
  baseYear9Question({
    id: "q-y9-phy-01",
    subject: "PHYSICS",
    subjectName: "Physics",
    topicCode: topicCode("PHY", "1.1"),
    topicName: "Physical Changes",
    questionText:
      "Which change is a physical change?",
    options: [
      "Ice melting to water",
      "Iron rusting",
      "Wood burning",
      "Magnesium reacting with oxygen",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Melting changes state only; no new chemical substance is formed.",
    examTip: "New substances = chemical change; change of state = physical.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
  baseYear9Question({
    id: "q-y9-phy-02",
    subject: "PHYSICS",
    subjectName: "Physics",
    topicCode: topicCode("PHY", "1.1"),
    topicName: "Physical Changes",
    questionText:
      "The particles in a solid are best described as…",
    options: [
      "Close together and vibrating in fixed positions",
      "Far apart and moving quickly at random",
      "Close together but sliding past each other",
      "Not moving at all",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Solids have a fixed volume and shape; particles vibrate about fixed points.",
    examTip: "Liquid = touching but flowing; gas = far apart.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
  baseYear9Question({
    id: "q-y9-phy-03",
    subject: "PHYSICS",
    subjectName: "Physics",
    topicCode: topicCode("PHY", "1.5"),
    topicName: "Energy Stores & Transfers",
    questionText:
      "A battery-powered torch stores energy mainly as…",
    options: [
      "Chemical energy",
      "Gravitational potential energy",
      "Elastic potential energy",
      "Nuclear energy",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Chemical store in the battery transfers electrically to light and thermal.",
    examTip: "Name the store before describing the pathway.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
  baseYear9Question({
    id: "q-y9-phy-04",
    subject: "PHYSICS",
    subjectName: "Physics",
    topicCode: topicCode("PHY", "1.5"),
    topicName: "Energy Stores & Transfers",
    questionText:
      "Thermal energy transfer through liquids and gases by bulk movement is called…",
    options: ["Convection", "Conduction", "Insulation", "Evaporation only"],
    correctAnswerIndex: 0,
    explanation:
      "Convection circulates fluid due to density differences when heated.",
    examTip: "Conduction needs particles in contact in solids mainly.",
    difficulty: "Intermediate",
    xpReward: 25,
  }),
  baseYear9Question({
    id: "q-y9-phy-05",
    subject: "PHYSICS",
    subjectName: "Physics",
    topicCode: topicCode("PHY", "2.2"),
    topicName: "Acceleration",
    questionText:
      "A car speeds up from rest. Which quantity is changing if its velocity increases?",
    options: [
      "Acceleration is occurring",
      "The car must be at constant speed",
      "Mass is always decreasing",
      "Distance must be zero",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Acceleration is the rate of change of velocity.",
    examTip: "Velocity has direction; speeding up is acceleration.",
    difficulty: "Foundation",
    xpReward: 20,
  }),
];