import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import LeadershipSection from "@/components/LeadershipSection";
import ScrollReveal from "@/components/ScrollReveal";
import { academyImages } from "@/data/content";

export const metadata: Metadata = createMetadata({
  title: "Leadership",
  description:
    "Meet the leadership team and organogram of Mentor Sports International Academy.",
  path: "/leadership",
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        title="Leadership"
        subtitle="Academy governance, coaching leadership, and operations"
        image={academyImages.leadershipOnPitch}
        category="Our Team"
      />
      <ScrollReveal animation="fade-up">
        <LeadershipSection />
      </ScrollReveal>
    </>
  );
}
