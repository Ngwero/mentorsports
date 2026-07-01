import type { Metadata } from "next";
import BoosterClubHero from "@/components/booster/BoosterClubHero";
import BoosterCampaigns from "@/components/booster/BoosterCampaigns";
import DonationTiers from "@/components/booster/DonationTiers";
import DonationPaySection from "@/components/booster/DonationPaySection";
import ImpactLedger from "@/components/booster/ImpactLedger";
import BoosterUpdates from "@/components/booster/BoosterUpdates";
import BoosterTrust from "@/components/booster/BoosterTrust";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Booster Club | Mentor Sports International Academy",
  description:
    "Support Mentor Sports academy campaigns — tournaments, equipment, travel, and player welfare. Donate via Mobile Money or card.",
};

export default function BoosterClubPage() {
  return (
    <>
      <BoosterClubHero />

      <ScrollReveal>
        <BoosterCampaigns />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <DonationTiers />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <DonationPaySection />
      </ScrollReveal>

      <ScrollReveal>
        <ImpactLedger />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <BoosterUpdates />
      </ScrollReveal>

      <ScrollReveal>
        <BoosterTrust />
      </ScrollReveal>
    </>
  );
}
