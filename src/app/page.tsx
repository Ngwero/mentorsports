import HeroCarousel from "@/components/HeroCarousel";
import MovingWords from "@/components/MovingWords";
import NewsGrid from "@/components/NewsGrid";
import CarouselSection from "@/components/CarouselSection";
import GallerySection from "@/components/GallerySection";
import EventsSection from "@/components/EventsSection";
import PricingSection from "@/components/PricingSection";
import PartnershipsSection from "@/components/PartnershipsSection";
import TrialsCTA from "@/components/TrialsCTA";
import Newsletter from "@/components/Newsletter";
import VideoSection from "@/components/VideoSection";
import { programs, teams, videos } from "@/data/content";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <MovingWords />

      <div className="section-modern section-surface">
        <NewsGrid limit={5} showViewAll />
      </div>

      <div className="section-modern section-surface-alt">
        <CarouselSection
          eyebrow="Development"
          title="Our Programs"
          subtitle="Structured development for every age group"
          items={programs}
          variant="card"
          viewAllHref="/programs"
        />
      </div>

      <TrialsCTA />

      <div className="section-modern section-surface">
        <VideoSection />
      </div>

      <div className="section-modern section-surface-alt">
        <CarouselSection
          eyebrow="Highlights"
          title="Training Highlights"
          subtitle="Watch our academy in action"
          items={videos}
          variant="video"
          viewAllHref="/teams"
        />
      </div>

      <div className="section-modern section-surface">
        <CarouselSection
          eyebrow="Squads"
          title="Our Teams"
          subtitle="Age-group squads across the academy"
          items={teams.map((t) => ({
            id: t.id,
            title: t.name,
            subtitle: t.ageGroup,
            image: t.image,
          }))}
          variant="team"
          viewAllHref="/teams"
        />
      </div>

      <div className="section-modern section-surface-alt">
        <EventsSection />
      </div>

      <PricingSection />

      <GallerySection />

      <div className="section-modern section-surface-alt">
        <PartnershipsSection />
      </div>

      <Newsletter />
    </>
  );
}
