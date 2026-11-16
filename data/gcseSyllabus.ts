import type { SubjectCode } from "@/types";

/** Navigator subjects (sidebar + syllabus pills). */
export type SyllabusSubjectCode =
  | "PHYSICS"
  | "BIOLOGY"
  | "CHEMISTRY"
  | "MATHS"
  | "COMPUTER_SCIENCE"
  | "ENGLISH"
  | "GEOGRAPHY";

export const SYLLABUS_SUBJECTS: {
  code: SyllabusSubjectCode;
  label: string;
  examBoardLabel: string;
  mapsTo: SubjectCode;
}[] = [
  { code: "PHYSICS", label: "Physics", examBoardLabel: "AQA GCSE", mapsTo: "PHYSICS" },
  { code: "BIOLOGY", label: "Biology", examBoardLabel: "AQA GCSE", mapsTo: "BIOLOGY" },
  { code: "CHEMISTRY", label: "Chemistry", examBoardLabel: "AQA GCSE", mapsTo: "CHEMISTRY" },
  { code: "MATHS", label: "Maths", examBoardLabel: "Edexcel GCSE", mapsTo: "MATHS" },
  {
    code: "COMPUTER_SCIENCE",
    label: "Computer Science",
    examBoardLabel: "OCR GCSE",
    mapsTo: "COMPUTER_SCIENCE",
  },
  { code: "ENGLISH", label: "English", examBoardLabel: "AQA GCSE", mapsTo: "ENGLISH_LANGUAGE" },
  { code: "GEOGRAPHY", label: "Geography", examBoardLabel: "AQA GCSE", mapsTo: "GEOGRAPHY" },
];

export type SyllabusSubtopic = {
  id: string;
  code: string;
  name: string;
  description: string;
  subject: SubjectCode;
  mainTopicId: string;
  masteryPercent: number;
};

export type SyllabusMainTopic = {
  id: string;
  index: number;
  title: string;
  subject: SyllabusSubjectCode;
  masteryPercent: number;
  subtopics: SyllabusSubtopic[];
};

function sub(
  subject: SubjectCode,
  mainId: string,
  code: string,
  name: string,
  description: string,
  masteryPercent: number,
): SyllabusSubtopic {
  return {
    id: `${subject}-${code}`,
    code,
    name,
    description,
    subject,
    mainTopicId: mainId,
    masteryPercent,
  };
}

const PHY = "PHYSICS" as SubjectCode;
const phy1 = "phy-energy-matter";
const phy2 = "phy-motion-forces";
const phy3 = "phy-waves";
const phy4 = "phy-electricity";

