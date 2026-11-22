import {
  DEFAULT_HOMEWORK_BAR_CHART,
  ExamBarChartFigure,
  ExamGraphPaper,
} from "./examChart/ExamChartPrimitives";

/** Year 9 maths quiz diagrams — keyed by `diagramKey` on PracticeQuestion. */

const FIGURE =
  "mx-auto max-w-2xl rounded-lg border border-slate-300 bg-white p-4 shadow-sm dark:border-slate-600 dark:bg-slate-900";
const INK = "#18181b";

export function MathsDiagramByKey({ diagramKey }: { diagramKey: string }) {
  switch (diagramKey) {
    case "geo.parallel":
      return <ParallelLinesDiagram />;
    case "geo.pentagon":
      return <RegularPentagonDiagram />;
    case "geo.hexagon":
      return <RegularHexagonDiagram />;
    case "geo.pythag_6810":
      return <PythagorasTriangleDiagram variant="6-8-10" />;
    case "geo.pythag_51213":
      return <PythagorasTriangleDiagram variant="5-12-13" />;
    case "geo.rect_diag":
      return <RectangleDiagonalDiagram />;
    case "geo.isosceles":
      return <IsoscelesHeightDiagram />;
    case "stat.dot_plot":
      return <DotPlotDiagram />;
    case "stat.box_iqr":
      return <BoxPlotDiagram iqr />;
    case "stat.cf_median":
      return <CumulativeFrequencyDiagram median />;
    case "stat.cf_read":
      return <CumulativeFrequencyDiagram readAt55 />;
    case "stat.bar_compare":
      return <ExamBarChartFigure {...DEFAULT_HOMEWORK_BAR_CHART} />;
    case "stat.histogram":
      return <SimpleHistogram />;
    case "stat.stem":
      return <StemLeafDiagram />;
    case "stat.scatter":
      return <ScatterDiagram />;
    case "stat.pie":
      return <PieChartDiagram />;
    default:
      return null;
  }
}

function ParallelLinesDiagram() {
  return (
    <figure className={FIGURE} aria-label="Parallel lines and transversal">
      <svg viewBox="0 0 300 160" className="h-auto w-full" role="img">
        <title>Parallel lines L and M with transversal</title>
        <line x1="20" y1="50" x2="280" y2="35" stroke={INK} strokeWidth="1.5" />
        <line x1="20" y1="110" x2="280" y2="95" stroke={INK} strokeWidth="1.5" />
        <line x1="120" y1="10" x2="80" y2="150" stroke={INK} strokeWidth="1.5" />
        <text x="245" y="32" className="fill-zinc-800 text-[12px] font-bold dark:fill-zinc-200">
          L
        </text>
        <text x="245" y="92" className="fill-zinc-800 text-[12px] font-bold dark:fill-zinc-200">
          M
        </text>
        <text x="95" y="78" className="fill-zinc-900 text-[13px] font-semibold dark:fill-zinc-100">
          x
        </text>
        <text x="130" y="48" className="fill-zinc-900 text-[13px] font-semibold dark:fill-zinc-100">
          48°
        </text>
        <path
          d="M 125 45 A 22 22 0 0 1 138 62"
          fill="none"
          stroke={INK}
          strokeWidth="1.2"
        />
      </svg>
      <figcaption className="mt-2 text-center text-[10px] text-slate-600 dark:text-slate-300">
        L ∥ M — find angle x
      </figcaption>
    </figure>
  );
}

function RegularPentagonDiagram() {
  const pts = "150,40 240,75 210,155 90,155 60,75";
  return (
    <figure className={FIGURE} aria-label="Regular pentagon">
      <svg viewBox="0 0 300 180" className="h-auto w-full" role="img">
        <title>Regular pentagon</title>
        <polygon
          points={pts}
          fill="#f4f4f5"
          stroke={INK}
          strokeWidth="1.5"
          className="dark:fill-zinc-800"
        />
        <text x="138" y="105" className="fill-zinc-900 text-[12px] font-semibold dark:fill-zinc-100">
          ?
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-[10px] text-slate-600 dark:text-slate-300">
        Regular pentagon — interior angle at each vertex
      </figcaption>
    </figure>
  );
}

function RegularHexagonDiagram() {
  const pts = "150,35 230,70 230,150 150,185 70,150 70,70";
  return (
    <figure className={FIGURE} aria-label="Regular hexagon">
      <svg viewBox="0 0 300 200" className="h-auto w-full" role="img">
        <polygon points={pts} fill="#f4f4f5" stroke={INK} strokeWidth="1.5" className="dark:fill-zinc-800" />
        <text x="135" y="110" className="fill-zinc-900 text-[12px] font-semibold dark:fill-zinc-100">
          n = 6
        </text>
      </svg>
    </figure>
  );
}

