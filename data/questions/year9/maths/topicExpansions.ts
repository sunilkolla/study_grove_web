import type { PracticeQuestion, QuestionDifficulty } from "@/types";
import { baseYear9Question, topicCode } from "../helpers";

const GEO = "Geometrical Reasoning";
const SIM = "Simultaneous Equations";
const STAT = "Statistics";
const PROP = "Proportional Reasoning";

const GEO_DIAGRAM_KEYS = [
  "geo.parallel",
  "geo.pentagon",
  "geo.pythag_6810",
  "geo.pythag_51213",
  "geo.rect_diag",
  "geo.isosceles",
  "geo.hexagon",
] as const;

const STAT_DIAGRAM_KEYS = [
  "stat.dot_plot",
  "stat.box_iqr",
  "stat.cf_median",
  "stat.bar_compare",
  "stat.histogram",
  "stat.stem",
  "stat.scatter",
  "stat.pie",
] as const;

type QDef = {
  id: string;
  subtopic: string;
  topicName: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  examTip?: string;
  difficulty: QuestionDifficulty;
  diagramKey?: string;
};

function mk({
  id,
  subtopic,
  topicName,
  questionText,
  options,
  correctAnswerIndex,
  explanation,
  examTip,
  difficulty,
  diagramKey,
}: QDef): PracticeQuestion {
  const xp =
    difficulty === "Higher" ? 30 : difficulty === "Intermediate" ? 25 : 20;
  return baseYear9Question({
    id,
    subject: "MATHS",
    subjectName: "Mathematics",
    topicCode: topicCode("MAT", subtopic),
    topicName,
    questionText,
    options,
    correctAnswerIndex,
    explanation,
    examTip,
    difficulty,
    xpReward: xp,
    diagramKey,
  });
}

export function stampDiagramKey(
  question: PracticeQuestion,
  diagramKey: string,
): PracticeQuestion {
  return { ...question, diagramKey };
}

export const GEO_CORE_DIAGRAM_KEYS = [
  "geo.parallel",
  "geo.parallel",
  "geo.parallel",
  "geo.hexagon",
  "geo.pentagon",
  "geo.hexagon",
  "geo.pythag_6810",
  "geo.pythag_51213",
  "geo.pythag_51213",
  "geo.pythag_6810",
  "geo.rect_diag",
  "geo.isosceles",
  "geo.pythag_6810",
] as const;

export const STAT_CORE_DIAGRAM_KEYS = [
  "stat.dot_plot",
  "stat.dot_plot",
  "stat.dot_plot",
  "stat.box_iqr",
  "stat.box_iqr",
  "stat.box_iqr",
  "stat.cf_median",
  "stat.cf_median",
  "stat.cf_median",
  "stat.box_iqr",
  "stat.histogram",
  "stat.bar_compare",
  "stat.bar_compare",
  "stat.bar_compare",
  "stat.scatter",
] as const;

