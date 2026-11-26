import {
  ExamBarChartFigure,
  ExamBoxPlotFigure,
  ExamCumulativeFrequencyFigure,
} from "./diagrams/examChart/ExamChartPrimitives";
import { ExamParallelLinesFigure } from "./diagrams/examChart/ExamGeoPrimitives";
import { MathsDiagramByKey } from "./diagrams/year9MathsDiagrams";
import type { PracticeQuestionDiagramParams } from "@/types";

type QuizDiagramProps = {
  questionId: string;
  diagramKey?: string;
  diagramParams?: PracticeQuestionDiagramParams;
};

/** Optional topic visuals — extend as question bank grows. */
export function QuizDiagram({
  questionId,
  diagramKey,
  diagramParams,
}: QuizDiagramProps) {
  if (diagramParams?.kind === "barChart") {
    return <ExamBarChartFigure {...diagramParams} />;
  }
  if (diagramParams?.kind === "cumulativeFrequency") {
    return <ExamCumulativeFrequencyFigure {...diagramParams} />;
  }
  if (diagramParams?.kind === "boxPlot") {
    return <ExamBoxPlotFigure {...diagramParams} />;
  }
  if (diagramParams?.kind === "parallelLines") {
    return <ExamParallelLinesFigure {...diagramParams} />;
  }
  if (diagramKey) {
    return <MathsDiagramByKey diagramKey={diagramKey} />;
  }
  if (questionId === "q-y10-1") {
    return <CellTransportDiagram />;
  }
  if (questionId === "q-y9-4" || questionId === "q-y10-4") {
    return <EnergyTransferDiagram />;
  }
  return null;
}

function CellTransportDiagram() {
  return (
    <figure
      className="mx-auto max-w-md rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 dark:border-emerald-800/50 dark:bg-emerald-950/30"
      aria-label="Diagram: cell membrane and transport"
    >
      <svg viewBox="0 0 320 140" className="h-auto w-full" role="img">
        <title>Cell membrane with high and low concentration regions</title>
        <rect
          x="8"
          y="20"
          width="304"
          height="100"
          rx="12"
          fill="#ecfdf5"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="40" y="45" className="fill-emerald-800 text-[11px] font-semibold">
          Low concentration
        </text>
        <text x="175" y="45" className="fill-emerald-900 text-[11px] font-semibold">
          High concentration
        </text>
        <line
          x1="160"
          y1="28"
          x2="160"
          y2="112"
          stroke="#059669"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <path
          d="M130 75 L160 75 L160 55 L190 75 L160 75 L160 95 Z"
          fill="#0F5132"
          opacity="0.9"
        />
        <text x="118" y="118" className="fill-[#0F5132] text-[10px] font-bold">
          Active transport (ATP)
        </text>
        <circle cx="95" cy="78" r="4" fill="#34d399" />
        <circle cx="110" cy="88" r="4" fill="#34d399" />
        <circle cx="205" cy="72" r="4" fill="#059669" />
        <circle cx="220" cy="82" r="4" fill="#059669" />
        <circle cx="235" cy="92" r="4" fill="#059669" />
      </svg>
      <figcaption className="mt-2 text-center text-[10px] text-emerald-800/80 dark:text-emerald-200/80">
        Particles moved against the gradient using energy from respiration
      </figcaption>
    </figure>
  );
}

function EnergyTransferDiagram() {
  return (
    <figure
      className="mx-auto max-w-sm rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 dark:border-amber-900/50 dark:bg-amber-950/20"
      aria-label="Diagram: energy transfer"
    >
      <svg viewBox="0 0 280 100" className="h-auto w-full" role="img">
        <title>Energy store to useful output</title>
        <rect x="20" y="35" width="70" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" />
        <text x="35" y="60" className="fill-amber-900 text-[10px] font-semibold">
          Store
        </text>
        <path
          d="M95 55 H165"
          stroke="#64748b"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
          </marker>
        </defs>
        <rect x="170" y="35" width="90" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" />
        <text x="182" y="60" className="fill-sky-900 text-[10px] font-semibold">
          Useful output
        </text>
      </svg>
    </figure>
  );
}