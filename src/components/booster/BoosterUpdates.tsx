import AcademyImage from "@/components/AcademyImage";
import SectionHeader from "@/components/SectionHeader";
import { boosterUpdates } from "@/data/boosterClub";

export default function BoosterUpdates() {
  return (
    <section id="updates" className="section-modern w-full site-container scroll-mt-24">
      <SectionHeader
        eyebrow="Updates"
        title="Booster Club news"
        subtitle="Travel updates, equipment deliveries, donor thank-yous, and player stories from the academy."
      />

      <div className="booster-updates-grid">
        {boosterUpdates.map((update) => (
          <article key={update.id} className="booster-update-card card-modern overflow-hidden">
            {update.image && (
              <div className="relative aspect-[16/10]">
                <AcademyImage
                  src={update.image}
                  alt={update.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="booster-update-category">{update.category}</span>
                <time className="text-xs text-ms-text-muted">
                  {new Date(update.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h3 className="font-bold leading-snug">{update.title}</h3>
              <p className="text-sm text-ms-text-muted mt-2 leading-relaxed">{update.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