export function buildGeometricalExpansion(): PracticeQuestion[] {
  const out: PracticeQuestion[] = [];
  let n = 14;

  const coInterior = [62, 74, 88, 102, 118, 128];
  for (const given of coInterior) {
    const other = 180 - given;
    out.push(
      mk({
        id: `q-y9-mat-geo-${n++}`,
        subtopic: "1.1",
        topicName: GEO,
        questionText: `Use the diagram. Parallel lines cut by a transversal. One co-interior angle is ${given}°. Find the other.`,
        options: [`${other}°`, `${given}°`, `${90}°`, `${360 - given}°`],
        correctAnswerIndex: 0,
        explanation: `Co-interior angles sum to 180°: 180 − ${given} = ${other}°.`,
        examTip: "Co-interior angles are supplementary.",
        difficulty: "Foundation",
        diagramKey: "geo.parallel",
      }),
    );
  }

  const alternate = [39, 52, 61, 77];
  for (const a of alternate) {
    out.push(
      mk({
        id: `q-y9-mat-geo-${n++}`,
        subtopic: "1.1",
        topicName: GEO,
        questionText: `Use the diagram. Alternate angles are equal. One angle is ${a}°. Find angle x.`,
        options: [`${a}°`, `${180 - a}°`, `${90}°`, `${a + 90}°`],
        correctAnswerIndex: 0,
        explanation: `Alternate angles are equal when lines are parallel: x = ${a}°.`,
        difficulty: "Foundation",
        diagramKey: GEO_DIAGRAM_KEYS[n % GEO_DIAGRAM_KEYS.length],
      }),
    );
  }

  const polygonSides = [7, 8, 9, 10, 12];
  for (const sides of polygonSides) {
    const sum = (sides - 2) * 180;
    out.push(
      mk({
        id: `q-y9-mat-geo-${n++}`,
        subtopic: "1.2",
        topicName: GEO,
        questionText: `Use the diagram. Find the sum of interior angles in a ${sides}-sided polygon.`,
        options: [`${sum}°`, `${sides * 180}°`, `${360}°`, `${sum - 180}°`],
        correctAnswerIndex: 0,
        explanation: `Interior sum = (n − 2) × 180° = ${sum}°.`,
        difficulty: "Intermediate",
        diagramKey: sides === 5 ? "geo.pentagon" : "geo.hexagon",
      }),
    );
  }

  const extAngles = [30, 36, 45, 72];
  for (const ext of extAngles) {
    const sides = 360 / ext;
    out.push(
      mk({
        id: `q-y9-mat-geo-${n++}`,
        subtopic: "1.2",
        topicName: GEO,
        questionText: `Each exterior angle of a regular polygon is ${ext}°. How many sides?`,
        options: [`${sides}`, `${sides + 1}`, `${sides - 1}`, `${360 / ext + 2}`],
        correctAnswerIndex: 0,
        explanation: `n = 360° ÷ ${ext}° = ${sides}.`,
        difficulty: "Intermediate",
        diagramKey: "geo.pentagon",
      }),
    );
  }

  const pythagTriples: [number, number, number][] = [
    [9, 12, 15],
    [8, 15, 17],
    [7, 24, 25],
    [20, 21, 29],
    [5, 12, 13],
    [9, 40, 41],
    [12, 16, 20],
    [10, 24, 26],
    [15, 20, 25],
    [6, 8, 10],
    [14, 48, 50],
    [11, 60, 61],
    [13, 84, 85],
    [8, 6, 10],
  ];
  let pIndex = 0;
  for (const [a, b, c] of pythagTriples) {
    if (out.length >= 37) break;
    const subtopic = pIndex < 7 ? "1.3" : "1.4";
    out.push(
      mk({
        id: `q-y9-mat-geo-${n++}`,
        subtopic,
        topicName: GEO,
        questionText: `Use the diagram. A right-angled triangle has legs ${a} cm and ${b} cm. Find the hypotenuse.`,
        options: [`${c} cm`, `${a + b} cm`, `${c + 2} cm`, `${Math.round(Math.sqrt(a * a + b * b + 5))} cm`],
        correctAnswerIndex: 0,
        explanation: `${a}² + ${b}² = ${a * a + b * b} = ${c}², so hypotenuse = ${c} cm.`,
        difficulty: pIndex > 10 ? "Higher" : "Intermediate",
        diagramKey:
          a === 6 && b === 8
            ? "geo.pythag_6810"
            : a === 5 && b === 12
              ? "geo.pythag_51213"
              : "geo.pythag_51213",
      }),
    );
    pIndex++;
  }

  while (out.length < 37) {
    out.push(
      mk({
        id: `q-y9-mat-geo-${n++}`,
        subtopic: "1.4",
        topicName: GEO,
        questionText:
          "Use the diagram. A rectangular field is 30 m by 16 m. Find the length of the diagonal.",
        options: ["34 m", "46 m", "30 m", "√1144 m"],
        correctAnswerIndex: 0,
        explanation: "d² = 30² + 16² = 1156, d = 34 m.",
        difficulty: "Intermediate",
        diagramKey: "geo.rect_diag",
      }),
    );
  }

  return out.slice(0, 37);
}

