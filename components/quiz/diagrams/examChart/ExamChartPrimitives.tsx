import type { ReactNode } from "react";
import type {
  PracticeQuestionBarChartParams,
  PracticeQuestionBoxPlotParams,
  PracticeQuestionCumulativeFrequencyParams,
} from "@/types";

const GRID = "#d4d4d8";
const GRID_MAJOR = "#a1a1aa";
const INK = "#18181b";
const BAR_FILL = "#e4e4e7";
const CHART = "#52525b";

type GraphPaperProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  xUnits: number;
  yUnits: number;
  majorEvery?: number;
};

export function ExamGraphPaper({
  x,
  y,
  width,
  height,
  xUnits,
  yUnits,
  majorEvery = 2,
}: GraphPaperProps) {
  const lines: ReactNode[] = [];
  for (let i = 0; i <= xUnits; i++) {
    const lx = x + (i / xUnits) * width;
    const major = i % majorEvery === 0;
    lines.push(
      <line
        key={`v${i}`}
        x1={lx}
        y1={y}
        x2={lx}
        y2={y + height}
        stroke={major ? GRID_MAJOR : GRID}
        strokeWidth={major ? 1 : 0.5}
      />,
    );
  }
  for (let j = 0; j <= yUnits; j++) {
    const ly = y + height - (j / yUnits) * height;
    const major = j % majorEvery === 0;
    lines.push(
      <line
        key={`h${j}`}
        x1={x}
        y1={ly}
        x2={x + width}
        y2={ly}
        stroke={major ? GRID_MAJOR : GRID}
        strokeWidth={major ? 1 : 0.5}
      />,
    );
  }
  return <g aria-hidden>{lines}</g>;
}

type ExamBarChartProps = PracticeQuestionBarChartParams;

