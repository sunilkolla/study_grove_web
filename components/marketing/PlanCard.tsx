import Link from "next/link";
import { Check } from "lucide-react";
import type { SubscriptionPlan } from "@/data/subscriptionPlans";

type PlanCardProps = {
  plan: SubscriptionPlan;
  billing: "monthly" | "annual";
};

export function PlanCard({ plan, billing }: PlanCardProps) {
  const price =
    billing === "monthly" ? plan.monthlyPriceGbp : plan.annualPriceGbp;
  const priceLabel =
    plan.id === "FREE"
      ? "£0"
      : billing === "monthly"
        ? `£${price.toFixed(2)}/mo`
        : `£${price.toFixed(2)}/yr`;

  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 shadow-sm ${
        plan.highlighted
          ? "border-emerald-500/60 bg-white ring-2 ring-emerald-500/20 dark:border-emerald-500/40 dark:bg-[#1a2437]"
          : "border-slate-200/80 bg-white dark:border-[#2e4a73] dark:bg-[#1a2437]"
      }`}
    >
      {plan.highlighted && (
        <span className="mb-3 w-fit rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          Most popular
        </span>
      )}
      <h3 className="text-lg font-black text-slate-900 dark:text-[#f4f7fb]">
        {plan.name}
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-[#a0b9d9]">{plan.tagline}</p>
      <p className="mt-4 font-mono text-3xl font-black text-[#0F5132] dark:text-emerald-400">
        {priceLabel}
      </p>
      {billing === "annual" && plan.annualSaveLabel && plan.id !== "FREE" && (
        <p className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          {plan.annualSaveLabel}
        </p>
      )}
      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex gap-2 text-xs text-slate-700 dark:text-[#cdd9ea]"
          >
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={plan.ctaHref}
        className={`mt-6 block rounded-xl py-2.5 text-center text-xs font-bold transition-colors ${
          plan.highlighted
            ? "bg-emerald-600 text-white hover:bg-emerald-500"
            : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-[#22334d] dark:text-[#f4f7fb] dark:hover:bg-[#2e4a73]"
        }`}
      >
        {plan.ctaLabel}
      </Link>
    </div>
  );
}