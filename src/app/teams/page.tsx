import type { Metadata } from "next";
import AcademyImage from "@/components/AcademyImage";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CarouselSection from "@/components/CarouselSection";
import ScrollReveal from "@/components/ScrollReveal";
import { teams, videos, academyImages } from "@/data/content";

export const metadata: Metadata = {
  title: "Teams | Mentor Sports International Academy",
  description:
    "Explore our age-group squads from Under 11 through to the Women's Academy.",
};

export default function TeamsPage() {
  return (
    <>
      <PageHero
        title="Our Teams"
        subtitle="Age-group squads from Under 8 through Under 18, plus our coaching team"
        image={academyImages.kisasaZoneTeam}
        category="Squads"
      />

      <section className="py-12 md:py-20 bg-ms-off-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team, index) => (
              <ScrollReveal key={team.id} animation="fade-up" delay={index * 100}>
                <div className="group rounded-2xl overflow-hidden bg-white border border-ms-border card-hover shadow-sm">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <AcademyImage
                      src={team.image}
                      alt={team.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-ms-gold text-xs font-bold uppercase tracking-widest">
                        {team.ageGroup}
                      </span>
                      <h2 className="text-2xl font-black uppercase text-white">{team.name}</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-ms-text-muted text-sm leading-relaxed mb-4">
                      {team.description}
                    </p>
                    <Link
                      href="/trials"
                      className="text-sm font-semibold text-ms-blue hover:text-ms-red transition-colors"
                    >
                      Join this squad →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal animation="blur">
        <CarouselSection
          title="Training Highlights"
          subtitle="Watch our squads in action"
          items={videos}
          variant="video"
          autoScroll
        />
      </ScrollReveal>
    </>
  );
}
