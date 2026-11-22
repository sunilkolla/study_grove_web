import type { ReactNode } from "react";
import type { PracticeQuestionBarChartParams } from "@/types";

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