"use client";

import type { ReactNode } from "react";

type SyllabusNavigatorPanelProps = {
  open: boolean;
  children: ReactNode;
};

export function SyllabusNavigatorPanel({
  open,
  children,
}: SyllabusNavigatorPanelProps) {
  return (
    <section
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
      aria-hidden={!open}
    >
      <aside className="min-h-0 overflow-hidden">
        <aside
          className={`transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
            open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          {children}
        </aside>
      </aside>
    </section>
  );
}