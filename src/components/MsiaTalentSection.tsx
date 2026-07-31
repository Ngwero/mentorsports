"use client";

import { ArrowUpRight } from "lucide-react";
import ShareProgram from "@/components/ShareProgram";
import { msiaSectionId, msiaTalentProgram } from "@/data/talentProgram";

interface MsiaTalentSectionProps {
  onRegister?: () => void;
}

export default function MsiaTalentSection({ onRegister }: MsiaTalentSectionProps) {
  const handleRegister = () => {
    if (onRegister) {
      onRegister();
      return;
    }
    window.dispatchEvent(new CustomEvent("msia:open-registration"));
  };

  return (
    <section
      id={msiaSectionId}
      className="msia-talent-section section-modern w-full site-container scroll-mt-24"
    >
      <div className="msia-talent-card">
        <div className="msia-talent-accent" aria-hidden />

        <div className="msia-talent-grid">
          <div className="msia-talent-copy">
            <span className="popup-eyebrow">{msiaTalentProgram.eyebrow}</span>
            <h2 className="msia-talent-title">{msiaTalentProgram.title}</h2>
            <p className="msia-talent-subtitle">{msiaTalentProgram.subtitle}</p>

            <div className="popup-highlight-box msia-talent-highlight">
              <span className="popup-highlight-flag" aria-hidden>
                🇩🇪
              </span>
              <p>{msiaTalentProgram.highlight}</p>
            </div>

            <ul className="popup-bullet-list msia-talent-bullets">
              {msiaTalentProgram.bullets.map((item) => (
                <li key={item}>
                  <span className="popup-bullet-check" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="msia-talent-actions">
              <button type="button" onClick={handleRegister} className="popup-btn-primary">
                {msiaTalentProgram.ctaPrimary}
                <ArrowUpRight size={16} />
              </button>
            </div>

            <ShareProgram className="msia-talent-share" />
          </div>

          <aside className="msia-talent-stats" aria-label="Program details">
            <div className="msia-stat-card">
              <span className="msia-stat-label">Age range</span>
              <strong>{msiaTalentProgram.ageRange}</strong>
            </div>
            <div className="msia-stat-card">
              <span className="msia-stat-label">Selected players</span>
              <strong>Only {msiaTalentProgram.slots}</strong>
            </div>
            <div className="msia-stat-card">
              <span className="msia-stat-label">Tournament dates</span>
              <strong>{msiaTalentProgram.dates}</strong>
            </div>
            <div className="msia-stat-card">
              <span className="msia-stat-label">Location</span>
              <strong>{msiaTalentProgram.location}</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
