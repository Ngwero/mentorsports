import Link from "next/link";
import { ArrowUpRight, Heart, Shield } from "lucide-react";
import PageHero from "@/components/PageHero";
import { academyImages } from "@/data/content";
import { boosterClubContent } from "@/data/boosterClub";

export default function BoosterClubHero() {
  return (
    <>
      <PageHero
        title={boosterClubContent.title}
        subtitle={boosterClubContent.tagline}
        image={academyImages.trophyCelebration}
        category="Support the Academy"
      />

      <section className="booster-vision section-modern section-surface">
        <div className="site-container">
          <div className="booster-vision-grid">
            <div className="booster-vision-copy">
              <span className="section-eyebrow">Why give</span>
              <h2 className="section-title">Help young players reach their full potential</h2>
              <p className="section-subtitle">{boosterClubContent.vision}</p>

              <ul className="booster-focus-list">
                {boosterClubContent.focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>

              <div className="booster-vision-actions">
                <Link href="#campaigns" className="btn-pill-accent">
                  Support a Campaign
                  <ArrowUpRight size={16} />
                </Link>
                <Link href="#donate" className="btn-primary">
                  Donate Now
                </Link>
              </div>
            </div>

            <div className="booster-vision-trust card-modern p-6 md:p-8">
              <div className="flex items-start gap-3 mb-4">
                <span className="booster-icon-badge">
                  <Heart size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-lg">100% academy-focused</h3>
                  <p className="text-sm text-ms-text-muted mt-1 leading-relaxed">
                    {boosterClubContent.trustStatement}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-4 border-t border-ms-border">
                <span className="booster-icon-badge booster-icon-badge-blue">
                  <Shield size={18} />
                </span>
                <div>
                  <h3 className="font-bold">Secure & transparent</h3>
                  <p className="text-sm text-ms-text-muted mt-1 leading-relaxed">
                    Mobile Money and card payments with published impact updates for every major
                    disbursement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
