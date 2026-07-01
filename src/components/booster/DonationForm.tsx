"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import {
  boosterCampaigns,
  donationTiers,
  formatUGX,
  paymentMethods,
  type BoosterPaymentMethod,
} from "@/data/boosterClub";
import { getCampaignById } from "@/lib/boosterClub";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white border border-ms-border text-ms-text text-base focus:outline-none focus:border-ms-blue focus:ring-2 focus:ring-ms-blue/10 transition-colors";
const labelClass =
  "block text-xs font-bold uppercase tracking-wider text-ms-text-muted mb-1.5";

export default function DonationForm() {
  const searchParams = useSearchParams();
  const campaignParam = searchParams.get("campaign");

  const [submitted, setSubmitted] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    campaignId: campaignParam ?? boosterCampaigns[0]?.id ?? "",
    amount: "",
    paymentMethod: "mtn" as BoosterPaymentMethod,
    anonymous: false,
    message: "",
  });

  const activeCampaigns = useMemo(
    () => boosterCampaigns.filter((campaign) => campaign.active),
    []
  );

  useEffect(() => {
    if (campaignParam && getCampaignById(activeCampaigns, campaignParam)) {
      setForm((current) => ({ ...current, campaignId: campaignParam }));
    }
  }, [campaignParam, activeCampaigns]);

  const handleTierAmount = (amount: number | null, tierId: string) => {
    setSelectedTierId(tierId);
    if (amount !== null) {
      setForm((current) => ({ ...current, amount: String(amount) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO(payment-gateway): Initiate payment via Pesapal, Flutterwave, or Yo! Payments.
    // 1. POST donation intent to /api/booster/donations with form payload
    // 2. Receive checkout URL or mobile-money STK push reference
    // 3. Redirect user to gateway or show in-app payment status
    // 4. On webhook confirmation, update campaign.raised and impact ledger in admin DB

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="donate" className="section-modern w-full site-container scroll-mt-24">
        <div className="booster-form-success card-modern p-8 md:p-10 text-center max-w-2xl mx-auto">
          <ShieldCheck size={40} className="mx-auto text-ms-blue mb-4" />
          <h2 className="text-2xl font-black tracking-tight">Thank you for your support</h2>
          <p className="text-sm text-ms-text-muted mt-3 leading-relaxed">
            Your donation request has been recorded. Payment gateway integration is coming
            soon — our team will contact you to complete your contribution via your selected
            method.
          </p>
          <p className="text-xs text-ms-text-muted mt-4">
            Reference: pending payment · Campaign:{" "}
            {getCampaignById(activeCampaigns, form.campaignId)?.title ?? "General fund"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="donate" className="section-modern w-full site-container scroll-mt-24">
      <SectionHeader
        eyebrow="Make a gift"
        title="Donation form"
        subtitle="Complete your details below. Mobile Money is recommended for the fastest experience on phone."
      />

      <div className="booster-form-layout">
        <form onSubmit={handleSubmit} className="booster-form card-modern p-5 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="donor-name">
                Donor name
              </label>
              <input
                id="donor-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                autoComplete="name"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="donor-phone">
                Phone number
              </label>
              <input
                id="donor-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                placeholder="+256 ..."
                autoComplete="tel"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="donor-email">
                Email address
              </label>
              <input
                id="donor-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                autoComplete="email"
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="donor-campaign">
                Campaign
              </label>
              <select
                id="donor-campaign"
                required
                value={form.campaignId}
                onChange={(e) => setForm({ ...form, campaignId: e.target.value })}
                className={inputClass}
              >
                {activeCampaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <span className={labelClass}>Quick amount (UGX)</span>
              <div className="booster-form-tier-row">
                {donationTiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handleTierAmount(tier.amount, tier.id)}
                    className={`booster-form-tier-btn ${
                      selectedTierId === tier.id ? "is-active" : ""
                    }`}
                  >
                    {tier.isCustom ? "Custom" : formatUGX(tier.amount ?? 0)}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="donor-amount">
                Donation amount (UGX)
              </label>
              <input
                id="donor-amount"
                type="number"
                required
                min={10000}
                step={1000}
                value={form.amount}
                onChange={(e) => {
                  setSelectedTierId(null);
                  setForm({ ...form, amount: e.target.value });
                }}
                className={inputClass}
                placeholder="e.g. 100000"
              />
            </div>

            <fieldset className="sm:col-span-2">
              <legend className={labelClass}>Payment method</legend>
              <div className="booster-payment-options">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="booster-payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={form.paymentMethod === method.id}
                      onChange={() =>
                        setForm({ ...form, paymentMethod: method.id })
                      }
                    />
                    <span className="booster-payment-option-body">
                      <span className="font-semibold text-sm">{method.label}</span>
                      <span className="text-xs text-ms-text-muted">{method.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="sm:col-span-2">
              <label className="booster-checkbox">
                <input
                  type="checkbox"
                  checked={form.anonymous}
                  onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
                />
                <span>Make my donation anonymous publicly</span>
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="donor-message">
                Message of support (optional)
              </label>
              <textarea
                id="donor-message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-y min-h-[110px]`}
                placeholder="Share an encouraging note for our players and coaches..."
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-6">
            <Send size={16} />
            Continue to payment
          </button>

          <p className="text-xs text-ms-text-muted mt-4 leading-relaxed">
            {/* TODO(payment-gateway): Replace with live checkout once Pesapal / Flutterwave / Yo! is configured */}
            Payment processing is not yet connected. Submitting records your intent and our team
            will follow up to complete payment securely.
          </p>
        </form>

        <aside className="booster-form-aside card-modern p-5 md:p-6">
          <h3 className="font-bold text-lg">Your gift at work</h3>
          <ul className="booster-form-aside-list">
            <li>UGX 50,000 — refreshments for one match day</li>
            <li>UGX 100,000 — balls and cones for a training week</li>
            <li>UGX 250,000 — local tournament transport for a squad</li>
            <li>UGX 500,000 — kit and registration for multiple players</li>
          </ul>
          <p className="text-sm text-ms-text-muted mt-4 leading-relaxed">
            Larger gifts can be multiplied across groups of players. Contact us if you would like
            to sponsor a full team or season.
          </p>
        </aside>
      </div>
    </section>
  );
}
