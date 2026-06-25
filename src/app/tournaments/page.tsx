import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import TournamentSection from "@/components/TournamentSection";
import CarouselSection from "@/components/CarouselSection";
import ScrollReveal from "@/components/ScrollReveal";
import { academyImages } from "@/data/content";

export const metadata: Metadata = {
  title: "Tournaments | Mentor Sports International Academy",
  description:
    "The Chipkizi Cup — East Africa's largest youth and grassroots football tournament.",
};

const tournamentVideos = [
  {
    id: 1,
    title: "Chipkizi Cup 2019 Highlights",
    duration: "8m 12s",
    image: academyImages.charityAcademyTeam,
  },
  {
    id: 2,
    title: "Final Day Action",
    duration: "5m 30s",
    image: academyImages.teamBlueGroup,
  },
  {
    id: 3,
    title: "Best Goals of the Tournament",
    duration: "3m 45s",
    image: academyImages.kisasaZoneTeam,
  },
  {
    id: 4,
    title: "Youth Celebrations",
    duration: "2m 20s",
    image: academyImages.playerPeaceSign,
  },
];

export default function TournamentsPage() {
  return (
    <>
      <PageHero
        title="Tournaments"
        subtitle="Home of the Chipkizi Cup — East Africa's premier youth football tournament"
        image={academyImages.charityAcademyTeam}
        category="Chipkizi Cup"
      />

      <ScrollReveal animation="fade-up">
        <TournamentSection />
      </ScrollReveal>

      <ScrollReveal animation="slide-left">
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
              About the Chipkizi Cup
            </h2>
            <div className="max-w-none text-ms-text-muted leading-relaxed space-y-4">
              <p>
                The Chipkizi Cup is the largest East African youth and grassroots
                football tournament in the region. Each year, the number of teams
                and participants continues to grow, bringing together young
                footballers from across the continent.
              </p>
              <p>
                In 2019, the tournament hosted 168 teams with 2,200 boys and girls
                from 4 African nations, playing over 410 games across 14 fields.
                Mentor Sports International Academy is proud to be at the heart of
                this incredible event.
              </p>
              <p>
                The tournament provides a platform for talent identification,
                competitive match experience, and celebration of grassroots
                football across East Africa.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex mt-8 bg-ms-red text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded hover:bg-ms-red-dark transition-colors"
            >
              Register Your Team
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <CarouselSection
          title="Tournament Highlights"
          subtitle="Relive the best moments from past Chipkizi Cups"
          items={tournamentVideos}
          variant="video"
        />
      </ScrollReveal>
    </>
  );
}
