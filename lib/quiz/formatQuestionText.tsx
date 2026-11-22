import type { ReactNode } from "react";

/** Split on **bold** markers and double newlines for exam-readable stems. */
function parseInlineBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-950 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function FormattedQuestionText({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  if (paragraphs.length <= 1) {
    return (
      <p className="leading-relaxed">{parseInlineBold(paragraphs[0] ?? text)}</p>
    );
  }

  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} className={i > 0 ? "mt-3 leading-relaxed" : "leading-relaxed"}>
          {parseInlineBold(para)}
        </p>
      ))}
    </>
  );
}