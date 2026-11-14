"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SHELL_DATA_CHANGED, notifyShellDataChanged } from "@/lib/shellEvents";
import {
  createTask,
  fetchTasks,
  toggleTaskCompletion,
} from "@/services/taskService";
import {
  awardTaskCompletionXp,
  fetchShellUserStats,
  fetchUserStats,
  toShellStats,
  updateUserYearGroup,
} from "@/services/userService";
import type { ShellUserStats, SubjectCode, TaskItem, UserStats, YearGroup } from "@/types";
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
  const router = useRouter();
  const pathname = usePathname();

  const loadShellData = useCallback(async () => {
    const user = await fetchUserStats();
    setDockStats(user);
    setHeaderStats(toShellStats(user));
  }, []);

  useEffect(() => {
    void loadShellData();
    const onChanged = () => void loadShellData();
    window.addEventListener(SHELL_DATA_CHANGED, onChanged);
    return () => window.removeEventListener(SHELL_DATA_CHANGED, onChanged);
  }, [loadShellData]);

  const syncTasks = useCallback(async () => {
    setTasks(await fetchTasks());
  }, []);

  useEffect(() => {
    void syncTasks();
  }, [pathname, syncTasks]);

  const handleYearGroupChange = useCallback(
    async (yearGroup: YearGroup) => {
      const next = await updateUserYearGroup(yearGroup);
      setHeaderStats(toShellStats(next));
      setDockStats(next);
      router.refresh();
      notifyShellDataChanged();
    },
    [router],
  );

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
        onOpenGrove={() => {
          /* Grove modal — Phase 5 */
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader
          stats={headerStats}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onYearGroupChange={(year) => void handleYearGroupChange(year)}
          onQuickFocusStart={() => {
            /* Focus modal — Phase 5 */
          }}
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
          />
        </div>
      </div>
    </div>
  );
}