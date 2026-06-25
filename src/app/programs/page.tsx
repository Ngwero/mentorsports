import type { Metadata } from "next";
import AcademyImage from "@/components/AcademyImage";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PricingSection from "@/components/PricingSection";
import TrainingScheduleSection from "@/components/TrainingScheduleSection";
import ScrollReveal from "@/components/ScrollReveal";
import { programs, siteConfig, academyImages } from "@/data/content";

export const metadata: Metadata = {
  title: "Programs | Mentor Sports International Academy",
  description:
    "Holiday programs, youth development, and academy trials for players aged 3–18+.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Our Programs"
        subtitle="Structured, age-appropriate football development with no limit on potential"
        image={academyImages.trainingAction}
        category="Development"
      />

      <section className="py-12 md:py-16 bg-white border-b border-ms-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-ms-gold text-xs font-bold uppercase tracking-widest">
            Soccer Without Borders
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-2 mb-4">
            {siteConfig.motto}
          </h2>
          <p className="text-ms-text-muted leading-relaxed mb-4">
            {siteConfig.programSummary}
          </p>
          <p className="text-ms-text-muted leading-relaxed">
            {siteConfig.philosophy}
          </p>
        </div>
      </section>

      <ScrollReveal animation="fade-up">
        <PricingSection />
      </ScrollReveal>

      <ScrollReveal animation="slide-left">
        <TrainingScheduleSection />
      </ScrollReveal>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {programs.map((program, index) => (
            <ScrollReveal
              key={program.id}
              animation={index % 2 === 0 ? "slide-left" : "slide-right"}
              delay={index * 80}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  index % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg lg:[direction:ltr]">
                  <AcademyImage
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="lg:[direction:ltr]">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                    {program.title}
                  </h2>
                  <p className="text-ms-text-muted leading-relaxed mb-6">
                    {program.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="bg-ms-off-white border border-ms-border px-4 py-2 rounded-lg text-sm">
                      <span className="text-ms-text-muted">Ages: </span>
                      <span className="font-semibold">{program.ages}</span>
                    </span>
                    <span className="bg-ms-off-white border border-ms-border px-4 py-2 rounded-lg text-sm">
                      <span className="text-ms-text-muted">Schedule: </span>
                      <span className="font-semibold">{program.schedule}</span>
                    </span>
                  </div>
                  <Link
                    href={program.id === 4 ? "/trials" : "/contact"}
                    className="inline-flex items-center gap-2 bg-ms-red text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded hover:bg-ms-red-dark transition-colors"
                  >
                    {program.cta}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
