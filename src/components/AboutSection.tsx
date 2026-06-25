import AcademyImage from "@/components/AcademyImage";
import Link from "next/link";
import {
  siteConfig,
  academyLocations,
  academySchedule,
  academyImages,
  trainingSchedules,
} from "@/data/content";

export default function AboutSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <AcademyImage
              src={academyImages.coachTeamTalk}
              alt="Mentor Sports Academy training"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-ms-blue/20" />
          </div>

          <div>
            <span className="text-ms-gold text-xs font-bold uppercase tracking-widest">
              {siteConfig.motto}
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-2 mb-2">
              {siteConfig.slogan}
            </h2>
            <p className="text-ms-blue font-semibold text-sm mb-6">
              Get to know us
            </p>
            <p className="text-ms-text-muted leading-relaxed mb-4">
              {siteConfig.internationalPitch}
            </p>
            <p className="text-ms-text-muted leading-relaxed mb-4">
              {siteConfig.intro}
            </p>
            <p className="text-ms-text-muted leading-relaxed mb-8">
              {siteConfig.mission}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-ms-blue text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded hover:bg-ms-blue-light transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 md:p-8 rounded-2xl bg-ms-off-white border border-ms-border">
            <h3 className="text-lg font-black uppercase tracking-tight mb-4">
              Our Locations
            </h3>
            <ul className="space-y-4">
              {academyLocations.map((location) => (
                <li key={location.name}>
                  <p className="font-bold text-ms-blue">{location.name}</p>
                  <p className="text-sm text-ms-text-muted leading-relaxed mt-1">
                    {location.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-ms-off-white border border-ms-border">
            <h3 className="text-lg font-black uppercase tracking-tight mb-4">
              Training Schedule
            </h3>
            <div className="space-y-4">
              {trainingSchedules.map((block) => (
                <div key={block.id}>
                  <p className="font-bold text-ms-blue">{block.title}</p>
                  <p className="text-sm text-ms-text-muted mt-1">
                    {block.days.join(", ")} · {block.time}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-ms-text-muted leading-relaxed mt-4">
              {academySchedule.holidays}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
