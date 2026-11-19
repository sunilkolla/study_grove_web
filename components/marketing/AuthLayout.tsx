import Link from "next/link";
import { TreePine } from "lucide-react";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F5132] text-white">
              <TreePine className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-[#0F5132] dark:text-emerald-400">
              StudyGrove
            </span>
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-[#2e4a73] dark:bg-[#1a2437] sm:p-8">
          <h1 className="text-xl font-black text-slate-900 dark:text-[#f4f7fb]">{title}</h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-[#a0b9d9]">{subtitle}</p>
          <div className="mt-6">{children}</div>
          <p className="mt-6 text-center text-xs text-slate-600 dark:text-[#a0b9d9]">{footer}</p>
        </div>
      </div>
    </div>
  );
}