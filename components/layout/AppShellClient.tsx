"use client";

import { useState } from "react";
import {
  initialShellStats,
  statsForYearGroup,
} from "@/data/mockShellStats";
import type { YearGroup } from "@/types/shell";
import { SidebarNav } from "./SidebarNav";
import { ShellRightDock } from "./ShellRightDock";
import { TopHeader } from "./TopHeader";

type AppShellClientProps = {
  children: React.ReactNode;
};

export function AppShellClient({ children }: AppShellClientProps) {
  const [stats, setStats] = useState(initialShellStats);
  const [searchQuery, setSearchQuery] = useState("");

  const handleYearGroupChange = (yearGroup: YearGroup) => {
    setStats((prev) => statsForYearGroup(prev, yearGroup));
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1a2437]">
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
          onYearGroupChange={handleYearGroupChange}
          onQuickFocusStart={() => {
            /* Focus modal — Phase 5 */
          }}
        />

        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-y-auto p-6">{children}</main>
          <ShellRightDock />
        </div>
      </div>
    </div>
  );
}