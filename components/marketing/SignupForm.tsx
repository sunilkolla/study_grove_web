"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { markDevGateAuthenticated } from "@/lib/auth/devGate";
import type { ExamBoard, YearGroup } from "@/types";

const YEAR_GROUPS: YearGroup[] = ["Year 8", "Year 9", "Year 10", "Year 11"];
const EXAM_BOARDS: ExamBoard[] = ["AQA", "EDEXCEL", "OCR"];

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planHint = searchParams.get("plan");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [yearGroup, setYearGroup] = useState<YearGroup>("Year 10");
  const [examBoard, setExamBoard] = useState<ExamBoard>("AQA");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    markDevGateAuthenticated();
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {planHint === "pro" && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          You chose Pro — billing connects in a later release.
        </p>
      )}
      <div>
        <label
          htmlFor="signup-name"
          className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]"
        >
          Name
        </label>
        <input
          id="signup-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-[#2e4a73] dark:bg-[#141d2e] dark:text-[#f4f7fb]"
        />
      </div>
      <div>
        <label
          htmlFor="signup-email"
          className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]"
        >
          Email
        </label>
        <input
          id="signup-email"
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
          htmlFor="signup-password"
          className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]"
        >
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-[#2e4a73] dark:bg-[#141d2e] dark:text-[#f4f7fb]"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="signup-year"
            className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]"
          >
            Year group
          </label>
          <select
            id="signup-year"
            value={yearGroup}
            onChange={(e) => setYearGroup(e.target.value as YearGroup)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-[#2e4a73] dark:bg-[#141d2e] dark:text-[#f4f7fb]"
          >
            {YEAR_GROUPS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="signup-board"
            className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-[#a0b9d9]"
          >
            Exam board
          </label>
          <select
            id="signup-board"
            value={examBoard}
            onChange={(e) => setExamBoard(e.target.value as ExamBoard)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm dark:border-[#2e4a73] dark:bg-[#141d2e] dark:text-[#f4f7fb]"
          >
            {EXAM_BOARDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white hover:bg-emerald-500"
      >
        Create account
      </button>
      <p className="text-center text-xs text-slate-600 dark:text-[#a0b9d9]">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-bold text-emerald-700 dark:text-emerald-400">
          Log in
        </Link>
      </p>
    </form>
  );
}