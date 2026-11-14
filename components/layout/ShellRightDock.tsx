export function ShellRightDock() {
  return (
    <aside
      className="sticky top-0 flex h-[calc(100vh-4rem)] w-[320px] shrink-0 flex-col border-l border-slate-200/80 bg-white transition-colors duration-200 dark:border-[#2e4a73]/60 dark:bg-[#1a2437]"
      aria-label="Practice target and tasks"
    >
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-[#a0b9d9]">
          Right dock
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-[#6d94c3]">
          Phase 1.4 / 4.1 — dock widgets
        </p>
      </div>
    </aside>
  );
}