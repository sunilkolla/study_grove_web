import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-emerald-50/80 to-[#f8fafc] px-4 py-16 dark:border-[#2e4a73] dark:from-emerald-950/30 dark:to-[#141c2b] sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:border-emerald-800/50 dark:bg-[#1a2437] dark:text-emerald-300">
            <Sparkles className="h-3 w-3" />
            GCSE Years 8–11 · AQA · Edexcel · OCR
          </p>
          <h1 className="text-3xl font-black tracking-tight text-[#0F5132] dark:text-emerald-300 sm:text-5xl">
            Grow steady exam habits in your Study Grove
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#a0b9d9] sm:text-lg">
            One workspace for daily practice, spaced flashcards, revision schedule,
            and deep-focus Pomodoro sessions—matched to your year and exam board.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/signup"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E293B] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-800 sm:w-auto dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 hover:border-emerald-300 sm:w-auto dark:border-[#2e4a73] dark:bg-[#1a2437] dark:text-[#f4f7fb]"
            >
              View plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}