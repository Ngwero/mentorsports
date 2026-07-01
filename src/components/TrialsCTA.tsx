import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/content";

export default function TrialsCTA() {
  return (
    <section className="promo-banner-wrap site-container">
      <div className="promo-banner">
        <div className="promo-banner-copy">
          <span className="promo-banner-eyebrow">Join the Academy</span>
          <h2 className="promo-banner-title">
            Push your limits — book your trials today
          </h2>
          <p className="promo-banner-text">
            Open trials for talented players aged 3–17. Email{" "}
            <a href={`mailto:${siteConfig.trialsEmail}`} className="promo-banner-link">
              {siteConfig.trialsEmail}
            </a>{" "}
            or call {siteConfig.phone}.
          </p>
        </div>
        <div className="promo-banner-actions">
          <Link
            href={`mailto:${siteConfig.trialsEmail}?subject=Academy Trial Registration`}
            className="btn-pill-dark"
          >
            Register for Trials
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/programs" className="btn-pill-light-on-accent">
            View Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