const physicsMainTopics: SyllabusMainTopic[] = [
  {
    id: phy1,
    index: 1,
    title: "Energy & Matter",
    subject: "PHYSICS",
    masteryPercent: 68,
    subtopics: [
      sub(PHY, phy1, "1.1", "Physical Changes", "States of matter and physical vs chemical changes.", 85),
      sub(
        PHY,
        phy1,
        "1.2",
        "Particle Movement",
        "Kinetic theory of solids, liquids, and gases; particle spacing and motion.",
        72,
      ),
      sub(
        PHY,
        phy1,
        "1.3",
        "Internal Energy",
        "Changes in the energy store of a system when heated or cooled.",
        55,
      ),
      sub(
        PHY,
        phy1,
        "1.4",
        "Energy Transfers",
        "Mechanical work, electrical heating, and conservation in systems.",
        55,
      ),
      sub(
        PHY,
        phy1,
        "1.5",
        "Energy Transfer by Heating",
        "Conduction, convection, radiation, and reducing unwanted energy transfers in thermal systems.",
        65,
      ),
      sub(
        PHY,
        phy1,
        "1.6",
        "Reducing Unwanted Transfers",
        "Insulation, U-values, and practical ways to limit heat loss.",
        42,
      ),
      sub(PHY, phy1, "1.7", "Energy Resources", "Renewable and non-renewable resources; reliability and impact.", 38),
      sub(PHY, phy1, "1.8", "Efficiency", "Useful vs wasted energy; calculations and improving efficiency.", 62),
      sub(PHY, phy1, "1.9", "Energy and Power", "Gravitational, elastic, kinetic stores; power as rate of transfer.", 78),
      sub(PHY, phy1, "1.10", "Energy in Systems", "Sankey diagrams and comparing energy resources for electricity.", 71),
    ],
  },
  {
    id: phy2,
    index: 2,
    title: "Motion & Forces",
    subject: "PHYSICS",
    masteryPercent: 70,
    subtopics: [
      sub(PHY, phy2, "2.1", "Speed & Distance", "Scalars, vectors, and average speed calculations.", 68),
      sub(PHY, phy2, "2.2", "Acceleration", "Uniform acceleration and interpreting motion graphs.", 70),
      sub(PHY, phy2, "2.3", "Forces & Motion", "Newton's first law and resultant forces.", 64),
      sub(PHY, phy2, "2.4", "Newton's Second Law", "F = ma; mass, force, and acceleration.", 58),
      sub(PHY, phy2, "2.5", "Weight & Gravity", "Weight, mass, and gravitational field strength.", 75),
      sub(PHY, phy2, "2.6", "Stopping Distances", "Thinking and braking distance; factors that affect them.", 52),
      sub(PHY, phy2, "2.7", "Momentum", "Conservation of momentum in collisions.", 48),
      sub(PHY, phy2, "2.8", "Moments", "Levers, gears, and balancing pivots.", 66),
      sub(PHY, phy2, "2.9", "Pressure", "Pressure in fluids and applications.", 61),
      sub(PHY, phy2, "2.10", "Circular Motion", "Centripetal force and orbital motion.", 44),
      sub(PHY, phy2, "2.11", "Elasticity", "Hooke's law and energy in springs.", 73),
      sub(PHY, phy2, "2.12", "Terminal Velocity", "Drag, weight, and balanced forces.", 69),
      sub(PHY, phy2, "2.13", "Newton's Third Law", "Action–reaction pairs in everyday systems.", 77),
      sub(PHY, phy2, "2.14", "Vehicle Safety", "Crumple zones, airbags, and seat belts.", 56),
    ],
  },
  {
    id: phy3,
    index: 3,
    title: "Waves",
    subject: "PHYSICS",
    masteryPercent: 71,
    subtopics: [
      sub(PHY, phy3, "3.1", "Wave Properties", "Amplitude, frequency, wavelength, and period.", 74),
      sub(PHY, phy3, "3.2", "Transverse & Longitudinal", "Examples and particle motion in each wave type.", 80),
      sub(PHY, phy3, "3.3", "Electromagnetic Spectrum", "Order, uses, and hazards of EM radiation.", 68),
      sub(PHY, phy3, "3.4", "Sound Waves", "Pitch, loudness, and hearing range.", 62),
      sub(PHY, phy3, "3.5", "Reflection & Refraction", "Ray diagrams and critical angle.", 59),
      sub(PHY, phy3, "3.6", "Lenses", "Converging and diverging lenses; magnification.", 71),
      sub(PHY, phy3, "3.7", "Ultrasound", "Medical imaging and industrial uses.", 46),
      sub(PHY, phy3, "3.8", "Seismic Waves", "P-waves, S-waves, and earthquake detection.", 53),
      sub(PHY, phy3, "3.9", "Radio Waves", "Communication, diffraction, and ionosphere.", 67),
    ],
  },
  {
    id: phy4,
    index: 4,
    title: "Electricity & Electromagnetism",
    subject: "PHYSICS",
    masteryPercent: 68,
    subtopics: [
      sub(PHY, phy4, "4.1", "Current & Charge", "Flow of charge, current, and simple circuits.", 70),
      sub(PHY, phy4, "4.2", "Potential Difference", "Energy per unit charge and voltmeters.", 63),
      sub(PHY, phy4, "4.3", "Resistance", "Ohm's law and interpreting I–V graphs.", 58),
      sub(PHY, phy4, "4.4", "Series & Parallel", "Rules for current, voltage, and resistance.", 72),
      sub(PHY, phy4, "4.5", "Mains Electricity", "Live, neutral, earth; fuses and circuit breakers.", 49),
      sub(PHY, phy4, "4.6", "Electromagnetism", "Motor effect, generators, and transformers.", 66),
      sub(PHY, phy4, "4.7", "Static Electricity", "Charging, earthing, and uses of static.", 41),
    ],
  },
];

