import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { heroSection } from "@/data/content";
import SocialLinks from "@/components/SocialLinks";

export default function HeroCarousel() {
  return (
    <section className="hero-modern">
      <div className="hero-modern-grid">
        <div className="hero-modern-copy">
          <div className="hero-modern-eyebrow">
            <span className="hero-modern-eyebrow-bar" aria-hidden />
            {heroSection.eyebrow}
          </div>

          <h1 className="hero-modern-title">
            {heroSection.title}{" "}
            <span className="hero-modern-title-accent">{heroSection.titleAccent}</span>
          </h1>

          <p className="hero-modern-subtitle">{heroSection.subtitle}</p>

          <div className="hero-modern-stats">
            {heroSection.stats.map((stat) => (
              <div key={stat.label} className="hero-modern-stat">
                <span className="hero-modern-stat-value">{stat.value}</span>
                <span className="hero-modern-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-modern-actions">
            <Link href={heroSection.cta.primary.href} className="btn-primary">
              {heroSection.cta.primary.label}
              <ChevronRight size={16} />
            </Link>
            <Link href={heroSection.cta.secondary.href} className="btn-ghost">
              {heroSection.cta.secondary.label}
            </Link>
          </div>

          <SocialLinks variant="hero-dark" className="hero-modern-social" />
        </div>

        <div className="hero-modern-visual">
          <div className="hero-modern-visual-accent" aria-hidden />
          <div className="hero-modern-image-wrap">
            <img
              src={heroSection.image}
              alt={heroSection.imageAlt}
              className="hero-modern-image"
            />
            <div className="hero-modern-image-shade" aria-hidden />
          </div>

          <div className="hero-modern-pills">
            {heroSection.highlights.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`hero-modern-pill hero-modern-pill-${index + 1}`}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
