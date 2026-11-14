type RoutePlaceholderProps = {
  title: string;
  note: string;
};

export function RoutePlaceholder({ title, note }: RoutePlaceholderProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm dark:border-[#2e4a73] dark:bg-[#1a2437]/80">
      <h1 className="text-xl font-semibold text-slate-800 dark:text-[#f4f7fb]">
        {title}
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-[#a0b9d9]">{note}</p>
    </div>
  );
}