function buildCompactSubject(
  subject: SyllabusSubjectCode,
  subjectCode: SubjectCode,
  topics: { index: number; title: string; items: [string, string, string, number][] }[],
): SyllabusMainTopic[] {
  return topics.map((t) => {
    const mainId = `${subject.toLowerCase()}-t${t.index}`;
    const subtopics = t.items.map(([code, name, description, mastery]) =>
      sub(subjectCode, mainId, code, name, description, mastery),
    );
    const avg = Math.round(
      subtopics.reduce((s, x) => s + x.masteryPercent, 0) / subtopics.length,
    );
    return {
      id: mainId,
      index: t.index,
      title: t.title,
      subject,
      masteryPercent: avg,
      subtopics,
    };
  });
}

const biologyMainTopics = buildCompactSubject("BIOLOGY", "BIOLOGY", [
  {
    index: 1,
    title: "Cell Biology",
    items: [
      ["4.1.1", "Cell Structure", "Eukaryotic and prokaryotic cells; microscopy.", 76],
      ["4.1.2", "Cell Division", "Mitosis and the cell cycle.", 58],
      ["4.1.3", "Transport in Cells", "Diffusion, osmosis, and active transport.", 64],
    ],
  },
  {
    index: 2,
    title: "Organisation",
    items: [
      ["4.2.1", "Digestive System", "Enzymes and absorption in the gut.", 52],
      ["4.2.2", "Circulatory System", "Heart, blood vessels, and blood.", 61],
    ],
  },
]);

const chemistryMainTopics = buildCompactSubject("CHEMISTRY", "CHEMISTRY", [
  {
    index: 1,
    title: "Atomic Structure",
    items: [
      ["1.1", "Atoms & Elements", "Protons, neutrons, electrons; periodic table.", 71],
      ["1.2", "Bonding", "Ionic, covalent, and metallic bonding.", 48],
    ],
  },
  {
    index: 2,
    title: "Quantitative Chemistry",
    items: [
      ["2.1", "Moles & Equations", "Balanced equations and amount of substance.", 55],
      ["2.2", "Acids & Alkalis", "pH, neutralisation, and titrations.", 67],
    ],
  },
]);

const mathsMainTopics = buildCompactSubject("MATHS", "MATHS", [
  {
    index: 1,
    title: "Number & Algebra",
    items: [
      ["2.1", "Percentages & Ratio", "Multi-step ratio and percentage problems.", 82],
      ["2.2", "Algebraic Manipulation", "Expanding, factorising, and solving.", 74],
    ],
  },
  {
    index: 2,
    title: "Geometry & Measures",
    items: [
      ["3.1", "Angles & Constructions", "Circle theorems and loci.", 59],
      ["3.2", "Trigonometry", "SOHCAHTOA and exact values.", 68],
    ],
  },
]);

const csMainTopics = buildCompactSubject("COMPUTER_SCIENCE", "COMPUTER_SCIENCE", [
  {
    index: 1,
    title: "Computer Systems",
    items: [
      ["1.1", "CPU & Fetch-Execute", "Registers, clock speed, and cores.", 70],
      ["1.2", "Memory & Storage", "RAM, ROM, SSD, and cloud storage.", 63],
    ],
  },
  {
    index: 2,
    title: "Algorithms & Programming",
    items: [
      ["2.1", "Algorithms", "Searching, sorting, and flowcharts.", 78],
      ["2.2", "Programming Constructs", "Selection, iteration, and functions.", 65],
    ],
  },
]);