function PythagorasTriangleDiagram({
  variant,
}: {
  variant: "5-12-13" | "6-8-10" | "9-12-15";
}) {
  const labels =
    variant === "5-12-13"
      ? { bottom: "5 cm", right: "12 cm", hyp: "13 cm" }
      : variant === "6-8-10"
        ? { bottom: "6 cm", right: "8 cm", hyp: "10 cm" }
        : { bottom: "9 cm", right: "12 cm", hyp: "15 cm" };
  return (
    <figure className={FIGURE} aria-label="Right-angled triangle">
      <svg viewBox="0 0 280 160" className="h-auto w-full" role="img">
        <title>Right-angled triangle</title>
        <path
          d="M 40 130 L 200 130 L 200 40 Z"
          fill="#fafafa"
          stroke={INK}
          strokeWidth="1.5"
          className="dark:fill-zinc-800"
        />
        <rect x="188" y="118" width="12" height="12" fill="none" stroke={INK} />
        <text x="108" y="148" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          {labels.bottom}
        </text>
        <text x="205" y="88" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          {labels.right}
        </text>
        <text x="55" y="75" className="fill-zinc-900 text-[11px] font-semibold dark:fill-zinc-100">
          {labels.hyp}
        </text>
      </svg>
    </figure>
  );
}

function RectangleDiagonalDiagram() {
  return (
    <figure className={FIGURE} aria-label="Rectangle 24 by 10">
      <svg viewBox="0 0 280 120" className="h-auto w-full" role="img">
        <rect x="50" y="25" width="180" height="75" fill="#f4f4f5" stroke={INK} strokeWidth="1.5" className="dark:fill-zinc-800" />
        <line x1="50" y1="100" x2="230" y2="25" stroke={INK} strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="115" y="115" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          24 cm
        </text>
        <text x="235" y="65" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          10 cm
        </text>
        <text x="130" y="55" className="fill-zinc-900 text-[11px] font-semibold dark:fill-zinc-100">
          d
        </text>
      </svg>
    </figure>
  );
}

function IsoscelesHeightDiagram() {
  return (
    <figure className={FIGURE} aria-label="Isosceles triangle base 10 sides 13">
      <svg viewBox="0 0 280 150" className="h-auto w-full" role="img">
        <path d="M 140 25 L 220 125 L 60 125 Z" fill="#fafafa" stroke={INK} strokeWidth="1.5" className="dark:fill-zinc-800" />
        <line x1="140" y1="25" x2="140" y2="125" stroke={INK} strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="118" y="135" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          10 cm
        </text>
        <text x="175" y="70" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          13 cm
        </text>
        <text x="145" y="78" className="fill-zinc-900 text-[11px] font-semibold dark:fill-zinc-100">
          h
        </text>
      </svg>
    </figure>
  );
}

function DotPlotDiagram() {
  return (
    <figure className={FIGURE} aria-label="Dot plot reaction times">
      <svg viewBox="0 0 300 100" className="h-auto w-full" role="img">
        <line x1="30" y1="75" x2="270" y2="75" stroke="#64748b" strokeWidth="2" />
        {[50, 100, 150, 200, 250].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="72" x2={x} y2="78" stroke="#64748b" />
            <text x={x - 8} y="92" className="fill-slate-600 text-[10px]">
              {i + 2}
            </text>
          </g>
        ))}
        <text x="8" y="92" className="fill-slate-600 text-[10px]">
          s
        </text>
        {[2, 3, 4, 5, 6].map((sec, i) => {
          const x = 30 + i * 50;
          const count = sec === 4 ? 4 : sec === 3 ? 2 : 1;
          return Array.from({ length: count }, (_, j) => (
            <circle key={`${sec}-${j}`} cx={x} cy={60 - j * 12} r="5" fill="#0ea5e9" />
          ));
        })}
      </svg>
    </figure>
  );
}

function BoxPlotDiagram({ iqr, range }: { iqr?: boolean; range?: boolean }) {
  return (
    <figure className={FIGURE} aria-label="Box plot">
      <svg viewBox="0 0 300 90" className="h-auto w-full" role="img">
        <line x1="20" y1="45" x2="280" y2="45" stroke="#94a3b8" strokeWidth="1" />
        <line x1="50" y1="30" x2="50" y2="60" stroke="#334155" strokeWidth="2" />
        <rect x="90" y="30" width="80" height="30" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
        <line x1="130" y1="30" x2="130" y2="60" stroke="#0c4a6e" strokeWidth="2" />
        <line x1="210" y1="30" x2="210" y2="60" stroke="#334155" strokeWidth="2" />
        <text x="45" y="78" className="fill-slate-600 text-[10px]">
          10
        </text>
        <text x="85" y="78" className="fill-slate-600 text-[10px]">
          Q1
        </text>
        <text x="125" y="78" className="fill-slate-600 text-[10px]">
          med
        </text>
        <text x="200" y="78" className="fill-slate-600 text-[10px]">
          Q3=22
        </text>
        <text x="205" y="78" className="fill-slate-600 text-[10px]">
          40
        </text>
        {iqr && (
          <>
            <line x1="90" y1="20" x2="170" y2="20" stroke="#10B981" strokeWidth="1.5" />
            <text x="115" y="16" className="fill-emerald-700 text-[9px] font-bold">
              IQR: 22−10
            </text>
          </>
        )}
      </svg>
      {range && (
        <figcaption className="mt-2 text-center text-[10px] text-slate-600">
          Min 10, max 40
        </figcaption>
      )}
    </figure>
  );
}

