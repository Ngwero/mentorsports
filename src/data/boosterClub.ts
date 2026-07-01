import { academyImages, rukaPayPaymentUrl } from "@/data/content";

/** Admin-ready types — connect to dashboard / API later */

export interface BoosterCampaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  image: string;
  active: boolean;
}

export interface DonationTier {
  id: string;
  amount: number | null;
  label: string;
  description: string;
  isCustom?: boolean;
}

export type BoosterPaymentMethod = "mtn" | "airtel" | "card";

export interface PaymentMethodOption {
  id: BoosterPaymentMethod;
  label: string;
  description: string;
}

export interface ImpactLedgerItem {
  id: string;
  title: string;
  amount: number;
  description: string;
  date: string;
  image?: string;
}

export interface BoosterUpdate {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
}

export const boosterClubContent = {
  title: "Booster Club",
  tagline: "Fuel the next generation of footballers",
  vision:
    "Every contribution helps young players access tournaments, quality training, equipment, travel, and the exposure they need to grow. The Mentor Sports Booster Club connects supporters directly to academy projects that change lives on and off the pitch.",
  focusAreas: [
    "Tournament travel & registration",
    "Training equipment & kit",
    "Player welfare & support",
    "Match-day logistics",
    "Talent exposure opportunities",
  ],
  tierNote:
    "Donations may be multiplied depending on the number of children or players being supported. Larger gifts can sponsor squads, travel groups, or individual players for a full season.",
  trustStatement:
    "All Booster Club funds are directed toward verified academy activities. We publish impact updates so donors can see exactly how their support is used.",
};

/** Live checkout — RukaPay merchant page for Booster Club donations */
export const boosterPaymentConfig = {
  provider: "RukaPay",
  url: rukaPayPaymentUrl,
} as const;

export const boosterCampaigns: BoosterCampaign[] = [
  {
    id: "chipkizi-cup",
    title: "Road to the Chipkizi Cup",
    description:
      "Help our squads travel, register, and compete at East Africa's largest youth tournament.",
    goal: 18_000_000,
    raised: 0,
    image: academyImages.academyVictoryBanner,
    active: true,
  },
  {
    id: "equipment-drive",
    title: "Academy Equipment Drive",
    description:
      "Balls, cones, bibs, goals, and goalkeeper gear for every age group at Centenary Turf.",
    goal: 8_500_000,
    raised: 0,
    image: academyImages.fourPlayersBalls,
    active: true,
  },
  {
    id: "sponsor-player",
    title: "Sponsor a Player",
    description:
      "Cover training fees, kit, and welfare support for a talented player who needs a pathway.",
    goal: 2_500_000,
    raised: 0,
    image: academyImages.playerPortrait,
    active: true,
  },
  {
    id: "training-travel",
    title: "Training & Travel Fund",
    description:
      "Fuel buses, meals, and accommodation for away friendlies, excursions, and regional fixtures.",
    goal: 12_000_000,
    raised: 0,
    image: academyImages.teamYellowGroup,
    active: true,
  },
];

export const donationTiers: DonationTier[] = [
  {
    id: "supporter",
    amount: 50_000,
    label: "Supporter",
    description: "Helps cover match-day refreshments for one squad.",
  },
  {
    id: "team-friend",
    amount: 100_000,
    label: "Team Friend",
    description: "Supports training equipment for a single session.",
  },
  {
    id: "squad-backer",
    amount: 250_000,
    label: "Squad Backer",
    description: "Contributes to transport for local tournament travel.",
  },
  {
    id: "champion",
    amount: 500_000,
    label: "Champion",
    description: "Helps sponsor kit and registration for multiple players.",
  },
  {
    id: "custom",
    amount: null,
    label: "Custom Amount",
    description: "Choose any amount that fits your capacity to give.",
    isCustom: true,
  },
];

export const paymentMethods: PaymentMethodOption[] = [
  {
    id: "mtn",
    label: "MTN Mobile Money",
    description: "Pay via RukaPay from your MTN MoMo wallet.",
  },
  {
    id: "airtel",
    label: "Airtel Money",
    description: "Pay via RukaPay using Airtel Money on your phone.",
  },
  {
    id: "card",
    label: "Visa / Mastercard",
    description: "Pay by debit or credit card through RukaPay.",
  },
];

export const impactLedgerItems: ImpactLedgerItem[] = [
  {
    id: "transport-chipkizi",
    title: "Tournament transport support",
    amount: 3_200_000,
    description: "Team bus hire and fuel for Chipkizi Cup regional qualifiers.",
    date: "2025-11-14",
    image: academyImages.teamTrophyGroup,
  },
  {
    id: "equipment-q3",
    title: "Training equipment purchased",
    amount: 1_850_000,
    description: "Match balls, cones, agility ladders, and goalkeeper gloves.",
    date: "2025-10-02",
    image: academyImages.trainingAction,
  },
  {
    id: "welfare-fund",
    title: "Player welfare support",
    amount: 950_000,
    description: "Meals, hydration, and first-aid supplies for holiday camp players.",
    date: "2025-08-21",
    image: academyImages.playersResting,
  },
  {
    id: "match-logistics",
    title: "Match day logistics",
    amount: 720_000,
    description: "Referee fees, pitch preparation, and squad refreshments.",
    date: "2025-07-18",
    image: academyImages.goalkeeperReady,
  },
];

export const boosterUpdates: BoosterUpdate[] = [
  {
    id: "travel-update",
    title: "U15 squad departs for regional qualifiers",
    excerpt:
      "Thanks to Booster Club donors, our U15 boys travelled safely to Jinja for their opening Chipkizi qualifiers.",
    date: "2025-11-10",
    category: "Team Travel",
    image: academyImages.teamBlueGroup,
  },
  {
    id: "equipment-delivery",
    title: "New training balls delivered to Centenary Turf",
    excerpt:
      "Fifty match balls and goalkeeper kits arrived this week — every squad is training with fresh equipment.",
    date: "2025-10-05",
    category: "Equipment",
    image: academyImages.fourPlayersBalls,
  },
  {
    id: "donor-thanks",
    title: "Thank you to our September supporters",
    excerpt:
      "We recognised 24 donors who helped us close the gap on our equipment drive. Your belief in our players matters.",
    date: "2025-09-30",
    category: "Thank You",
    image: academyImages.medalCeremony,
  },
  {
    id: "player-story",
    title: "From trials to tournament squad",
    excerpt:
      "Booster Club travel support helped Brian join his first away tournament — and earn a starting role in midfield.",
    date: "2025-09-12",
    category: "Player Story",
    image: academyImages.playerPortrait,
  },
];

export function formatUGX(amount: number): string {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCampaignProgress(raised: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}
