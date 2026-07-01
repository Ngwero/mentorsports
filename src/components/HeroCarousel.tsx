"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, CreditCard, MapPin } from "lucide-react";
import { academyPayment, heroCarouselSlides, heroSection, upcomingEvents } from "@/data/content";

const SLIDE_INTERVAL_MS = 6000;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const slideCount = heroCarouselSlides.length;
  const slide = heroCarouselSlides[activeIndex];
  const featuredEvent =
    upcomingEvents.find((event) => event.featured) ?? upcomingEvents[0];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount]
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || slideCount < 2) return;

    const timer = window.setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((current) => (current + 1) % slideCount);
      }
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [slideCount]);

  return (
    <section
      className="hero-hub-wrap"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="site-container">
        <div className="hero-hub-stage">
          <div className="hero-hub-visual">
            {heroCarouselSlides.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.imageAlt}
                className={`hero-hub-image hero-carousel-image ${
                  index === activeIndex ? "is-active" : ""
                }`}
              />
            ))}

            <div className="hero-hub-overlay" aria-hidden />

            <div key={slide.id} className="hero-hub-content animate-fade-in-up">
              <span className="hero-hub-badge">{slide.eyebrow}</span>
              <h1 className="hero-hub-title">
                {slide.title}{" "}
                {slide.titleAccent && (
                  <span className="hero-hub-title-accent">{slide.titleAccent}</span>
                )}
              </h1>
              <p className="hero-hub-subtitle">{slide.subtitle}</p>
              <div className="hero-hub-actions">
                <Link href={heroSection.cta.primary.href} className="btn-pill-accent">
                  {heroSection.cta.primary.label}
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href={slide.href ?? heroSection.cta.secondary.href}
                  className="btn-pill-light"
                >
                  {slide.href ? "Learn more" : heroSection.cta.secondary.label}
                </Link>
              </div>
            </div>

            <div className="hero-hub-controls">
              <div className="hero-hub-dots" role="tablist" aria-label="Hero slides">
                {heroCarouselSlides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => goTo(index)}
                    className={`hero-hub-dot ${index === activeIndex ? "is-active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <aside className="hero-hub-event-card">
            <Link href={featuredEvent.href} className="hero-hub-event-compact">
              <span className="hero-hub-event-compact-date">
                {new Date(featuredEvent.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <span className="hero-hub-event-compact-sep" aria-hidden />
              <span className="hero-hub-event-compact-eyebrow">Upcoming</span>
              <span className="hero-hub-event-compact-title">{featuredEvent.title}</span>
              <ArrowUpRight className="hero-hub-event-compact-icon" size={16} aria-hidden />
            </Link>

            <div className="hero-hub-event-desktop">
              <div className="hero-hub-event-header">
                <span className="hero-hub-event-label">Upcoming Event</span>
                <span className="hero-hub-event-pill">Featured</span>
              </div>

              <h2 className="hero-hub-event-title">{featuredEvent.title}</h2>

              <div className="hero-hub-event-meta">
                <span className="hero-hub-event-meta-item">
                  <CalendarDays size={14} />
                  {new Date(featuredEvent.date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="hero-hub-event-meta-item">
                  <MapPin size={14} />
                  {featuredEvent.location}
                </span>
              </div>

              <Link href={featuredEvent.href} className="hero-hub-event-cta">
                Get details
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>

          <aside className="hero-hub-fees-card">
            <a
              href={academyPayment.url}
              className="hero-hub-fees-compact"
            >
              <CreditCard className="hero-hub-fees-compact-icon" size={16} aria-hidden />
              <span className="hero-hub-fees-compact-eyebrow">Pay fees</span>
              <span className="hero-hub-fees-compact-title">
                {academyPayment.onboarding.localAmount} onboarding ·{" "}
                {academyPayment.training.amount} / session
              </span>
              <ArrowUpRight className="hero-hub-fees-compact-arrow" size={16} aria-hidden />
            </a>

            <div className="hero-hub-fees-desktop">
              <div className="hero-hub-fees-header">
                <span className="hero-hub-fees-label">Academy fees</span>
                <span className="hero-hub-fees-pill">RukaPay</span>
              </div>
              <h2 className="hero-hub-fees-title">Pay onboarding & training fees</h2>
              <ul className="hero-hub-fees-list">
                <li>
                  <strong>{academyPayment.onboarding.localAmount}</strong> — local membership /
                  onboarding
                </li>
                <li>
                  <strong>{academyPayment.onboarding.internationalAmount}</strong> — international
                  registration
                </li>
                <li>
                  <strong>{academyPayment.training.amount}</strong> — per training session
                </li>
              </ul>
              <a
                href={academyPayment.url}
                className="hero-hub-fees-cta"
              >
                Pay via {academyPayment.provider}
                <ArrowUpRight size={14} />
              </a>
              <Link href="/pricing" className="hero-hub-fees-link">
                View full pricing
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
