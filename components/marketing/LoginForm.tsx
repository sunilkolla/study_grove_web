"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { markDevGateAuthenticated } from "@/lib/auth/devGate";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    markDevGateAuthenticated();
    const next = searchParams.get("next");
    const dest = next && next.startsWith("/") ? next : "/dashboard";
    router.push(dest);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="login-email"
          className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-[#2e4a73] dark:bg-[#141d2e] dark:text-[#f4f7fb]"
        />
      </div>
      <div>
        <label
          htmlFor="login-password"
          className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-[#2e4a73] dark:bg-[#141d2e] dark:text-[#f4f7fb]"
        />
      </div>
      <p className="text-right text-[11px]">
        <span className="cursor-default text-slate-400 dark:text-[#6d94c3]">
          Forgot password? (coming soon)
        </span>
      </p>
      <button
        type="submit"
        className="w-full rounded-xl bg-[#1E293B] py-2.5 text-sm font-bold text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
      >
        Log in
      </button>
      <p className="text-center text-xs text-slate-600 dark:text-[#a0b9d9]">
        No account?{" "}
        <Link href="/auth/signup" className="font-bold text-emerald-700 dark:text-emerald-400">
          Sign up
        </Link>
      </p>
    </form>
  );
}