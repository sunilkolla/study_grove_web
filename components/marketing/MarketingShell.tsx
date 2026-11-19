import Link from "next/link";
import { TreePine } from "lucide-react";
import type { ReactNode } from "react";

type MarketingShellProps = {
  children: ReactNode;
};

export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-[#f8fafc] text-[#1a2437] dark:bg-[#141c2b] dark:text-[#f4f7fb]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f8fafc]/90 backdrop-blur-md dark:border-[#2e4a73] dark:bg-[#141c2b]/90">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F5132] text-white">
              <TreePine className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-bold">StudyGrove</span>
              <span className="hidden text-[10px] font-medium text-slate-500 dark:text-[#a0b9d9] sm:block">
                GCSE habit engine
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 dark:text-[#cdd9ea] md:flex">
            <a href="/#features" className="hover:text-[#0F5132] dark:hover:text-emerald-400">
              Features
            </a>
            <a href="/#plans" className="hover:text-[#0F5132] dark:hover:text-emerald-400">
              Plans
            </a>
            <Link href="/pricing" className="hover:text-[#0F5132] dark:hover:text-emerald-400">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:text-[#cdd9ea] dark:hover:bg-[#1a2437]"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-lg bg-[#1E293B] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200/80 bg-white py-10 dark:border-[#2e4a73] dark:bg-[#1a2437]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-bold text-[#0F5132] dark:text-emerald-400">StudyGrove</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-[#a0b9d9]">
              Prepare · Plan · Practice · Focus for UK GCSE Years 8–11.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-[#a0b9d9]">
            <Link href="/pricing" className="hover:text-emerald-600">
              Pricing
            </Link>
            <Link href="/auth/login" className="hover:text-emerald-600">
              Log in
            </Link>
            <Link href="/auth/signup" className="hover:text-emerald-600">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}