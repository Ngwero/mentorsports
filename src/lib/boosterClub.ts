import type { BoosterCampaign } from "@/data/boosterClub";
import { boosterPaymentConfig, formatUGX, getCampaignProgress } from "@/data/boosterClub";

export { formatUGX, getCampaignProgress };

export function getRukaPayPaymentUrl(): string {
  return boosterPaymentConfig.url;
}

export interface DonationIntent {
  name: string;
  phone: string;
  email: string;
  campaignId: string;
  campaignTitle: string;
  amount: string;
  paymentMethod: string;
  anonymous: boolean;
  message: string;
  submittedAt: string;
}

const DONATION_INTENT_KEY = "ms-booster-donation-intent";

/** Saved locally so donors can reference campaign/details on the RukaPay checkout page */
export function saveDonationIntent(intent: DonationIntent): void {
  try {
    sessionStorage.setItem(DONATION_INTENT_KEY, JSON.stringify(intent));
  } catch {
    // Ignore storage errors — checkout still proceeds
  }
}

export function getCampaignRemaining(campaign: BoosterCampaign): number {
  return Math.max(0, campaign.goal - campaign.raised);
}

export function getCampaignById(
  campaigns: BoosterCampaign[],
  id: string
): BoosterCampaign | undefined {
  return campaigns.find((campaign) => campaign.id === id);
}
