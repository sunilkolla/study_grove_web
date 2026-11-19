import Link from "next/link";
import { SUBSCRIPTION_PLANS } from "@/data/subscriptionPlans";
import { PlanCard } from "./PlanCard";

export function LandingPlansTeaser() {
  return (
    <section id="plans" className="border-t border-slate-200/80 bg-slate-50/50 px-4 py-16 dark:border-[#2e4a73] dark:bg-[#1a2437]/40 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-2xl font-black text-slate-900 dark:text-[#f4f7fb]">
          Simple subscription plans
        </h2>
        <p className="mb-10 text-center text-sm text-slate-600 dark:text-[#a0b9d9]">
          Start free, upgrade when you need full syllabus depth. No card required to try.
        </p>
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing="monthly" />
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link
            href="/pricing"
            className="text-sm font-bold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
          >
            Compare monthly vs annual pricing →
          </Link>
        </p>
      </div>
    </section>
  );
}