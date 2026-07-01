import type { BoosterCampaign } from "@/data/boosterClub";
import { formatUGX, getCampaignProgress } from "@/data/boosterClub";

export { formatUGX, getCampaignProgress };

export function getCampaignRemaining(campaign: BoosterCampaign): number {
  return Math.max(0, campaign.goal - campaign.raised);
}

export function getCampaignById(
  campaigns: BoosterCampaign[],
  id: string
): BoosterCampaign | undefined {
  return campaigns.find((campaign) => campaign.id === id);
}
