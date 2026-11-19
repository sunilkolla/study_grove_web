"use client";

import { useState } from "react";
import { SUBSCRIPTION_PLANS } from "@/data/subscriptionPlans";
import { PlanCard } from "./PlanCard";

export function PricingPageClient() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-[#f4f7fb]">
          Subscription plans
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-[#a0b9d9]">
          Free to start. Upgrade to Pro when you want the full question bank and schedule tools.
        </p>
        <div className="mt-8 inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-[#2e4a73] dark:bg-[#1a2437]">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
              billing === "monthly"
                ? "bg-emerald-600 text-white"
                : "text-slate-600 dark:text-[#a0b9d9]"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("annual")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
              billing === "annual"
                ? "bg-emerald-600 text-white"
                : "text-slate-600 dark:text-[#a0b9d9]"
            }`}
          >
            Annual
          </button>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left md:grid-cols-2">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>
        <p className="mt-10 text-xs text-slate-500 dark:text-[#a0b9d9]">
          Payments and Stripe checkout ship in a later release. Prices shown for planning only.
        </p>
      </div>
    </div>
  );
}