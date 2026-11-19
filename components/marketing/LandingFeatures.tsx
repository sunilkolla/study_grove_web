import { BookOpen, CalendarDays, Layers, Timer } from "lucide-react";

const PILLARS = [
  {
    title: "Prepare",
    description:
      "Set year group, exam board, and subjects so every question and flashcard matches your specification.",
    icon: Layers,
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Plan",
    description:
      "Academic-year schedule, revision tasks in the dock, and smart suggestions for what to do today.",
    icon: CalendarDays,
    accent: "text-sky-600 dark:text-sky-400",
  },
  {
    title: "Practice",
    description:
      "Question bank with explanations, subject filters, and topic-pinned quizzes that earn XP.",
    icon: BookOpen,
    accent: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Focus",
    description:
      "25-minute Pomodoro forest sessions that grow your grove and keep streaks alive.",
    icon: Timer,
    accent: "text-amber-600 dark:text-amber-400",
  },
] as const;

export function LandingFeatures() {
  return (
    <section id="features" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-[#f4f7fb] sm:text-3xl">
            Everything in one GCSE workspace
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-[#a0b9d9]">
            The same four habits from your StudyGrove shell—before you even open the sidebar.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-[#2e4a73] dark:bg-[#1a2437]"
            >
              <item.icon className={`mb-3 h-8 w-8 ${item.accent}`} />
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#f4f7fb]">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-[#a0b9d9]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}