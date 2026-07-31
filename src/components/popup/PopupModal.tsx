"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import ShareProgram from "@/components/ShareProgram";
import { talentPopupContent } from "@/data/talentProgram";

interface PopupModalProps {
  open: boolean;
  dontShowAgain: boolean;
  onDontShowAgainChange: (checked: boolean) => void;
  onClose: () => void;
  onRegister: () => void;
  onLearnMore: () => void;
}

export default function PopupModal({
  open,
  dontShowAgain,
  onDontShowAgainChange,
  onClose,
  onRegister,
  onLearnMore,
}: PopupModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="popup-overlay popup-overlay-visible"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="popup-promo-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="msia-popup-title"
        aria-describedby="msia-popup-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-promo-accent" aria-hidden />

        <button
          type="button"
          onClick={onClose}
          className="popup-close"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        <div className="popup-promo-body">
          <span className="popup-eyebrow">MSIA Football Talent Identification</span>

          <h2 id="msia-popup-title" className="popup-promo-title">
            <span className="popup-live-dot" aria-hidden />
            {talentPopupContent.headline}
          </h2>

          <p id="msia-popup-desc" className="popup-promo-subtitle">
            {talentPopupContent.subheadline}
          </p>

          <div className="popup-highlight-box">
            <p>{talentPopupContent.highlight}</p>
          </div>

          <ul className="popup-bullet-list">
            {talentPopupContent.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="popup-promo-actions">
            <button type="button" onClick={onRegister} className="popup-btn-primary">
              {talentPopupContent.primaryCta}
              <ArrowUpRight size={16} />
            </button>
            <button type="button" onClick={onLearnMore} className="popup-btn-secondary">
              {talentPopupContent.secondaryCta}
            </button>
          </div>

          <ShareProgram compact className="popup-share" />

          <label className="popup-dont-show">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => onDontShowAgainChange(e.target.checked)}
            />
            <span>{talentPopupContent.dontShowLabel}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
