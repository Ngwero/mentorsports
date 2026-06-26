"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroCarouselSlides, heroSection } from "@/data/content";
import SocialLinks from "@/components/SocialLinks";

const SLIDE_INTERVAL_MS = 6000;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const slideCount = heroCarouselSlides.length;
  const slide = heroCarouselSlides[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount]
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

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
      className="hero-modern"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="hero-modern-grid">
        <div className="hero-modern-copy">
          <div key={slide.id} className="hero-slide-copy animate-fade-in-up">
            <div className="hero-modern-eyebrow">
              <span className="hero-modern-eyebrow-bar" aria-hidden />
              {slide.eyebrow}
            </div>

            <h1 className="hero-modern-title">
              {slide.title}{" "}
              {slide.titleAccent && (
                <span className="hero-modern-title-accent">{slide.titleAccent}</span>
              )}
            </h1>

            <p className="hero-modern-subtitle">{slide.subtitle}</p>
          </div>

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
            <Link
              href={slide.href ?? heroSection.cta.secondary.href}
              className="btn-ghost"
            >
              {slide.href ? "Learn more" : heroSection.cta.secondary.label}
            </Link>
          </div>

          <SocialLinks variant="hero-dark" className="hero-modern-social" />
        </div>

        <div className="hero-modern-visual">
          <div className="hero-modern-visual-accent" aria-hidden />
          <div className="hero-modern-image-wrap">
            {heroCarouselSlides.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.imageAlt}
                className={`hero-modern-image hero-carousel-image ${
                  index === activeIndex ? "is-active" : ""
                }`}
              />
            ))}
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

          <div className="hero-carousel-controls">
            <button
              type="button"
              onClick={goPrev}
              className="hero-carousel-nav"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="hero-carousel-dots" role="tablist" aria-label="Hero slides">
              {heroCarouselSlides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to slide ${index + 1}: ${item.eyebrow}`}
                  onClick={() => goTo(index)}
                  className={`hero-carousel-dot ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="hero-carousel-nav"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
