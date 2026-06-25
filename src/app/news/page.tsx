import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsGrid from "@/components/NewsGrid";
import Newsletter from "@/components/Newsletter";
import ScrollReveal from "@/components/ScrollReveal";
import { academyImages } from "@/data/content";

export const metadata: Metadata = {
  title: "News | Mentor Sports International Academy",
  description: "Latest news, updates, and stories from Mentor Sports International Academy.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="News"
        subtitle="The latest articles, updates, and stories from the academy"
        image={academyImages.medalCeremony}
        category="Academy"
      />
      <ScrollReveal animation="fade-up">
        <NewsGrid />
      </ScrollReveal>
      <ScrollReveal animation="blur">
        <Newsletter />
      </ScrollReveal>
    </>
  );
}