function CumulativeFrequencyDiagram({
  median,
  readAt55,
}: {
  median?: boolean;
  readAt55?: boolean;
}) {
  return (
    <figure className={FIGURE} aria-label="Cumulative frequency curve">
      <svg viewBox="0 0 300 160" className="h-auto w-full" role="img">
        <line x1="40" y1="130" x2="260" y2="130" stroke="#64748b" strokeWidth="2" />
        <line x1="40" y1="130" x2="40" y2="25" stroke="#64748b" strokeWidth="2" />
        <text x="250" y="145" className="fill-slate-600 text-[10px]">
          Score
        </text>
        <text x="12" y="30" className="fill-slate-600 text-[10px]">
          CF
        </text>
        <path
          d="M 40 125 C 80 120, 100 100, 120 85 S 180 55, 220 40 S 250 32, 260 30"
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
        {median && (
          <>
            <line x1="40" y1="75" x2="175" y2="75" stroke="#10B981" strokeDasharray="3 3" />
            <line x1="175" y1="75" x2="175" y2="130" stroke="#10B981" strokeDasharray="3 3" />
            <text x="165" y="148" className="fill-emerald-700 text-[10px] font-bold">
              ~50
            </text>
          </>
        )}
        {readAt55 && (
          <>
            <line x1="195" y1="130" x2="195" y2="55" stroke="#f59e0b" strokeDasharray="3 3" />
            <line x1="40" y1="55" x2="195" y2="55" stroke="#f59e0b" strokeDasharray="3 3" />
            <text x="185" y="148" className="fill-amber-700 text-[10px] font-bold">
              55
            </text>
          </>
        )}
        <text x="38" y="78" className="fill-slate-500 text-[9px]">
          50
        </text>
        <text x="38" y="58" className="fill-slate-500 text-[9px]">
          72
        </text>
      </svg>
    </figure>
  );
}

function SimpleHistogram() {
  const heights = [3, 5, 8, 6];
  const plotX = 40;
  const plotY = 20;
  const plotW = 200;
  const plotH = 90;
  return (
    <figure className={FIGURE} aria-label="Histogram">
      <svg viewBox="0 0 280 150" className="h-auto w-full" role="img">
        <ExamGraphPaper
          x={plotX}
          y={plotY}
          width={plotW}
          height={plotH}
          xUnits={10}
          yUnits={8}
        />
        <line x1={plotX} y1={plotY} x2={plotX} y2={plotY + plotH} stroke={INK} strokeWidth="1.2" />
        <line
          x1={plotX}
          y1={plotY + plotH}
          x2={plotX + plotW}
          y2={plotY + plotH}
          stroke={INK}
          strokeWidth="1.2"
        />
        {heights.map((h, i) => (
          <rect
            key={i}
            x={plotX + 20 + i * 45}
            y={plotY + plotH - h * 10}
            width={32}
            height={h * 10}
            fill="#e4e4e7"
            stroke={INK}
            strokeWidth="1"
            className="dark:fill-zinc-700"
          />
        ))}
      </svg>
    </figure>
  );
}

function StemLeafDiagram() {
  return (
    <figure className={FIGURE} aria-label="Stem-and-leaf">
      <svg viewBox="0 0 200 100" className="h-auto w-full" role="img">
        <text x="20" y="35" className="fill-slate-700 text-[11px] font-mono">
          2 | 3 5 8
        </text>
        <text x="20" y="55" className="fill-slate-700 text-[11px] font-mono">
          3 | 1 4 7
        </text>
        <text x="20" y="75" className="fill-slate-700 text-[11px] font-mono">
          4 | 0 2 6
        </text>
      </svg>
    </figure>
  );
}

function ScatterDiagram() {
  return (
    <figure className={FIGURE} aria-label="Scatter graph">
      <svg viewBox="0 0 220 120" className="h-auto w-full" role="img">
        <line x1="25" y1="100" x2="200" y2="100" stroke="#64748b" />
        <line x1="25" y1="100" x2="25" y2="20" stroke="#64748b" />
        {[
          [50, 80],
          [70, 70],
          [90, 55],
          [120, 45],
          [150, 35],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#2563eb" />
        ))}
      </svg>
    </figure>
  );
}

function PieChartDiagram() {
  return (
    <figure className={FIGURE} aria-label="Pie chart">
      <svg viewBox="0 0 120 120" className="mx-auto h-auto w-32" role="img">
        <circle cx="60" cy="60" r="48" fill="#e2e8f0" />
        <path d="M60 60 L60 12 A48 48 0 0 1 100 75 Z" fill="#34d399" />
        <path d="M60 60 L100 75 A48 48 0 0 1 30 95 Z" fill="#60a5fa" />
        <path d="M60 60 L30 95 A48 48 0 1 1 60 12 Z" fill="#fbbf24" />
      </svg>
    </figure>
  );
}