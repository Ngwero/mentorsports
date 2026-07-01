import Link from "next/link";
import { Lock, Mail, Phone, Shield, Users } from "lucide-react";
import PaymentLink from "@/components/PaymentLink";
import { siteConfig } from "@/data/content";
import { boosterClubContent, boosterPaymentConfig } from "@/data/boosterClub";

export default function BoosterTrust() {
  return (
    <section className="section-modern section-surface w-full site-container">
      <div className="booster-trust-grid">
        <div className="booster-trust-card card-modern p-6 md:p-8">
          <Shield size={22} className="text-ms-blue mb-3" />
          <h3 className="font-bold text-lg">Secure payments</h3>
          <p className="text-sm text-ms-text-muted mt-2 leading-relaxed">
            Donations are processed securely through{" "}
            <PaymentLink
              href={boosterPaymentConfig.url}
              className="text-ms-blue font-semibold hover:underline"
            >
              {boosterPaymentConfig.provider}
            </PaymentLink>
            . Mobile Money and card details are handled on their encrypted checkout page.
          </p>
        </div>

        <div className="booster-trust-card card-modern p-6 md:p-8">
          <Users size={22} className="text-ms-red mb-3" />
          <h3 className="font-bold text-lg">Donor privacy</h3>
          <p className="text-sm text-ms-text-muted mt-2 leading-relaxed">
            Choose to give anonymously on the public donor roll. Personal contact details are
            used only for receipts, thank-you messages, and payment confirmation.
          </p>
        </div>

        <div className="booster-trust-card card-modern p-6 md:p-8">
          <Lock size={22} className="text-ms-gold mb-3" />
          <h3 className="font-bold text-lg">Accountability</h3>
          <p className="text-sm text-ms-text-muted mt-2 leading-relaxed">
            {boosterClubContent.trustStatement} Major disbursements are listed in our impact
            ledger above.
          </p>
        </div>
      </div>

      <div className="booster-trust-contact card-modern p-6 md:p-8 mt-6">
        <h3 className="font-bold text-lg">Questions about giving?</h3>
        <p className="text-sm text-ms-text-muted mt-2 leading-relaxed max-w-2xl">
          Reach our team for campaign details, corporate sponsorship, or multi-player support
          packages. All funds support verified Mentor Sports academy activities.
        </p>
        <ul className="booster-trust-contact-list">
          <li>
            <Mail size={16} className="text-ms-red" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-ms-blue transition-colors">
              {siteConfig.email}
            </a>
          </li>
          <li>
            <Phone size={16} className="text-ms-red" />
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="hover:text-ms-blue transition-colors"
            >
              {siteConfig.phone}
            </a>
          </li>
        </ul>
        <Link href="/contact" className="inline-flex text-sm font-semibold text-ms-gold hover:text-ms-red transition-colors mt-4">
          Contact the academy →
        </Link>
      </div>
    </section>
  );
}
