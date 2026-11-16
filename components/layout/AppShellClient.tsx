"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FOCUS_PRESET, OPEN_FOCUS_TIMER } from "@/lib/focusEvents";
import { subjectCodeToLabel } from "@/lib/studyFocusBridge";
import type { FocusMode } from "@/lib/focusPreferences";
import { SHELL_DATA_CHANGED, notifyShellDataChanged } from "@/lib/shellEvents";
import { FloatingFocusBubble } from "@/components/focus/FloatingFocusBubble";
import { FocusSessionToast } from "@/components/focus/FocusSessionToast";
import { FocusTimerModal } from "@/components/focus/FocusTimerModal";
import { useFocusTimer } from "@/components/focus/useFocusTimer";
import { GroveModal } from "@/components/grove/GroveModal";
import {
  completeFocusSession,
  type FocusDuration,
} from "@/services/focusService";
import { fetchForestTrees } from "@/services/groveService";
import {
  createTask,
  fetchTasks,
  toggleTaskCompletion,
} from "@/services/taskService";
import {
  awardTaskCompletionXp,
  fetchUserStats,
  toShellStats,
} from "@/services/userService";
import type {
  ForestTree,
  ShellUserStats,
  SubjectCode,
  TaskItem,
  UserStats,
} from "@/types";
import { ContextDock } from "./ContextDock";
import { SidebarNav } from "./SidebarNav";
import { TopHeader } from "./TopHeader";

type AppShellClientProps = {
  children: React.ReactNode;
};

