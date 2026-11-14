"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchShellUserStats,
  toShellStats,
  updateUserYearGroup,
} from "@/services/userService";
import type { ShellUserStats, YearGroup } from "@/types";
import { SidebarNav } from "./SidebarNav";
import { ShellRightDock } from "./ShellRightDock";
import { TopHeader } from "./TopHeader";

type AppShellClientProps = {
  children: React.ReactNode;
};

export function AppShellClient({ children }: AppShellClientProps) {
  const [stats, setStats] = useState<ShellUserStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    void fetchShellUserStats().then(setStats);
  }, []);

  const handleYearGroupChange = useCallback(
    async (yearGroup: YearGroup) => {
      const next = await updateUserYearGroup(yearGroup);
      setStats(toShellStats(next));
      router.refresh();
    },
    [router],
  );

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] dark:bg-[#141c2b]">
        <p className="text-sm text-slate-500 dark:text-[#a0b9d9]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1a2437] transition-colors duration-200 dark:bg-[#141c2b] dark:text-[#f4f7fb]">
      <SidebarNav
        forestTreesCount={stats.forestTreesCount}
        onOpenGrove={() => {
          /* Grove modal — Phase 5 */
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader
          stats={stats}
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
          <ShellRightDock />
        </div>
      </div>
    </div>
  );
}