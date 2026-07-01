"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { boosterClubContent, donationTiers, formatUGX } from "@/data/boosterClub";

interface DonationTiersProps {
  onSelectAmount?: (amount: number | null) => void;
  selectedTierId?: string | null;
}

export default function DonationTiers({
  onSelectAmount,
  selectedTierId,
}: DonationTiersProps) {
  const [localSelected, setLocalSelected] = useState<string | null>(null);
  const activeId = selectedTierId ?? localSelected;

  const handleSelect = (tierId: string, amount: number | null) => {
    setLocalSelected(tierId);
    onSelectAmount?.(amount);
  };

  return (
    <section className="section-modern section-surface-alt w-full site-container">
      <SectionHeader
        eyebrow="Contribution levels"
        title="Every gift moves the academy forward"
        subtitle="Pick a tier or enter a custom amount on the donation form below."
      />

      <div className="booster-tiers-grid">
        {donationTiers.map((tier) => {
          const isSelected = activeId === tier.id;

          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => handleSelect(tier.id, tier.amount)}
              className={`booster-tier-card card-modern text-left p-5 md:p-6 ${
                isSelected ? "booster-tier-card-active" : ""
              }`}
            >
              <span className="booster-tier-amount">
                {tier.isCustom ? "Custom" : formatUGX(tier.amount ?? 0)}
              </span>
              <h3 className="font-bold text-base mt-2">{tier.label}</h3>
              <p className="text-sm text-ms-text-muted mt-2 leading-relaxed">
                {tier.description}
              </p>
            </button>
          );
        })}
      </div>

      <p className="booster-tier-note">{boosterClubContent.tierNote}</p>
    </section>
  );
}
