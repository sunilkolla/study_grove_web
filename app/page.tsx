import { TreePine } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="flex items-center gap-2 rounded-xl bg-[#0F5132] px-6 py-4 text-white">
        <TreePine className="h-6 w-6" />
        <span className="font-semibold">StudyGrove ready</span>
      </div>
    </div>
  );
}