export function buildSimultaneousExpansion(): PracticeQuestion[] {
  const out: PracticeQuestion[] = [];
  let n = 26;

  const pairs: [number, number, number, number, number, number][] = [
    [2, 3, 12, 3, 1, 11],
    [1, 1, 8, 2, -1, 2],
    [4, 1, 14, 2, 3, 16],
    [3, 2, 16, 1, 4, 14],
    [5, 2, 19, 3, 1, 11],
    [2, 5, 20, 4, 3, 18],
    [1, 3, 10, 2, 1, 8],
    [3, 4, 25, 2, 2, 14],
  ];

  for (const [a1, b1, c1, a2, b2, c2] of pairs) {
    // x = ((c1*b2 - c2*b1) / (a1*b2 - a2*b1)) — simplified numeric sets with integer solutions
    const text = `Solve: ${a1}x + ${b1}y = ${c1} and ${a2}x + ${b2}y = ${c2}. What is x?`;
    const det = a1 * b2 - a2 * b1;
    const x = Math.round((c1 * b2 - c2 * b1) / det);
    const wrong = [x + 1, x - 1, x + 2, x - 2].filter((v) => v !== x);
    out.push(
      mk({
        id: `q-y9-mat-sim-${n++}`,
        subtopic: n % 4 === 0 ? "2.4" : n % 3 === 0 ? "2.3" : n % 2 === 0 ? "2.2" : "2.1",
        topicName: SIM,
        questionText: text,
        options: [`${x}`, `${wrong[0]}`, `${wrong[1]}`, `${wrong[2] ?? 0}`],
        correctAnswerIndex: 0,
        explanation: `Solving the pair gives x = ${x}.`,
        examTip: "Eliminate y or x when coefficients match.",
        difficulty: "Intermediate",
      }),
    );
  }

  const graphLines = [
    { m1: 2, c1: 1, m2: -1, c2: 7, x: 2, y: 5 },
    { m1: 1, c1: 3, m2: -2, c2: 9, x: 2, y: 5 },
    { m1: 3, c1: -2, m2: 1, c2: 5, x: 7 / 2, y: 8.5 },
    { m1: 2, c1: 4, m2: 2, c2: 10, x: NaN, y: NaN },
  ];

  for (const g of graphLines) {
    if (out.length >= 38) break;
    if (Number.isNaN(g.x)) {
      out.push(
        mk({
          id: `q-y9-mat-sim-${n++}`,
          subtopic: "2.4",
          topicName: SIM,
          questionText: `Do y = ${g.m1}x + ${g.c1} and y = ${g.m2}x + ${g.c2} intersect once?`,
          options: ["No — parallel", "Yes — at x = 0", "Yes — infinitely often", "Yes — at x = 2"],
          correctAnswerIndex: 0,
          explanation: "Equal gradients ⇒ parallel distinct lines ⇒ no solution.",
          difficulty: "Foundation",
        }),
      );
      continue;
    }
    const xStr = Number.isInteger(g.x) ? `${g.x}` : "3.5";
    out.push(
      mk({
        id: `q-y9-mat-sim-${n++}`,
        subtopic: "2.4",
        topicName: SIM,
        questionText: `Lines y = ${g.m1}x + ${g.c1} and y = ${g.m2}x + ${g.c2} meet. Find x.`,
        options: [xStr, `${g.x + 1}`, `${g.x - 1}`, "0"],
        correctAnswerIndex: 0,
        explanation: `Equate gradients' intercepts to find x ≈ ${xStr}.`,
        difficulty: "Intermediate",
      }),
    );
  }

  const wordProblems = [
    { apples: 2, bananas: 3, cost1: 2.1, apples2: 4, bananas2: 1, cost2: 2.8, ask: "apple" as const, ans: 0.5 },
    { apples: 3, bananas: 1, cost1: 2.0, apples2: 1, bananas2: 3, cost2: 2.0, ask: "apple" as const, ans: 0.5 },
  ];

  for (const w of wordProblems) {
    if (out.length >= 38) break;
    out.push(
      mk({
        id: `q-y9-mat-sim-${n++}`,
        subtopic: "2.3",
        topicName: SIM,
        questionText: `${w.apples} apples + ${w.bananas} bananas cost £${w.cost1.toFixed(2)}. ${w.apples2} apples + ${w.bananas2} bananas cost £${w.cost2.toFixed(2)}. One apple costs how much?`,
        options: [`${w.ans * 100}p`, "40p", "60p", "70p"],
        correctAnswerIndex: 0,
        explanation: "Form two equations and eliminate.",
        difficulty: "Higher",
      }),
    );
  }

  while (out.length < 38) {
    const x = 2 + (out.length % 5);
    out.push(
      mk({
        id: `q-y9-mat-sim-${n++}`,
        subtopic: "2.1",
        topicName: SIM,
        questionText: `x + y = ${x + 4} and x − y = ${x - 4}. Find x.`,
        options: [`${x}`, `${x + 1}`, `${x - 1}`, `${x + 2}`],
        correctAnswerIndex: 0,
        explanation: `Add equations: 2x = ${2 * x}, so x = ${x}.`,
        difficulty: "Foundation",
      }),
    );
  }

  return out.slice(0, 38);
}

