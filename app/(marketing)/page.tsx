import { LandingFeatures } from "@/components/marketing/LandingFeatures";
import { LandingHero } from "@/components/marketing/LandingHero";
import { LandingPlansTeaser } from "@/components/marketing/LandingPlansTeaser";

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingPlansTeaser />
    </>
  );
}