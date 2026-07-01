import { ExternalLink } from "lucide-react";
import PaymentLink from "@/components/PaymentLink";
import SectionHeader from "@/components/SectionHeader";
import { boosterClubContent, donationTiers, formatUGX } from "@/data/boosterClub";
import { getRukaPayPaymentUrl } from "@/lib/boosterClub";

export default function DonationTiers() {
  const paymentUrl = getRukaPayPaymentUrl();

  return (
    <section className="section-modern section-surface-alt w-full site-container">
      <SectionHeader
        eyebrow="Contribution levels"
        title="Every gift moves the academy forward"
        subtitle="Suggested giving levels — choose your amount on the secure payment page."
      />

      <div className="booster-tiers-grid">
        {donationTiers.map((tier) => (
          <PaymentLink
            key={tier.id}
            href={paymentUrl}
            className="booster-tier-card card-modern text-left p-5 md:p-6 hover:border-ms-blue/35"
          >
            <span className="booster-tier-amount">
              {tier.isCustom ? "Custom" : formatUGX(tier.amount ?? 0)}
            </span>
            <h3 className="font-bold text-base mt-2">{tier.label}</h3>
            <p className="text-sm text-ms-text-muted mt-2 leading-relaxed">{tier.description}</p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-ms-blue">
              Pay now
              <ExternalLink size={14} />
            </span>
          </PaymentLink>
        ))}
      </div>

      <p className="booster-tier-note">{boosterClubContent.tierNote}</p>
    </section>
  );
}
