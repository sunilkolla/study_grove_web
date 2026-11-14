type RoutePlaceholderProps = {
  title: string;
  note: string;
};

export function RoutePlaceholder({ title, note }: RoutePlaceholderProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm">
      <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">{note}</p>
    </div>
  );
}