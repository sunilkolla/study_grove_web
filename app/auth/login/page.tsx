import Link from "next/link";
import { Suspense } from "react";
import { AuthLayout } from "@/components/marketing/AuthLayout";
import { LoginForm } from "@/components/marketing/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to open your Practice Hub and revision dock."
      footer={
        <>
          By continuing you agree to our terms.{" "}
          <Link href="/" className="font-bold text-emerald-700 dark:text-emerald-400">
            Back to home
          </Link>
        </>
      }
    >
      <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}