const englishMainTopics = buildCompactSubject("ENGLISH", "ENGLISH_LANGUAGE", [
  {
    index: 1,
    title: "Reading Skills",
    items: [
      ["1.1", "Language Analysis", "Writer's methods and effects on the reader.", 60],
      ["1.2", "Structure Analysis", "Openings, endings, and shifts in focus.", 54],
    ],
  },
  {
    index: 2,
    title: "Writing Skills",
    items: [
      ["2.1", "Creative Writing", "Narrative structure and ambitious vocabulary.", 72],
      ["2.2", "Transactional Writing", "Letters, articles, and speeches.", 58],
    ],
  },
]);

const geographyMainTopics = buildCompactSubject("GEOGRAPHY", "GEOGRAPHY", [
  {
    index: 1,
    title: "Physical Geography",
    items: [
      ["1.1", "Tectonic Hazards", "Earthquakes, volcanoes, and risk management.", 66],
      ["1.2", "Weather Hazards", "Tropical storms and climate change.", 51],
    ],
  },
  {
    index: 2,
    title: "Human Geography",
    items: [
      ["2.1", "Urban Issues", "UK cities and megacities in LICs.", 58],
      ["2.2", "Resource Management", "Water, food, and energy security.", 62],
    ],
  },
]);

export const GCSE_SYLLABUS_BY_SUBJECT: Record<SyllabusSubjectCode, SyllabusMainTopic[]> = {
  PHYSICS: physicsMainTopics,
  BIOLOGY: biologyMainTopics,
  CHEMISTRY: chemistryMainTopics,
  MATHS: mathsMainTopics,
  COMPUTER_SCIENCE: csMainTopics,
  ENGLISH: englishMainTopics,
  GEOGRAPHY: geographyMainTopics,
};

export const ALL_SYLLABUS_SUBTOPICS: SyllabusSubtopic[] = Object.values(
  GCSE_SYLLABUS_BY_SUBJECT,
).flatMap((topics) => topics.flatMap((t) => t.subtopics));

export const SUBTOPICS_BY_ID = new Map(
  ALL_SYLLABUS_SUBTOPICS.map((st) => [st.id, st]),
);

export const DEFAULT_CURRENT_SUBTOPIC_ID = "PHYSICS-1.5";

/** One pinned subtopic per GCSE subject (e.g. Physics 2.4, Chemistry 1.1). */
export const DEFAULT_CURRENT_BY_SUBJECT: Record<SyllabusSubjectCode, string> = {
  PHYSICS: "PHYSICS-1.5",
  BIOLOGY: "BIOLOGY-4.1.1",
  CHEMISTRY: "CHEMISTRY-1.1",
  MATHS: "MATHS-2.1",
  COMPUTER_SCIENCE: "COMPUTER_SCIENCE-2.1",
  ENGLISH: "ENGLISH_LANGUAGE-1.1",
  GEOGRAPHY: "GEOGRAPHY-1.1",
};

export function syllabusSubjectForSubtopic(
  subtopic: SyllabusSubtopic,
): SyllabusSubjectCode | undefined {
  return SYLLABUS_SUBJECTS.find((s) => s.mapsTo === subtopic.subject)?.code;
}

export function getSubtopicById(id: string): SyllabusSubtopic | undefined {
  return SUBTOPICS_BY_ID.get(id);
}

export function getMainTopicForSubtopic(
  subtopicId: string,
): SyllabusMainTopic | undefined {
  const st = getSubtopicById(subtopicId);
  if (!st) return undefined;
  const subjects = GCSE_SYLLABUS_BY_SUBJECT;
  for (const topics of Object.values(subjects)) {
    const main = topics.find((t) => t.id === st.mainTopicId);
    if (main) return main;
  }
  return undefined;
}