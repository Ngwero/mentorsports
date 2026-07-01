import { ArrowUpRight } from "lucide-react";
import AcademyImage from "@/components/AcademyImage";
import PaymentLink from "@/components/PaymentLink";
import SectionHeader from "@/components/SectionHeader";
import {
  boosterCampaigns,
  boosterPaymentConfig,
  formatUGX,
  getCampaignProgress,
} from "@/data/boosterClub";
import { getCampaignRemaining, getRukaPayPaymentUrl } from "@/lib/boosterClub";

export default function BoosterCampaigns() {
  const activeCampaigns = boosterCampaigns.filter((campaign) => campaign.active);

  return (
    <section id="campaigns" className="section-modern w-full site-container scroll-mt-24">
      <SectionHeader
        eyebrow="Active campaigns"
        title="Choose where your support goes"
        subtitle="Every campaign is tied to a real academy need — tournaments, equipment, travel, and player welfare."
      />

      <div className="booster-campaigns-grid">
        {activeCampaigns.map((campaign) => {
          const progress = getCampaignProgress(campaign.raised, campaign.goal);
          const remaining = getCampaignRemaining(campaign);

          return (
            <article key={campaign.id} className="booster-campaign-card card-modern">
              <div className="relative aspect-[16/10] overflow-hidden">
                <AcademyImage
                  src={campaign.image}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="booster-campaign-image-overlay" />
                <span className="booster-campaign-progress-label">{progress}% funded</span>
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-lg font-black leading-snug tracking-tight">
                  {campaign.title}
                </h3>
                <p className="text-sm text-ms-text-muted mt-2 leading-relaxed">
                  {campaign.description}
                </p>

                <div className="booster-progress-track mt-5" aria-hidden>
                  <div
                    className="booster-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <dl className="booster-campaign-stats">
                  <div>
                    <dt>Goal</dt>
                    <dd>{formatUGX(campaign.goal)}</dd>
                  </div>
                  <div>
                    <dt>Raised</dt>
                    <dd className="text-ms-blue">{formatUGX(campaign.raised)}</dd>
                  </div>
                  <div>
                    <dt>Remaining</dt>
                    <dd className="text-ms-red">{formatUGX(remaining)}</dd>
                  </div>
                </dl>

                <PaymentLink
                  href={getRukaPayPaymentUrl()}
                  className="booster-campaign-donate btn-primary w-full mt-5"
                >
                  Donate via {boosterPaymentConfig.provider}
                  <ArrowUpRight size={16} />
                </PaymentLink>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
