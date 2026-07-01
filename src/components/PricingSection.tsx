import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { academyPayment, pricing } from "@/data/content";

export default function PricingSection() {
  return (
    <section className="section-modern section-surface w-full site-container">
      <SectionHeader
        eyebrow="Membership & Fees"
        title="Academy Pricing"
        subtitle="Transparent one-time registration and per-session training fees for local and international families."
        className="text-center !items-center [&_.max-w-2xl]:mx-auto [&_.section-subtitle]:mx-auto"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {pricing.membership.map((tier) => (
          <div
            key={tier.id}
            className={`flex flex-col h-full rounded-2xl border p-6 lg:p-8 ${
              tier.highlight
                ? "border-ms-blue bg-white shadow-lg ring-2 ring-ms-blue/15"
                : "border-ms-border bg-white"
            }`}
          >
            <div className="min-h-7 mb-1">
              {tier.highlight && (
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-ms-blue">
                  Most Popular
                </span>
              )}
            </div>

            <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight leading-tight min-h-[3.5rem] flex items-end">
              {tier.title}
            </h3>

            <p className="text-sm text-ms-text-muted mt-3 min-h-[2.75rem] leading-relaxed">
              {tier.description}
            </p>

            <div className="mt-6 pt-6 border-t border-ms-border">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-bold text-ms-text-muted">{tier.currency}</span>
                <span className="text-3xl lg:text-4xl font-black text-ms-red leading-none">
                  {tier.amount}
                </span>
              </div>
              <p className="text-sm text-ms-text-muted mt-2">{tier.period}</p>
            </div>

            {tier.includes && (
              <ul className="mt-6 space-y-2.5 flex-1">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-ms-text-muted"
                  >
                    <Check size={16} className="text-ms-blue shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <a
              href={academyPayment.url}
              className="inline-flex items-center justify-center gap-2 mt-6 w-full border border-ms-blue text-ms-blue px-5 py-2.5 font-bold text-sm rounded-xl hover:bg-ms-blue hover:text-white transition-colors"
            >
              Pay onboarding fee
              <ExternalLink size={14} />
            </a>
          </div>
        ))}

        <div className="flex flex-col h-full rounded-2xl border border-ms-border bg-ms-off-white p-6 lg:p-8">
          <div className="min-h-7 mb-1" />

          <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight leading-tight min-h-[3.5rem] flex items-end">
            Training Sessions
          </h3>

          <p className="text-sm text-ms-text-muted mt-3 min-h-[2.75rem] leading-relaxed">
            {pricing.sessionFee.note}
          </p>

          <div className="mt-6 pt-6 border-t border-ms-border">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm font-bold text-ms-text-muted">
                {pricing.sessionFee.currency}
              </span>
              <span className="text-3xl lg:text-4xl font-black text-ms-text leading-none">
                {pricing.sessionFee.amount}
              </span>
            </div>
            <p className="text-sm text-ms-text-muted mt-2">{pricing.sessionFee.label}</p>
          </div>

          <div className="mt-6 flex-1 flex flex-col justify-end">
            <p className="text-xs text-ms-text-muted leading-relaxed">
              {academyPayment.referenceNote}
            </p>
            <Link
              href="/trials"
              className="inline-flex justify-center mt-4 w-full bg-ms-red text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-xl hover:bg-ms-red-dark transition-colors"
            >
              Register Now
            </Link>
            <a
              href={academyPayment.url}
              className="inline-flex items-center justify-center gap-2 mt-3 w-full border border-ms-blue text-ms-blue px-6 py-3 font-bold text-sm rounded-xl hover:bg-ms-blue hover:text-white transition-colors"
            >
              Pay training fees
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 card-modern p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg">Pay membership & onboarding online</h3>
          <p className="text-sm text-ms-text-muted mt-1 leading-relaxed max-w-2xl">
            {pricing.paymentNote}
          </p>
        </div>
        <a
          href={academyPayment.url}
          className="inline-flex items-center justify-center gap-2 shrink-0 bg-ms-blue text-white px-6 py-3 font-bold text-sm rounded-xl hover:bg-ms-blue-dark transition-colors"
        >
          Pay via {academyPayment.provider}
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}
