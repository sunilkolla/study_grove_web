export type SubscriptionPlanId = "FREE" | "PRO";

export type SubscriptionPlan = {
  id: SubscriptionPlanId;
  name: string;
  tagline: string;
  monthlyPriceGbp: number;
  annualPriceGbp: number;
  annualSaveLabel: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "FREE",
    name: "Free",
    tagline: "Start your GCSE habit streak",
    monthlyPriceGbp: 0,
    annualPriceGbp: 0,
    annualSaveLabel: "",
    features: [
      "Practice Hub & daily quiz sampler",
      "Subject flashcards (limited decks)",
      "25-minute focus timer & grove trees",
      "Revision task list in the dock",
      "AQA · Edexcel · OCR question filters",
    ],
    ctaLabel: "Sign up free",
    ctaHref: "/auth/signup",
  },
  {
    id: "PRO",
    name: "Pro",
    tagline: "Full syllabus depth for exam years",
    monthlyPriceGbp: 9.99,
    annualPriceGbp: 79.99,
    annualSaveLabel: "Save 33%",
    highlighted: true,
    features: [
      "Unlimited question bank & past-style sets",
      "SM-2 flashcards for every topic",
      "Academic year schedule & smart suggestions",
      "Mind maps & mastery tracking",
      "Priority new content & exam-board packs",
    ],
    ctaLabel: "Start Pro trial",
    ctaHref: "/auth/signup?plan=pro",
  },
];