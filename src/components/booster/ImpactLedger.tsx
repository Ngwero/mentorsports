import AcademyImage from "@/components/AcademyImage";
import SectionHeader from "@/components/SectionHeader";
import { formatUGX, impactLedgerItems } from "@/data/boosterClub";

export default function ImpactLedger() {
  return (
    <section id="impact" className="section-modern section-surface-alt w-full site-container scroll-mt-24">
      <SectionHeader
        eyebrow="Transparency"
        title="Impact ledger"
        subtitle="A clear record of how Booster Club funds have been used to support academy activities."
      />

      <div className="booster-impact-grid">
        {impactLedgerItems.map((item) => (
          <article key={item.id} className="booster-impact-card card-modern overflow-hidden">
            <div className="relative aspect-[16/9] bg-ms-gray">
              {item.image ? (
                <AcademyImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 booster-impact-placeholder" />
              )}
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <time className="text-xs font-semibold text-ms-text-muted">
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <span className="text-sm font-black text-ms-blue">
                  {formatUGX(item.amount)}
                </span>
              </div>
              <h3 className="font-bold leading-snug">{item.title}</h3>
              <p className="text-sm text-ms-text-muted mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
