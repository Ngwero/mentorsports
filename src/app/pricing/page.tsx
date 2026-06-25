import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PricingSection from "@/components/PricingSection";
import ScrollReveal from "@/components/ScrollReveal";
import { academyImages } from "@/data/content";

export const metadata: Metadata = {
  title: "Pricing | Mentor Sports International Academy",
  description:
    "Academy membership fees — UGX 350,000 local, USD 100 international, UGX 20,000 per training session.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Fees & Pricing"
        subtitle="One-time registration with kit included, plus per-session training fees"
        image={academyImages.medalCeremony}
        category="Membership"
      />
      <ScrollReveal animation="fade-up">
        <PricingSection />
      </ScrollReveal>
    </>
  );
}
