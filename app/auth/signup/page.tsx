import Link from "next/link";
import { Suspense } from "react";
import { AuthLayout } from "@/components/marketing/AuthLayout";
import { SignupForm } from "@/components/marketing/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free tier included — set your year and board in the app after signup."
      footer={
        <>
          <Link href="/pricing" className="font-bold text-emerald-700 dark:text-emerald-400">
            Compare plans
          </Link>{" "}
          ·{" "}
          <Link href="/" className="font-bold text-emerald-700 dark:text-emerald-400">
            Home
          </Link>
        </>
      }
    >
      <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}