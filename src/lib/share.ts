import { absoluteUrl } from "@/lib/seo";
import { msiaSectionId, msiaTalentProgram } from "@/data/talentProgram";

export const talentProgramShareUrl = absoluteUrl(`/#${msiaSectionId}`);

export const talentProgramShareText =
  "⚽ MSIA Football Talent Identification Program — talented players aged 13–17 can be seen by European scouts at the WSH International Tournament in Kenya (8–17 Dec). Only 32 slots available!";

export const talentProgramShareMessage = `${talentProgramShareText}\n\nRegister here: ${talentProgramShareUrl}`;

export type SharePlatform =
  | "whatsapp"
  | "facebook"
  | "x"
  | "telegram"
  | "copy";

export interface ShareOption {
  id: SharePlatform;
  label: string;
  /** Lucide-free label for screen readers */
  ariaLabel: string;
}

/** Platforms most used in Uganda for sharing academy news */
export const ugandaShareOptions: ShareOption[] = [
  { id: "whatsapp", label: "WhatsApp", ariaLabel: "Share on WhatsApp" },
  { id: "facebook", label: "Facebook", ariaLabel: "Share on Facebook" },
  { id: "x", label: "X", ariaLabel: "Share on X" },
  { id: "telegram", label: "Telegram", ariaLabel: "Share on Telegram" },
  { id: "copy", label: "Copy link", ariaLabel: "Copy registration link" },
];

export function buildShareUrl(platform: SharePlatform): string {
  const text = encodeURIComponent(talentProgramShareMessage);
  const url = encodeURIComponent(talentProgramShareUrl);
  const shortText = encodeURIComponent(talentProgramShareText);

  switch (platform) {
    case "whatsapp":
      return `https://wa.me/?text=${text}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${shortText}`;
    case "x":
      return `https://twitter.com/intent/tweet?text=${shortText}&url=${url}`;
    case "telegram":
      return `https://t.me/share/url?url=${url}&text=${shortText}`;
    case "copy":
      return talentProgramShareUrl;
    default:
      return talentProgramShareUrl;
  }
}

export const talentRegistrationRecipient = "info@mentorsportsintug.com";

export const talentRegistrationEmailSubject =
  "MSIA Football Talent Identification Program — New Registration";

export interface TalentRegistrationPayload {
  playerName: string;
  parentName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  position: string;
  club: string;
  referral: string;
  message?: string;
}

export function formatTalentRegistrationEmailBody(data: TalentRegistrationPayload): string {
  return [
    "New MSIA Talent Program Registration",
    "",
    `Player's Name: ${data.playerName}`,
    `Parent / Guardian: ${data.parentName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Age: ${data.age}`,
    `Gender: ${data.gender}`,
    `Position: ${data.position}`,
    `Current Club / Academy: ${data.club}`,
    `How they heard about us: ${data.referral}`,
    "",
    "Additional Information:",
    data.message || "—",
    "",
    `Program: ${msiaTalentProgram.title}`,
    `Submitted via: ${talentProgramShareUrl}`,
  ].join("\n");
}
