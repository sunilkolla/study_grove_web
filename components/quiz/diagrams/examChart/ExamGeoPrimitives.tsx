import type { PracticeQuestionParallelLinesParams } from "@/types";

const FIGURE =
  "mx-auto max-w-2xl rounded-lg border border-slate-300 bg-white p-4 shadow-sm dark:border-slate-600 dark:bg-slate-900";
const INK = "#18181b";

export function ExamParallelLinesFigure(props: PracticeQuestionParallelLinesParams) {
  return (
    <figure className={FIGURE} aria-label="Parallel lines and transversal">
      <svg viewBox="0 0 300 160" className="h-auto w-full" role="img">
        <title>
          Parallel lines {props.lineA} and {props.lineB}
        </title>
        <line x1="20" y1="50" x2="280" y2="35" stroke={INK} strokeWidth="1.5" />
        <line x1="20" y1="110" x2="280" y2="95" stroke={INK} strokeWidth="1.5" />
        <line x1="120" y1="10" x2="80" y2="150" stroke={INK} strokeWidth="1.5" />
        <text x="245" y="32" className="fill-zinc-800 text-[12px] font-bold dark:fill-zinc-200">
          {props.lineA}
        </text>
        <text x="245" y="92" className="fill-zinc-800 text-[12px] font-bold dark:fill-zinc-200">
          {props.lineB}
        </text>
        <text x="95" y="78" className="fill-zinc-900 text-[13px] font-semibold dark:fill-zinc-100">
          {props.unknownLabel}
        </text>
        <text x="130" y="48" className="fill-zinc-900 text-[13px] font-semibold dark:fill-zinc-100">
          {props.givenAngle}°
        </text>
        <path
          d="M 125 45 A 22 22 0 0 1 138 62"
          fill="none"
          stroke={INK}
          strokeWidth="1.2"
        />
      </svg>
      <figcaption className="mt-2 text-center text-[10px] text-slate-600 dark:text-slate-300">
        {props.lineA} ∥ {props.lineB} — {props.angleRelation} angles
      </figcaption>
    </figure>
  );
}