export function ExamBarChartFigure(props: ExamBarChartProps) {
  const plotX = 52;
  const plotY = 28;
  const plotW = 400;
  const plotH = 200;
  const yTicks = Math.floor(props.yMax / props.yStep);
  const barCount = props.bars.length;
  const slotW = plotW / barCount;
  const barW = Math.min(56, slotW * 0.55);

  return (
    <figure
      className="mx-auto max-w-2xl rounded-lg border border-slate-300 bg-white p-4 shadow-sm dark:border-slate-600 dark:bg-slate-900"
      aria-label={props.title}
    >
      <svg
        viewBox="0 0 480 300"
        className="h-auto w-full text-zinc-800 dark:text-zinc-200"
        role="img"
      >
        <title>{props.title}</title>
        <ExamGraphPaper
          x={plotX}
          y={plotY}
          width={plotW}
          height={plotH}
          xUnits={20}
          yUnits={yTicks}
          majorEvery={2}
        />
        {/* Y axis */}
        <line
          x1={plotX}
          y1={plotY}
          x2={plotX}
          y2={plotY + plotH}
          stroke={INK}
          strokeWidth={1.5}
        />
        <polygon
          points={`${plotX},${plotY - 2} ${plotX - 4},${plotY + 6} ${plotX + 4},${plotY + 6}`}
          fill={INK}
        />
        {/* X axis */}
        <line
          x1={plotX}
          y1={plotY + plotH}
          x2={plotX + plotW}
          y2={plotY + plotH}
          stroke={INK}
          strokeWidth={1.5}
        />
        <polygon
          points={`${plotX + plotW + 2},${plotY + plotH} ${plotX + plotW - 6},${plotY + plotH - 4} ${plotX + plotW - 6},${plotY + plotH + 4}`}
          fill={INK}
        />
        {/* Y tick labels */}
        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const val = i * props.yStep;
          const ty = plotY + plotH - (val / props.yMax) * plotH;
          return (
            <text
              key={val}
              x={plotX - 8}
              y={ty + 4}
              textAnchor="end"
              className="fill-zinc-700 text-[11px] dark:fill-zinc-300"
            >
              {val}
            </text>
          );
        })}
        <text
          x={plotX - 38}
          y={plotY + plotH / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${plotX - 38} ${plotY + plotH / 2})`}
          className="fill-zinc-800 text-[12px] font-medium dark:fill-zinc-200"
        >
          {props.yLabel}
        </text>
        {/* Bars */}
        {props.bars.map((bar, i) => {
          const cx = plotX + slotW * i + slotW / 2;
          const bh = bar.value > 0 ? (bar.value / props.yMax) * plotH : 0;
          return (
            <g key={bar.label}>
              {bh > 0 && (
                <rect
                  x={cx - barW / 2}
                  y={plotY + plotH - bh}
                  width={barW}
                  height={bh}
                  fill={BAR_FILL}
                  stroke={INK}
                  strokeWidth={1.2}
                  className="dark:fill-zinc-700"
                />
              )}
              <text
                x={cx}
                y={plotY + plotH + 18}
                textAnchor="middle"
                className="fill-zinc-800 text-[10px] dark:fill-zinc-200"
              >
                {bar.label.length > 14 ? `${bar.label.slice(0, 12)}…` : bar.label}
              </text>
            </g>
          );
        })}
        <text
          x={plotX + plotW / 2}
          y={plotY + plotH + 38}
          textAnchor="middle"
          className="fill-zinc-800 text-[12px] font-medium dark:fill-zinc-200"
        >
          {props.xLabel}
        </text>
        <text
          x={plotX + plotW / 2}
          y={16}
          textAnchor="middle"
          className="fill-zinc-900 text-[13px] font-semibold dark:fill-zinc-100"
        >
          {props.title}
        </text>
      </svg>
    </figure>
  );
}

export const DEFAULT_HOMEWORK_BAR_CHART: PracticeQuestionBarChartParams = {
  kind: "barChart",
  title: "Average homework hours per week",
  yLabel: "Hours",
  xLabel: "Year group",
  yMax: 10,
  yStep: 2,
  bars: [
    { label: "Year 8", value: 6 },
    { label: "Year 9", value: 8 },
  ],
};

function scaleX(
  x: number,
  plotX: number,
  plotW: number,
  xMin: number,
  xMax: number,
) {
  return plotX + ((x - xMin) / (xMax - xMin)) * plotW;
}

function scaleY(
  cf: number,
  plotY: number,
  plotH: number,
  yMax: number,
) {
  return plotY + plotH - (cf / yMax) * plotH;
}

export function ExamCumulativeFrequencyFigure(
  props: PracticeQuestionCumulativeFrequencyParams,
) {
  const plotX = 52;
  const plotY = 28;
  const plotW = 400;
  const plotH = 200;
  const yTicks = Math.floor(props.yMax / props.yStep);
  const pathD = props.points
    .map((p, i) => {
      const sx = scaleX(p.x, plotX, plotW, props.xMin, props.xMax);
      const sy = scaleY(p.cf, plotY, plotH, props.yMax);
      return `${i === 0 ? "M" : "L"} ${sx} ${sy}`;
    })
    .join(" ");

  return (
    <figure
      className="mx-auto max-w-2xl rounded-lg border border-slate-300 bg-white p-4 shadow-sm dark:border-slate-600 dark:bg-slate-900"
      aria-label={props.title}
    >
      <svg viewBox="0 0 480 300" className="h-auto w-full" role="img">
        <title>{props.title}</title>
        <ExamGraphPaper
          x={plotX}
          y={plotY}
          width={plotW}
          height={plotH}
          xUnits={20}
          yUnits={yTicks}
          majorEvery={2}
        />
        <line
          x1={plotX}
          y1={plotY}
          x2={plotX}
          y2={plotY + plotH}
          stroke={INK}
          strokeWidth={1.5}
        />
        <line
          x1={plotX}
          y1={plotY + plotH}
          x2={plotX + plotW}
          y2={plotY + plotH}
          stroke={INK}
          strokeWidth={1.5}
        />
        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />
        {props.highlight?.type === "median" && (
          <>
            <line
              x1={plotX}
              x2={scaleX(props.highlight.xValue, plotX, plotW, props.xMin, props.xMax)}
              y1={scaleY(props.highlight.cfLine, plotY, plotH, props.yMax)}
              y2={scaleY(props.highlight.cfLine, plotY, plotH, props.yMax)}
              stroke="#10B981"
              strokeDasharray="4 3"
            />
            <line
              x1={scaleX(props.highlight.xValue, plotX, plotW, props.xMin, props.xMax)}
              x2={scaleX(props.highlight.xValue, plotX, plotW, props.xMin, props.xMax)}
              y1={scaleY(props.highlight.cfLine, plotY, plotH, props.yMax)}
              y2={plotY + plotH}
              stroke="#10B981"
              strokeDasharray="4 3"
            />
          </>
        )}
        {props.highlight?.type === "readBelow" && (
          <>
            <line
              x1={scaleX(props.highlight.xValue, plotX, plotW, props.xMin, props.xMax)}
              x2={scaleX(props.highlight.xValue, plotX, plotW, props.xMin, props.xMax)}
              y1={plotY + plotH}
              y2={scaleY(props.highlight.cfValue, plotY, plotH, props.yMax)}
              stroke="#f59e0b"
              strokeDasharray="4 3"
            />
            <line
              x1={plotX}
              x2={scaleX(props.highlight.xValue, plotX, plotW, props.xMin, props.xMax)}
              y1={scaleY(props.highlight.cfValue, plotY, plotH, props.yMax)}
              y2={scaleY(props.highlight.cfValue, plotY, plotH, props.yMax)}
              stroke="#f59e0b"
              strokeDasharray="4 3"
            />
          </>
        )}
        <text
          x={plotX + plotW / 2}
          y={16}
          textAnchor="middle"
          className="fill-zinc-900 text-[13px] font-semibold dark:fill-zinc-100"
        >
          {props.title}
        </text>
        <text
          x={plotX + plotW / 2}
          y={plotY + plotH + 36}
          textAnchor="middle"
          className="fill-zinc-800 text-[12px] font-medium dark:fill-zinc-200"
        >
          {props.xLabel}
        </text>
        <text
          x={plotX - 38}
          y={plotY + plotH / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${plotX - 38} ${plotY + plotH / 2})`}
          className="fill-zinc-800 text-[12px] font-medium dark:fill-zinc-200"
        >
          {props.yLabel}
        </text>
      </svg>
    </figure>
  );
}

