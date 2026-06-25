import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AboutSection from "@/components/AboutSection";
import CoreValues from "@/components/CoreValues";
import GettingStarted from "@/components/GettingStarted";
import PartnershipsSection from "@/components/PartnershipsSection";
import ScrollReveal from "@/components/ScrollReveal";
import { academyImages } from "@/data/content";

export const metadata: Metadata = {
  title: "About | Mentor Sports International Academy",
  description:
    "Learn about Mentor Sports International Academy — Uganda's UYFA-registered youth football academy since 2008.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Who We Are"
        subtitle="Mentoring future professional footballers since 2008"
        image={academyImages.teamBlueGroup}
        category="Academy"
      />
      <ScrollReveal animation="fade-up">
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal animation="scale">
        <CoreValues />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <GettingStarted />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <PartnershipsSection id="partnerships" />
      </ScrollReveal>
    </>
  );
}
