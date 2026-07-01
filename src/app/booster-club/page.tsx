import type { Metadata } from "next";
import { Suspense } from "react";
import BoosterClubHero from "@/components/booster/BoosterClubHero";
import BoosterCampaigns from "@/components/booster/BoosterCampaigns";
import DonationTiers from "@/components/booster/DonationTiers";
import DonationForm from "@/components/booster/DonationForm";
import ImpactLedger from "@/components/booster/ImpactLedger";
import BoosterUpdates from "@/components/booster/BoosterUpdates";
import BoosterTrust from "@/components/booster/BoosterTrust";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Booster Club | Mentor Sports International Academy",
  description:
    "Support Mentor Sports academy campaigns — tournaments, equipment, travel, and player welfare. Donate via Mobile Money or card.",
};

function DonationFormFallback() {
  return (
    <section id="donate" className="section-modern w-full site-container scroll-mt-24">
      <div className="card-modern p-8 text-center text-ms-text-muted text-sm">
        Loading donation form…
      </div>
    </section>
  );
}

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
        <Suspense fallback={<DonationFormFallback />}>
          <DonationForm />
        </Suspense>
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
