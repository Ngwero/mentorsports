"use client";

import { useCallback, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import {
  buildShareUrl,
  type SharePlatform,
  ugandaShareOptions,
} from "@/lib/share";

interface ShareProgramProps {
  className?: string;
  compact?: boolean;
}

const platformIcons: Record<SharePlatform, string> = {
  whatsapp: "WA",
  facebook: "f",
  x: "X",
  telegram: "TG",
  copy: "⎘",
};

export default function ShareProgram({ className = "", compact = false }: ShareProgramProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async (platform: SharePlatform) => {
    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(buildShareUrl("copy"));
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        window.prompt("Copy this link:", buildShareUrl("copy"));
      }
      return;
    }

    window.open(buildShareUrl(platform), "_blank", "noopener,noreferrer");
  }, []);

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: "MSIA Football Talent Identification Program",
        text: "European scout exposure for players aged 13–17. Limited slots!",
        url: buildShareUrl("copy"),
      });
    } catch {
      // User cancelled or share failed
    }
  }, []);

  return (
    <div className={`share-program ${compact ? "share-program-compact" : ""} ${className}`}>
      <div className="share-program-header">
        <Share2 size={16} aria-hidden />
        <span>Share with parents & players</span>
      </div>

      <div className="share-program-buttons">
        {ugandaShareOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleShare(option.id)}
            className={`share-program-btn share-program-btn-${option.id}`}
            aria-label={option.ariaLabel}
          >
            <span className="share-program-btn-icon" aria-hidden>
              {option.id === "copy" && copied ? <Check size={14} /> : platformIcons[option.id]}
            </span>
            <span className="share-program-btn-label">
              {option.id === "copy" && copied ? "Copied!" : option.label}
            </span>
          </button>
        ))}

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="share-program-btn share-program-btn-native"
            aria-label="Share using your device"
          >
            <Link2 size={14} aria-hidden />
            <span className="share-program-btn-label">More</span>
          </button>
        )}
      </div>
    </div>
  );
}