export function ExamBoxPlotFigure(props: PracticeQuestionBoxPlotParams) {
  const axisMin = props.axisMin ?? props.min - 5;
  const axisMax = props.axisMax ?? props.max + 5;
  const plotX = 40;
  const plotY = 55;
  const plotW = 400;
  const scale = (v: number) =>
    plotX + ((v - axisMin) / (axisMax - axisMin)) * plotW;
  const q1x = scale(props.q1);
  const q3x = scale(props.q3);
  const medx = scale(props.median);
  const minx = scale(props.min);
  const maxx = scale(props.max);

  return (
    <figure
      className="mx-auto max-w-2xl rounded-lg border border-slate-300 bg-white p-4 shadow-sm dark:border-slate-600 dark:bg-slate-900"
      aria-label={props.title}
    >
      <svg viewBox="0 0 480 140" className="h-auto w-full" role="img">
        <title>{props.title}</title>
        <line x1={plotX} y1={plotY} x2={plotX + plotW} y2={plotY} stroke="#94a3b8" />
        <line x1={minx} y1={plotY - 18} x2={minx} y2={plotY + 18} stroke={INK} strokeWidth="2" />
        <line x1={maxx} y1={plotY - 18} x2={maxx} y2={plotY + 18} stroke={INK} strokeWidth="2" />
        <line x1={minx} y1={plotY} x2={q1x} y2={plotY} stroke={INK} />
        <line x1={q3x} y1={plotY} x2={maxx} y2={plotY} stroke={INK} />
        <rect
          x={q1x}
          y={plotY - 16}
          width={q3x - q1x}
          height={32}
          fill="#bae6fd"
          stroke="#0284c7"
          strokeWidth="2"
        />
        <line x1={medx} y1={plotY - 16} x2={medx} y2={plotY + 16} stroke="#0c4a6e" strokeWidth="2" />
        {[props.min, props.q1, props.median, props.q3, props.max].map((v) => (
          <text
            key={v}
            x={scale(v)}
            y={plotY + 42}
            textAnchor="middle"
            className="fill-slate-600 text-[10px]"
          >
            {v}
          </text>
        ))}
        {props.highlight === "iqr" && (
          <>
            <line x1={q1x} y1={plotY - 28} x2={q3x} y2={plotY - 28} stroke="#10B981" strokeWidth="1.5" />
            <text x={(q1x + q3x) / 2} y={plotY - 32} textAnchor="middle" className="fill-emerald-700 text-[9px] font-bold">
              IQR
            </text>
          </>
        )}
        {props.highlight === "range" && (
          <>
            <line x1={minx} y1={plotY - 28} x2={maxx} y2={plotY - 28} stroke="#10B981" strokeWidth="1.5" />
            <text x={(minx + maxx) / 2} y={plotY - 32} textAnchor="middle" className="fill-emerald-700 text-[9px] font-bold">
              Range
            </text>
          </>
        )}
        <text x={plotX + plotW / 2} y={18} textAnchor="middle" className="fill-zinc-900 text-[13px] font-semibold dark:fill-zinc-100">
          {props.title}
        </text>
      </svg>
    </figure>
  );
}

export const DEFAULT_BUS_STOP_CHART: PracticeQuestionBarChartParams = {
  kind: "barChart",
  title: "Number of people waiting at each bus stop at 3 pm",
  yLabel: "Number of people",
  xLabel: "Bus stops",
  yMax: 14,
  yStep: 2,
  bars: [
    { label: "Village hall", value: 5 },
    { label: "School", value: 13 },
    { label: "Post office", value: 4 },
    { label: "Football ground", value: 0 },
  ],
};