export function buildStatisticsExpansion(): PracticeQuestion[] {
  const out: PracticeQuestion[] = [];
  let n = 16;

  const dataSets = [
    { data: [4, 7, 7, 8, 12], median: 7 },
    { data: [2, 5, 9, 11, 14], median: 9 },
    { data: [1, 3, 3, 6, 8, 10], median: 4.5 },
    { data: [6, 6, 7, 8, 9], median: 7 },
    { data: [12, 15, 15, 18, 20], median: 15 },
  ];

  for (const set of dataSets) {
    out.push(
      mk({
        id: `q-y9-mat-stat-${n++}`,
        subtopic: "3.1",
        topicName: STAT,
        questionText: `Use the diagram. Find the median of: ${set.data.join(", ")}.`,
        options: [`${set.median}`, `${set.data[0]}`, `${set.data[set.data.length - 1]}`, `${set.median + 1}`],
        correctAnswerIndex: 0,
        explanation: `Ordered data gives median ${set.median}.`,
        difficulty: "Foundation",
        diagramKey: STAT_DIAGRAM_KEYS[out.length % STAT_DIAGRAM_KEYS.length],
      }),
    );
  }

  const means = [
    { nums: [5, 7, 8, 10], mean: 7.5 },
    { nums: [12, 14, 16, 18], mean: 15 },
    { nums: [3, 6, 9, 12], mean: 7.5 },
    { nums: [10, 20, 30, 40], mean: 25 },
  ];
  for (const m of means) {
    out.push(
      mk({
        id: `q-y9-mat-stat-${n++}`,
        subtopic: "3.1",
        topicName: STAT,
        questionText: `Use the diagram. Calculate the mean of ${m.nums.join(", ")}.`,
        options: [`${m.mean}`, `${m.mean + 2}`, `${m.mean - 2}`, `${m.nums[0]}`],
        correctAnswerIndex: 0,
        explanation: `Sum ÷ count = ${m.mean}.`,
        difficulty: "Foundation",
        diagramKey: "stat.histogram",
      }),
    );
  }

  const iqrCases = [
    { q1: 12, q3: 24, iqr: 12 },
    { q1: 8, q3: 18, iqr: 10 },
    { q1: 15, q3: 28, iqr: 13 },
    { q1: 20, q3: 35, iqr: 15 },
    { q1: 6, q3: 14, iqr: 8 },
  ];
  for (const c of iqrCases) {
    out.push(
      mk({
        id: `q-y9-mat-stat-${n++}`,
        subtopic: "3.2",
        topicName: STAT,
        questionText: `Use the diagram. Q1 = ${c.q1} and Q3 = ${c.q3}. Find the IQR.`,
        options: [`${c.iqr}`, `${c.q3}`, `${c.q1 + c.q3}`, `${c.iqr + 2}`],
        correctAnswerIndex: 0,
        explanation: `IQR = ${c.q3} − ${c.q1} = ${c.iqr}.`,
        difficulty: "Intermediate",
        diagramKey: "stat.box_iqr",
      }),
    );
  }

  const cfReads = [
    { n: 60, medianPos: 30 },
    { n: 80, medianPos: 40 },
    { n: 100, medianPos: 50 },
    { n: 120, medianPos: 60 },
  ];
  for (const c of cfReads) {
    out.push(
      mk({
        id: `q-y9-mat-stat-${n++}`,
        subtopic: "3.3",
        topicName: STAT,
        questionText: `Use the diagram. ${c.n} pupils — on a cumulative frequency curve, read the median position on the CF axis.`,
        options: [`${c.medianPos}`, `${c.n}`, `${c.n / 4}`, `${c.n - 10}`],
        correctAnswerIndex: 0,
        explanation: `Median at n/2 = ${c.medianPos}.`,
        difficulty: "Foundation",
        diagramKey: "stat.cf_median",
      }),
    );
  }

  const groupedMeans = [
    { mid: [5, 15, 25], freq: [4, 10, 6], mean: 15 },
    { mid: [10, 20, 30], freq: [5, 8, 7], mean: 19 },
    { mid: [2, 7, 12], freq: [6, 9, 5], mean: 7.25 },
  ];
  for (const g of groupedMeans) {
    const sumFx =
      g.mid[0] * g.freq[0] + g.mid[1] * g.freq[1] + g.mid[2] * g.freq[2];
    const total = g.freq[0] + g.freq[1] + g.freq[2];
    const mean = sumFx / total;
    out.push(
      mk({
        id: `q-y9-mat-stat-${n++}`,
        subtopic: "3.5",
        topicName: STAT,
        questionText: `Use the diagram. Grouped data midpoints ${g.mid.join(", ")} with frequencies ${g.freq.join(", ")}. Estimate the mean.`,
        options: [
          `${mean}`,
          `${mean + 2}`,
          `${g.mid[1]}`,
          `${mean - 2}`,
        ],
        correctAnswerIndex: 0,
        explanation: `Σfx/Σf ≈ ${mean}.`,
        difficulty: "Intermediate",
        diagramKey: "stat.histogram",
      }),
    );
  }

  const compares = [
    "Group A has a higher mean but larger IQR than Group B",
    "Both groups share the same median; Group X has greater spread",
    "Group B is more consistent with a smaller IQR",
    "The two box plots show similar medians but different whiskers",
  ];
  for (const text of compares) {
    if (out.length >= 35) break;
    out.push(
      mk({
        id: `q-y9-mat-stat-${n++}`,
        subtopic: "3.6",
        topicName: STAT,
        questionText: `Use the diagram. Which statement best compares the two distributions?`,
        options: [text, "Both have identical ranges", "Means must be equal", "IQR is always zero"],
        correctAnswerIndex: 0,
        explanation: "Compare centre and spread using mean/median and IQR.",
        difficulty: "Intermediate",
        diagramKey: "stat.bar_compare",
      }),
    );
  }

  while (out.length < 35) {
    out.push(
      mk({
        id: `q-y9-mat-stat-${n++}`,
        subtopic: "3.4",
        topicName: STAT,
        questionText: "Use the diagram. On the box plot, the median is inside the box. True or false?",
        options: ["True", "False", "Only if skewed", "Never"],
        correctAnswerIndex: 0,
        explanation: "The median line always lies within the box.",
        difficulty: "Foundation",
        diagramKey: "stat.box_iqr",
      }),
    );
  }

  return out.slice(0, 35);
}