export function AppShellClient({ children }: AppShellClientProps) {
  const [headerStats, setHeaderStats] = useState<ShellUserStats | null>(null);
  const [dockStats, setDockStats] = useState<UserStats | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusModalOpen, setFocusModalOpen] = useState(false);
  const [groveModalOpen, setGroveModalOpen] = useState(false);
  const [forestTrees, setForestTrees] = useState<ForestTree[]>([]);
  const [focusToast, setFocusToast] = useState<string | null>(null);
  const focusToastTimerRef = useRef<number | null>(null);
  const pendingFocusSubjectRef = useRef<SubjectCode | null>(null);
  const pendingFocusModeRef = useRef<FocusMode | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const loadShellData = useCallback(async () => {
    const [user, trees] = await Promise.all([
      fetchUserStats(),
      fetchForestTrees(),
    ]);
    setDockStats(user);
    setHeaderStats(toShellStats(user));
    setForestTrees(trees);
  }, []);

  useEffect(() => {
    void loadShellData();
    const onChanged = () => void loadShellData();
    window.addEventListener(SHELL_DATA_CHANGED, onChanged);
    return () => window.removeEventListener(SHELL_DATA_CHANGED, onChanged);
  }, [loadShellData]);

  useEffect(() => {
    const openTimer = () => setFocusModalOpen(true);
    const onPreset = (e: Event) => {
      const detail = (
        e as CustomEvent<{ subject?: SubjectCode; mode?: FocusMode }>
      ).detail;
      if (detail?.mode === "custom") {
        pendingFocusModeRef.current = "custom";
        pendingFocusSubjectRef.current = null;
        return;
      }
      if (detail?.subject) {
        pendingFocusSubjectRef.current = detail.subject;
        pendingFocusModeRef.current = null;
      }
    };
    window.addEventListener(OPEN_FOCUS_TIMER, openTimer);
    window.addEventListener(FOCUS_PRESET, onPreset);
    return () => {
      window.removeEventListener(OPEN_FOCUS_TIMER, openTimer);
      window.removeEventListener(FOCUS_PRESET, onPreset);
    };
  }, []);

  const syncTasks = useCallback(async () => {
    setTasks(await fetchTasks());
  }, []);

  useEffect(() => {
    void syncTasks();
  }, [pathname, syncTasks]);

  const handleToggleTask = useCallback(
    async (taskId: string) => {
      const { tasks: nextTasks, justCompleted } =
        await toggleTaskCompletion(taskId);
      setTasks(nextTasks);
      if (justCompleted) {
        const nextUser = await awardTaskCompletionXp(25);
        setDockStats(nextUser);
        setHeaderStats(toShellStats(nextUser));
      }
      notifyShellDataChanged();
    },
    [],
  );

  const handleAddTask = useCallback(
    async (title: string, subject: SubjectCode, dueDateLabel: string) => {
      const nextTasks = await createTask({ title, subject, dueDateLabel });
      setTasks(nextTasks);
    },
    [],
  );

  const handleFocusSessionComplete = useCallback(
    async (
      durationMins: FocusDuration,
      mode: FocusMode,
      subject?: SubjectCode,
    ) => {
      const next = await completeFocusSession(durationMins, mode, subject);
      setDockStats(next);
      setHeaderStats(toShellStats(next));
      void loadShellData();
      notifyShellDataChanged();
    },
    [loadShellData],
  );

  const showFocusToast = useCallback((message: string) => {
    setFocusToast(message);
    if (focusToastTimerRef.current !== null) {
      window.clearTimeout(focusToastTimerRef.current);
    }
    focusToastTimerRef.current = window.setTimeout(() => {
      setFocusToast(null);
      focusToastTimerRef.current = null;
    }, 4500);
  }, []);

  const focusTimer = useFocusTimer({
    onSessionComplete: (durationMins, mode, subject) =>
      void handleFocusSessionComplete(durationMins, mode, subject),
    onSessionStart: (ctx) => {
      const sub =
        ctx.focusMode === "custom"
          ? "Custom"
          : subjectCodeToLabel(ctx.subject);
      showFocusToast(
        `${ctx.duration}m Deep Focus ${ctx.treeLabel} started${ctx.focusMode === "subject" ? ` · ${sub}` : ""}!`,
      );
    },
    onSessionEnded: (ctx) => {
      const sub =
        ctx.focusMode === "custom"
          ? "Custom"
          : subjectCodeToLabel(ctx.subject);
      showFocusToast(
        `${ctx.duration}m Deep Focus ${ctx.treeLabel} complete${ctx.focusMode === "subject" ? ` · ${sub}` : ""}!`,
      );
    },
    onSessionCompletedUi: () => setFocusModalOpen(true),
  });

  useEffect(() => {
    if (!focusModalOpen) return;
    if (pendingFocusModeRef.current === "custom") {
      focusTimer.setFocusMode("custom");
      focusTimer.setSyncWithSyllabus(false);
      pendingFocusModeRef.current = null;
      return;
    }
    if (!pendingFocusSubjectRef.current) return;
    focusTimer.setFocusMode("subject");
    focusTimer.setSubject(pendingFocusSubjectRef.current);
    focusTimer.setSyncWithSyllabus(false);
    pendingFocusSubjectRef.current = null;
  }, [focusModalOpen, focusTimer.setFocusMode, focusTimer.setSubject, focusTimer.setSyncWithSyllabus]);

  const focusIsLive =
    focusTimer.phase === "running" || focusTimer.phase === "paused";

  const focusHeaderSubtitle =
    focusIsLive && focusTimer.focusMode === "subject"
      ? subjectCodeToLabel(focusTimer.subject)
      : focusIsLive && focusTimer.focusMode === "custom"
        ? "Custom"
        : null;

  const handleQuickPractice = useCallback(() => {
    if (pathname === "/dashboard") {
      document
        .getElementById("practice-quiz")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push("/dashboard#practice-quiz");
  }, [pathname, router]);

  if (!headerStats || !dockStats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] dark:bg-[#141c2b]">
        <p className="text-sm text-slate-500 dark:text-[#a0b9d9]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1a2437] transition-colors duration-200 dark:bg-[#141c2b] dark:text-[#f4f7fb]">
      <SidebarNav
        forestTreesCount={headerStats.forestTreesCount}
        examBoard={headerStats.examBoard}
        onOpenGrove={() => setGroveModalOpen(true)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader
          stats={headerStats}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          focusTimerLabel={focusIsLive ? focusTimer.formattedTime : null}
          focusTimerSubject={focusHeaderSubtitle}
          onFocusTimerClick={() => focusTimer.toggleFocus()}
        />

        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-y-auto bg-[#F8FAFC] p-6 dark:bg-[#141c2b]">
            {children}
          </main>
          <ContextDock
            stats={dockStats}
            tasks={tasks}
            onToggleTask={(id) => void handleToggleTask(id)}
            onAddTask={(title, subject, due) =>
              void handleAddTask(title, subject, due)
            }
            onQuickPractice={handleQuickPractice}
            onQuickFocusStart={() => setFocusModalOpen(true)}
          />
        </div>
      </div>

      <FloatingFocusBubble
        todayFocusMins={dockStats.todayFocusMins}
        defaultDuration={focusTimer.selectedDuration}
        focusMode={focusTimer.focusMode}
        subjectLabel={
          focusTimer.focusMode === "custom"
            ? "Custom"
            : subjectCodeToLabel(focusTimer.subject)
        }
        session={focusIsLive ? focusTimer.snapshot : null}
        onToggle={() => focusTimer.toggleFocus()}
        onOpenSettings={() => setFocusModalOpen(true)}
      />

      <FocusSessionToast message={focusToast} />

      <FocusTimerModal
        isOpen={focusModalOpen}
        onClose={() => setFocusModalOpen(false)}
        onMinimize={() => setFocusModalOpen(false)}
        timer={focusTimer}
      />

      <GroveModal
        isOpen={groveModalOpen}
        onClose={() => setGroveModalOpen(false)}
        trees={forestTrees}
        stats={dockStats}
      />
    </div>
  );
}