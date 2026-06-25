import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EventsSection from "@/components/EventsSection";
import TrainingScheduleSection from "@/components/TrainingScheduleSection";
import ScrollReveal from "@/components/ScrollReveal";
import { academyImages } from "@/data/content";

export const metadata: Metadata = {
  title: "Events | Mentor Sports International Academy",
  description:
    "Upcoming academy events, training schedules, Chipkizi Cup, and open trials.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="Events & Schedule"
        subtitle="Upcoming tournaments, holiday camps, open trials, and weekly training times"
        image={academyImages.firstAidPitch}
        category="Calendar"
      />
      <ScrollReveal animation="fade-up">
        <EventsSection />
      </ScrollReveal>
      <ScrollReveal animation="slide-left">
        <TrainingScheduleSection id="schedule" />
      </ScrollReveal>
    </>
  );
}