export function buildProportionalExpansion(): PracticeQuestion[] {
  const out: PracticeQuestion[] = [];
  let n = 11;

  for (let p = 10; p <= 28; p += 2) {
    const amount = Math.round(100 * (1 + p / 100));
    out.push(
      mk({
        id: `q-y9-mat-prop-${n++}`,
        subtopic: "4.2",
        topicName: PROP,
        questionText: `Increase £100 by ${p}%. What is the new amount?`,
        options: [`£${amount}`, `£${100 + p}`, `£${amount + 5}`, `£${amount - 10}`],
        correctAnswerIndex: 0,
        explanation: `Multiplier 1.${p < 10 ? `0${p}` : p}: £${amount}.`,
        difficulty: "Foundation",
      }),
    );
  }

  for (const orig of [40, 50, 80, 120, 200]) {
    const dec = [10, 15, 20, 25][out.length % 4];
    const neu = Math.round(orig * (1 - dec / 100));
    out.push(
      mk({
        id: `q-y9-mat-prop-${n++}`,
        subtopic: "4.2",
        topicName: PROP,
        questionText: `Decrease £${orig} by ${dec}%. New price?`,
        options: [`£${neu}`, `£${orig - dec}`, `£${neu + 5}`, `£${orig}`],
        correctAnswerIndex: 0,
        explanation: `${dec}% of ${orig} off → £${neu}.`,
        difficulty: "Intermediate",
      }),
    );
  }

  const reverse = [
    { after: 84, pct: 20, orig: 70 },
    { after: 90, pct: 10, orig: 100 },
    { after: 65, pct: 35, orig: 100 },
    { after: 176, pct: 12, orig: 200 },
  ];
  for (const r of reverse) {
    out.push(
      mk({
        id: `q-y9-mat-prop-${n++}`,
        subtopic: "4.3",
        topicName: PROP,
        questionText: `After a ${r.pct}% increase, price is £${r.after}. Original price?`,
        options: [`£${r.orig}`, `£${r.after - r.pct}`, `£${r.orig + 10}`, `£${r.after / 2}`],
        correctAnswerIndex: 0,
        explanation: `Divide by ${1 + r.pct / 100} → £${r.orig}.`,
        difficulty: "Intermediate",
      }),
    );
  }

  const ratios = [
    { total: 120, a: 2, b: 3, larger: 72 },
    { total: 90, a: 1, b: 2, larger: 60 },
    { total: 200, a: 3, b: 5, larger: 125 },
    { total: 70, a: 4, b: 3, larger: 40 },
  ];
  for (const r of ratios) {
    out.push(
      mk({
        id: `q-y9-mat-prop-${n++}`,
        subtopic: "4.4",
        topicName: PROP,
        questionText: `Share £${r.total} in ratio ${r.a}:${r.b}. Larger share?`,
        options: [`£${r.larger}`, `£${r.total / 2}`, `£${r.larger - 5}`, `£${r.total - r.larger}`],
        correctAnswerIndex: 0,
        explanation: `${r.a + r.b} parts: larger = £${r.larger}.`,
        difficulty: "Foundation",
      }),
    );
  }

  const sfNums = [
    { base: 3.2, exp: 4, coef: 6.4, exp2: 7 },
    { base: 5, exp: 3, coef: 2.5, exp2: 5 },
    { base: 7.1, exp: 2, coef: 4.2, exp2: 6 },
  ];
  for (const s of sfNums) {
    const expSum = s.exp + s.exp2;
    const coefProd = s.coef * s.base;
    out.push(
      mk({
        id: `q-y9-mat-prop-${n++}`,
        subtopic: "4.5",
        topicName: PROP,
        questionText: `(${s.base} × 10^${s.exp}) × (${s.coef / s.base} × 10^${s.exp2}) in standard form — coefficient × 10^n?`,
        options: [
          `${coefProd} × 10^${expSum}`,
          `${coefProd / 10} × 10^${expSum + 1}`,
          `${s.base} × 10^${expSum}`,
          `${coefProd} × 10^${s.exp}`,
        ],
        correctAnswerIndex: 0,
        explanation: `Multiply coefficients and add powers: ${coefProd} × 10^${expSum}.`,
        difficulty: "Higher",
      }),
    );
  }

  const fracSimplify: { num: string; den: string; ans: string; wrong: string[] }[] = [
    { num: "4x", den: "8", ans: "x/2", wrong: ["2x", "x/4", "4/x"] },
    { num: "10x", den: "15", ans: "2x/3", wrong: ["5x", "x/5", "3x/2"] },
    { num: "6x²", den: "9x", ans: "2x/3", wrong: ["x²/3", "3x", "2x"] },
    { num: "x²−9", den: "x+3", ans: "x−3", wrong: ["x+3", "x²−3", "x−9"] },
    { num: "8x", den: "12", ans: "2x/3", wrong: ["4x/6", "x/2", "8/12x"] },
  ];
  for (const f of fracSimplify) {
    if (out.length >= 40) break;
    out.push(
      mk({
        id: `q-y9-mat-prop-${n++}`,
        subtopic: "4.1",
        topicName: PROP,
        questionText: `Simplify: (${f.num})/(${f.den})`,
        options: [f.ans, ...f.wrong],
        correctAnswerIndex: 0,
        explanation: `Cancel common factors to get ${f.ans}.`,
        difficulty: "Foundation",
      }),
    );
  }

  while (out.length < 40) {
    out.push(
      mk({
        id: `q-y9-mat-prop-${n++}`,
        subtopic: "4.4",
        topicName: PROP,
        questionText: "3 books cost the same as 5 pens. How many pens for 12 books?",
        options: ["20", "15", "18", "24"],
        correctAnswerIndex: 0,
        explanation: "Scale up: 12 books = 4 × 3 books = 4 × 5 pens = 20 pens.",
        difficulty: "Intermediate",
      }),
    );
  }

  return out.slice(0, 40);
}