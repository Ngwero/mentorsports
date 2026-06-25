"use client";

import { useRef } from "react";
import AcademyImage from "@/components/AcademyImage";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

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
}

export default function CarouselSection({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  variant = "card",
  viewAllHref,
}: CarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id={id} className="max-w-7xl mx-auto px-4">
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

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2"
        >
          {items.map((item) => {
            const card = (
              <>
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-ms-gray mb-3">
                <AcademyImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                {variant === "video" && item.duration && (
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
                    {item.duration}
                  </span>
                )}
                {variant === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-ms-red/90 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
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
                className={`font-bold leading-snug ${
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

            const className = `snap-start shrink-0 card-modern ${
              variant === "team"
                ? "w-[220px]"
                : variant === "video"
                  ? "w-[280px]"
                  : "w-[300px]"
            }`;

            if (variant === "video" && item.youtubeUrl) {
              return (
                <Link
                  key={item.id}
                  href={item.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${className} block`}
                >
                  {card}
                </Link>
              );
            }

            return (
            <div
              key={item.id}
              className={`${className} cursor-pointer`}
            >
              {card}
            </div>
            );
          })}
        </div>
    </section>
  );
}
