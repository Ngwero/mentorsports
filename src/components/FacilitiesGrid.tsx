import AcademyImage from "@/components/AcademyImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { programs } from "@/data/content";

export default function FacilitiesGrid() {
  const featuredPrograms = programs.slice(0, 4);

  return (
    <section className="section-modern w-full site-container">
      <SectionHeader
        eyebrow="Facilities"
        title="Experience the best in academy training at Mentor Sports"
        subtitle="Purpose-built environments for every age group, from foundation skills to elite youth pathways."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {featuredPrograms.map((program) => (
          <Link
            key={program.id}
            href={program.id === 4 ? "/trials" : "/programs"}
            className="facility-card group"
          >
            <AcademyImage
              src={program.image}
              alt={program.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
            <div className="facility-card-overlay" />
            <div className="facility-card-content">
              <h3 className="facility-card-title">{program.title}</h3>
              <p className="facility-card-text">{program.description}</p>
            </div>
            <span className="facility-card-action" aria-hidden>
              <ArrowUpRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
