import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { boosterPaymentConfig } from "@/data/boosterClub";
import { getRukaPayPaymentUrl } from "@/lib/boosterClub";

export default function DonationPaySection() {
  const paymentUrl = getRukaPayPaymentUrl();

  return (
    <section id="donate" className="section-modern w-full site-container scroll-mt-24">
      <div className="booster-pay-panel card-modern p-6 md:p-8 text-center max-w-2xl mx-auto">
        <SectionHeader
          eyebrow="Ready to give"
          title="Go to secure payment"
          subtitle={`Tap below to open ${boosterPaymentConfig.provider} and pay with Mobile Money or card.`}
          className="!items-center [&_.max-w-2xl]:mx-auto [&_.section-subtitle]:mx-auto"
        />
        <a href={paymentUrl} className="btn-primary w-full sm:w-auto inline-flex">
          Pay via {boosterPaymentConfig.provider}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
