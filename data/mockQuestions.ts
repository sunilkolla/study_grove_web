import type { PracticeQuestion } from "@/types";
import { year9Questions } from "./questions/year9";

/** Year 10+ and other legacy items; Year 9 bank lives in data/questions/year9/. */
const legacyYear10Plus: PracticeQuestion[] = [
  {
    id: "q-y10-1",
    subject: "BIOLOGY",
    subjectName: "Biology",
    examBoard: "AQA",
    topicCode: "BIO-AQA-4.1.1",
    topicName: "Cell Structure & Transport",
    questionText:
      "Which transport mechanism moves substances AGAINST a concentration gradient using energy from respiration?",
    options: [
      "Osmosis",
      "Diffusion",
      "Active Transport",
      "Facilitated Diffusion",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Active transport moves mineral ions from lower to higher concentration (e.g. root hair cells absorbing nitrates) using cellular ATP.",
    examTip:
      "Key buzzword: requires energy/ATP to move against/up the concentration gradient.",
    yearGroup: "Year 10",
    difficulty: "Intermediate",
    xpReward: 25,
  },
  {
    id: "q-y10-2",
    subject: "MATHS",
    subjectName: "Mathematics",
    examBoard: "EDEXCEL",
    topicCode: "MAT-EDX-2.3.4",
    topicName: "Trigonometry & Pythagoras",
    questionText:
      "In a right-angled triangle with hypotenuse 10 cm and angle θ where sin(θ) = 0.6, what is the opposite side length?",
    options: ["6 cm", "8 cm", "5 cm", "16.6 cm"],
    correctAnswerIndex: 0,
    explanation:
      "sin(θ) = Opposite / Hypotenuse. Therefore, Opposite = sin(θ) × Hypotenuse = 0.6 × 10 = 6 cm.",
    examTip: "Memorise SOH CAH TOA triangles for non-calculator and calculator papers.",
    yearGroup: "Year 10",
    difficulty: "Intermediate",
    xpReward: 25,
  },
  {
    id: "q-y10-3",
    subject: "CHEMISTRY",
    subjectName: "Chemistry",
    examBoard: "AQA",
    topicCode: "CHE-AQA-1.2.1",
    topicName: "Periodic Trends & Group 7",
    questionText: "Why does the reactivity of Group 7 halogens DECREASE down the group?",
    options: [
      "Atomic radius increases, so incoming electrons are less strongly attracted by the nucleus",
      "The number of neutrons decreases down the group",
      "The nuclear charge becomes negative",
      "Molecules become monoatomic gases",
    ],
    correctAnswerIndex: 0,
    explanation:
      "As atoms get larger down Group 7, increased electron shielding and greater distance reduce electrostatic attraction for gaining an electron.",
    examTip:
      "Contrasts directly with Group 1 where reactivity increases down the group because losing an electron is easier.",
    yearGroup: "Year 10",
    difficulty: "Intermediate",
    xpReward: 30,
  },
  {
    id: "q-y10-4",
    subject: "PHYSICS",
    subjectName: "Physics",
    examBoard: "OCR",
    topicCode: "PHY-OCR-3.1.2",
    topicName: "Kinetic & Potential Energy",
    questionText:
      "Calculate the kinetic energy of an 800 kg car travelling at 15 m/s (Ek = ½mv²):",
    options: ["90,000 J (90 kJ)", "12,000 J (12 kJ)", "180,000 J (180 kJ)", "6,000 J (6 kJ)"],
    correctAnswerIndex: 0,
    explanation: "Ek = 0.5 × 800 × (15)² = 400 × 225 = 90,000 Joules = 90 kJ.",
    examTip: "Don't forget to square velocity BEFORE multiplying by mass and 0.5.",
    yearGroup: "Year 10",
    difficulty: "Intermediate",
    xpReward: 25,
  },
  {
    id: "q-y11-1",
    subject: "MATHS",
    subjectName: "Mathematics",
    examBoard: "EDEXCEL",
    topicCode: "MAT-EDX-5.2.1",
    topicName: "Quadratic Inequalities (Higher Tier)",
    questionText: "Solve the quadratic inequality: x² - 5x - 14 < 0",
    options: ["-2 < x < 7", "x < -2 or x > 7", "x > 7", "-7 < x < 2"],
    correctAnswerIndex: 0,
    explanation:
      "Factorise: (x - 7)(x + 2) < 0. The roots are x = 7 and x = -2. For < 0, the curve lies below the x-axis: -2 < x < 7.",
    examTip:
      "Always sketch the parabola to determine whether the region is between roots or outside roots.",
    yearGroup: "Year 11",
    difficulty: "Higher",
    xpReward: 35,
  },
  {
    id: "q-y11-2",
    subject: "BIOLOGY",
    subjectName: "Biology",
    examBoard: "AQA",
    topicCode: "BIO-AQA-4.6.1",
    topicName: "Genetics, Punnett Squares & Mutations",
    questionText:
      "Two heterozygous parents (Bb) for cystic fibrosis have a child. What is the probability the child will be a CARRIER?",
    options: ["50% (2 in 4)", "25% (1 in 4)", "75% (3 in 4)", "100% (4 in 4)"],
    correctAnswerIndex: 0,
    explanation:
      "Punnett square yields: BB (healthy 25%), Bb (carrier 50%), bb (cystic fibrosis 25%). Carriers have one recessive allele without expressing the disease.",
    examTip:
      'Read carefully: "carrier" means heterozygous (Bb), distinct from "has the disorder" (bb).',
    yearGroup: "Year 11",
    difficulty: "Higher",
    xpReward: 35,
  },
  {
    id: "q-y11-3",
    subject: "PHYSICS",
    subjectName: "Physics",
    examBoard: "AQA",
    topicCode: "PHY-AQA-6.5.2",
    topicName: "Electromagnetism & Motor Effect",
    questionText:
      "According to Fleming's Left Hand Rule, what does the Second (Middle) finger represent?",
    options: [
      "Current (+ to -)",
      "Magnetic Field (N to S)",
      "Force / Motion",
      "Voltage",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Thumb = Motion/Force, First finger = Field (N to S), Second finger = Current (conventional positive to negative).",
    examTip:
      "Remember mnemonic: FBI (Force = Thumb, B-field = Forefinger, I-current = Second finger).",
    yearGroup: "Year 11",
    difficulty: "Higher",
    xpReward: 35,
  },
  {
    id: "q-y11-4",
    subject: "COMPUTER_SCIENCE",
    subjectName: "Computer Science",
    examBoard: "OCR",
    topicCode: "CS-OCR-2.1.1",
    topicName: "Binary Search Algorithm",
    questionText:
      "What is the mandatory prerequisite before executing a Binary Search on an array?",
    options: [
      "The array must be sorted in ascending or descending order",
      "The array must contain an even number of elements",
      "The values must all be positive integers",
      "The array must be stored on SSD storage",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Binary search divides the search space in half each comparison, which only works if the list is strictly ordered.",
    examTip:
      "Linear search works on unsorted lists; binary search strictly requires a sorted dataset with O(log n) efficiency.",
    yearGroup: "Year 11",
    difficulty: "Higher",
    xpReward: 35,
  },
  {
    id: "q-phy-1-5a",
    subject: "PHYSICS",
    subjectName: "Physics",
    examBoard: "AQA",
    topicCode: "PHY-AQA-1.5",
    topicName: "1.5 Energy Transfer by Heating",
    questionText:
      "Which method of thermal energy transfer occurs primarily in fluids (liquids and gases) due to density changes?",
    options: ["Conduction", "Convection", "Radiation", "Evaporation"],
    correctAnswerIndex: 1,
    explanation:
      "Convection involves circulation of fluid regions that expand, become less dense, and rise, while cooler dense fluid sinks — transferring energy through the bulk movement.",
    examTip: "Conduction needs a solid (or mainly particles touching); convection needs a fluid.",
    yearGroup: "Year 10",
    difficulty: "Foundation",
    xpReward: 25,
  },
  {
    id: "q-phy-1-5b",
    subject: "PHYSICS",
    subjectName: "Physics",
    examBoard: "AQA",
    topicCode: "PHY-AQA-1.5",
    topicName: "1.5 Energy Transfer by Heating",
    questionText:
      "Which surface colour would BEST reduce unwanted thermal radiation transfer from a hot object?",
    options: ["Polished silver", "Matt black", "White gloss", "Clear glass"],
    correctAnswerIndex: 0,
    explanation:
      "Shiny silver surfaces are poor emitters and poor absorbers of infrared radiation, so less energy is radiated away.",
    examTip: "Matt black is best for absorption/emission; silvered surfaces reduce radiation losses.",
    yearGroup: "Year 10",
    difficulty: "Intermediate",
    xpReward: 25,
  },
];

export const mockQuestions: PracticeQuestion[] = [
  ...year9Questions,
  ...legacyYear10Plus,
];

export { YEAR9_TOPICS, YEAR9_QUESTION_COUNT } from "./questions/year9";