"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  HelpCircle,
  Layers,
  LayoutDashboard,
  Network,
  Settings,
  Timer,
  TreePine,
} from "lucide-react";
import { SubjectIcon } from "@/components/common/SubjectIcon";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import type { StudyNavHref } from "@/types/shell";

type NavItem = {
  href: StudyNavHref;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Practice Hub", icon: LayoutDashboard },
  { href: "/focus", label: "Deep Focus", icon: Timer, badge: "Pomodoro" },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/mindmaps", label: "Mind Maps", icon: Network },
  { href: "/flashcards", label: "Flashcards", icon: Layers },
  { href: "/quizzes", label: "Question Bank", icon: HelpCircle, badge: "Daily 5" },
];

const COURSE_SUBJECTS = [
  { code: "PHYSICS", label: "Physics" },
  { code: "CHEMISTRY", label: "Chem" },
  { code: "BIOLOGY", label: "Biology" },
  { code: "MATHS", label: "Maths" },
  { code: "COMPUTER_SCIENCE", label: "CS" },
  { code: "ENGLISH", label: "English" },
  { code: "GEOGRAPHY", label: "Geog" },
] as const;

type SidebarNavProps = {
  forestTreesCount: number;
  onOpenGrove?: () => void;
};

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({ forestTreesCount, onOpenGrove }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 z-30 flex h-screen w-[240px] shrink-0 flex-col bg-[#0F5132] text-white transition-colors duration-200 select-none dark:border-r dark:border-[#2e4a73]/60 dark:bg-[#1a2437] dark:text-[#f4f7fb]"
      aria-label="Main navigation"
    >
      <div className="border-b border-white/10 p-5 pb-3 dark:border-[#2e4a73]/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-emerald-900 shadow-sm ring-2 ring-emerald-400/30">
            <TreePine className="h-5 w-5 text-emerald-100" />
          </div>
          <div>
            <div className="text-base font-bold leading-none tracking-tight">
              StudyGrove
            </div>
            <div className="mt-1 text-[11px] font-semibold leading-none text-emerald-200 dark:text-emerald-400">
              GCSE Habit Engine
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px] text-emerald-100/80">
          <span className="font-medium">Exam boards</span>
          <span className="font-semibold text-emerald-50">AQA · EDEXCEL · OCR</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        <p className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-200/70 dark:text-[#a0b9d9]">
          Workspace
        </p>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                active
                  ? "border border-emerald-400/40 bg-emerald-900/50 font-bold text-white shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-200"
                  : "text-emerald-100/90 hover:bg-white/10 hover:text-white dark:text-[#a0b9d9] dark:hover:bg-[#273853]/60 dark:hover:text-white"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon
                  className={`h-4 w-4 shrink-0 ${active ? "text-[#10B981] dark:text-emerald-400" : "text-emerald-200/80 dark:text-[#6d94c3]"}`}
                />
                <span className="truncate">{item.label}</span>
              </span>
              {item.badge && (
                <span
                  className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                    active
                      ? "bg-[#10B981]/30 text-emerald-50"
                      : "bg-black/20 text-emerald-100/80"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="px-1 pb-1 pt-3">
          <div className="flex items-center justify-between px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-100/80 dark:text-[#a0b9d9]">
            <span>7 Courses</span>
            <span className="text-[10px] font-bold lowercase text-[#10B981]">GCSE</span>
          </div>
          <div className="grid grid-cols-4 gap-1 rounded-xl border border-white/10 bg-black/15 p-1.5 dark:border-[#2e4a73]/60 dark:bg-[#141d2e]">
            {COURSE_SUBJECTS.map((subj) => (
              <Link
                key={subj.code}
                href="/dashboard"
                title={`Practice ${subj.label}`}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-lg p-1 transition-transform hover:scale-105 hover:bg-white/10 dark:hover:bg-[#273853]"
              >
                <SubjectIcon subject={subj.code} size="sm" />
                <span className="mt-0.5 truncate text-[9px] font-bold text-emerald-100/90 group-hover:text-white">
                  {subj.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="space-y-2.5 border-t border-white/10 bg-[#0c4329] p-3 dark:border-[#2e4a73]/60 dark:bg-[#1a2437]/90">
        <button
          type="button"
          onClick={() => onOpenGrove?.()}
          className="group w-full cursor-pointer rounded-xl border border-emerald-600/40 bg-gradient-to-br from-emerald-900/90 to-[#0a2e1c] p-3 text-left text-white shadow-sm transition-all hover:border-[#10B981]/50"
        >
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-200">
              <TreePine className="h-4 w-4 text-[#10B981]" />
              <span>My Study Grove</span>
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-[#10B981]/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-100">
              {forestTreesCount} Trees
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-emerald-100/80">
            <div className="flex items-center -space-x-1.5" aria-hidden>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-xs ring-2 ring-emerald-900">
                🌳
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs ring-2 ring-emerald-900">
                🌲
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs ring-2 ring-emerald-900">
                🍃
              </span>
            </div>
            <span className="flex items-center text-[10px] font-semibold text-[#10B981] transition-transform group-hover:translate-x-0.5">
              View Forest →
            </span>
          </div>
        </button>

        <ThemeSwitcher variant="segmented" />

        <Link
          href="/settings"
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
            pathname === "/settings"
              ? "bg-white/15 font-semibold text-white dark:bg-[#273853] dark:text-[#f4f7fb]"
              : "text-emerald-100/80 hover:bg-white/10 hover:text-white dark:text-[#a0b9d9] dark:hover:bg-[#273853] dark:hover:text-white"
          }`}
        >
          <Settings className="h-4 w-4 text-emerald-200/80" />
          <span>Settings &amp; Syllabus</span>
        </Link>
      </div>
    </aside>
  );
}