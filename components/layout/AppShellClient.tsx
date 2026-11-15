"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { OPEN_FOCUS_TIMER } from "@/lib/focusEvents";
import { SHELL_DATA_CHANGED, notifyShellDataChanged } from "@/lib/shellEvents";
import { FloatingFocusBubble } from "@/components/focus/FloatingFocusBubble";
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
    window.addEventListener(OPEN_FOCUS_TIMER, openTimer);
    return () => window.removeEventListener(OPEN_FOCUS_TIMER, openTimer);
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
    async (durationMins: FocusDuration, _subject: SubjectCode) => {
      const next = await completeFocusSession(durationMins, _subject);
      setDockStats(next);
      setHeaderStats(toShellStats(next));
      void loadShellData();
      notifyShellDataChanged();
    },
    [loadShellData],
  );

  const focusTimer = useFocusTimer({
    onSessionComplete: (durationMins, subject) =>
      void handleFocusSessionComplete(durationMins, subject),
    onSessionCompletedUi: () => setFocusModalOpen(true),
  });

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
          onQuickFocusStart={() => setFocusModalOpen(true)}
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
        session={
          focusTimer.phase === "running" || focusTimer.phase === "paused"
            ? focusTimer.snapshot
            : null
        }
        onOpenTimer={() => setFocusModalOpen(true)}
        onPause={focusTimer.pauseFocus}
        onResume={() => {
          focusTimer.startFocus();
        }}
      />

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