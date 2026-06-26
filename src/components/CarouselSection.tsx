"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AcademyImage from "@/components/AcademyImage";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import VideoModal from "@/components/VideoModal";
import VideoPlayButton from "@/components/VideoPlayButton";
import { getYoutubeId } from "@/lib/youtube";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  subtitle?: string;
  duration?: string;
  cta?: string;
  youtubeUrl?: string;
}

interface CarouselSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: CarouselItem[];
  variant?: "video" | "card" | "team";
  viewAllHref?: string;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

export default function CarouselSection({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  variant = "card",
  viewAllHref,
  autoScroll = false,
  autoScrollInterval = 4500,
}: CarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [activeVideo, setActiveVideo] = useState<{
    videoId: string;
    title: string;
    youtubeUrl: string;
  } | null>(null);

  const openVideo = useCallback((item: CarouselItem) => {
    if (!item.youtubeUrl) return;

    const videoId = getYoutubeId(item.youtubeUrl);
    if (!videoId) return;

    setActiveVideo({
      videoId,
      title: item.title,
      youtubeUrl: item.youtubeUrl,
    });
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!autoScroll || items.length < 2) return;

    const container = scrollRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const getStep = () => {
      const firstCard = container.querySelector<HTMLElement>("[data-carousel-item]");
      if (!firstCard) return container.offsetWidth * 0.75;
      const gap = parseFloat(getComputedStyle(container).columnGap || "16") || 16;
      return firstCard.offsetWidth + gap;
    };

    const timer = window.setInterval(() => {
      if (pausedRef.current || !scrollRef.current) return;

      const el = scrollRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const step = getStep();
      if (el.scrollLeft >= maxScroll - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, autoScrollInterval);

    return () => window.clearInterval(timer);
  }, [autoScroll, autoScrollInterval, items.length]);

  return (
    <section id={id} className="w-full">
      <div className="site-container">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          action={
            <div className="flex items-center gap-2">
              {viewAllHref && (
                <Link
                  href={viewAllHref}
                  className="hidden sm:inline-flex text-sm font-semibold text-ms-gold hover:text-ms-red transition-colors mr-2"
                >
                  View All
                </Link>
              )}
              <button onClick={() => scroll("left")} className="carousel-nav-btn" aria-label="Scroll left">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll("right")} className="carousel-nav-btn" aria-label="Scroll right">
                <ChevronRight size={18} />
              </button>
            </div>
          }
        />
      </div>

      <div
        ref={scrollRef}
        className="carousel-track-fullbleed flex gap-4 md:gap-5 lg:gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2 px-4 md:px-6"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onFocus={() => {
            pausedRef.current = true;
          }}
          onBlur={() => {
            pausedRef.current = false;
          }}
          onTouchStart={() => {
            pausedRef.current = true;
          }}
          onTouchEnd={() => {
            window.setTimeout(() => {
              pausedRef.current = false;
            }, 3000);
          }}
        >
          {items.map((item) => {
            const card = (
              <>
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-ms-gray mb-4">
                <AcademyImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 300px, 400px"
                />
                {variant === "video" && item.duration && (
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
                    {item.duration}
                  </span>
                )}
                {variant === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <VideoPlayButton size="md" />
                  </div>
                )}
                {variant === "team" && item.subtitle && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-ms-gold">
                      {item.subtitle}
                    </span>
                  </div>
                )}
              </div>
              <h3
                className={`font-bold leading-snug px-0.5 ${
                  variant === "team" ? "text-sm" : "text-base"
                }`}
              >
                {item.title}
              </h3>
              {item.cta && (
                <span className="text-xs text-ms-gold font-semibold mt-1 inline-block">
                  {item.cta} →
                </span>
              )}
              </>
            );

            const className = `snap-start shrink-0 card-modern p-4 md:p-5 ${
              variant === "team"
                ? "w-[220px] lg:w-[260px]"
                : variant === "video"
                  ? "w-[280px] lg:w-[340px] xl:w-[380px]"
                  : "w-[300px] lg:w-[360px] xl:w-[400px]"
            }`;

            if (variant === "video" && item.youtubeUrl) {
              return (
                <button
                  key={item.id}
                  type="button"
                  data-carousel-item
                  onClick={() => openVideo(item)}
                  className={`${className} block text-left`}
                  aria-label={`Play video: ${item.title}`}
                >
                  {card}
                </button>
              );
            }

            return (
            <div
              key={item.id}
              data-carousel-item
              className={`${className} cursor-pointer`}
            >
              {card}
            </div>
            );
          })}
      </div>

      <VideoModal
        videoId={activeVideo?.videoId ?? null}
        title={activeVideo?.title ?? ""}
        youtubeUrl={activeVideo?.youtubeUrl}
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
