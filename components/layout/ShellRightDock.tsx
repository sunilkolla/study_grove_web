export function ShellRightDock() {
  return (
    <aside
      className="sticky top-0 flex h-[calc(100vh-4rem)] w-[320px] shrink-0 flex-col border-l border-slate-200/80 bg-white"
      aria-label="Practice target and tasks"
    >
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Right dock
        </p>
        <p className="mt-2 text-sm text-slate-500">Phase 1.4 / 4.1 — dock widgets</p>
      </div>
    </aside>
  );
}