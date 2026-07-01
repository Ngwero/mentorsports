"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import AcademyImage from "@/components/AcademyImage";
import { academyImages, upcomingEvents } from "@/data/content";
import EventCountdown from "@/components/EventCountdown";
import SectionHeader from "@/components/SectionHeader";

const filters = [
  { id: "all", label: "All Events" },
  { id: "tournament", label: "Tournaments" },
  { id: "trials", label: "Trials" },
  { id: "training", label: "Training" },
] as const;

type FilterId = (typeof filters)[number]["id"];

const eventImages: Record<string, string> = {
  "wsh-elite-2026": academyImages.trophyCelebration,
  "chipkizi-2026": academyImages.academyVictoryBanner,
  "holiday-camp-jul": academyImages.trainingAction,
  "open-trials": academyImages.playerPortrait,
};

function getEventCategory(id: string): FilterId {
  if (id.includes("chipkizi") || id.includes("wsh")) return "tournament";
  if (id.includes("trial")) return "trials";
  return "training";
}

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const featured = upcomingEvents.find((event) => event.featured) ?? upcomingEvents[0];
  const others = upcomingEvents.filter((event) => event.id !== featured.id);

  const filteredOthers = useMemo(() => {
    if (activeFilter === "all") return others;
    return others.filter((event) => getEventCategory(event.id) === activeFilter);
  }, [activeFilter, others]);

  return (
    <section className="section-modern w-full site-container">
      <SectionHeader
        eyebrow="What's Next"
        title="Break barriers, set new records, and inspire with every play"
        subtitle="Tournaments, trials, and academy milestones on the calendar."
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`filter-pill ${activeFilter === filter.id ? "is-active" : ""}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        <div className="lg:col-span-7 event-feature-card">
          <div className="event-feature-card-inner">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-ms-gold mb-3">
              Featured Event
            </span>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              {featured.title}
            </h3>
            <p className="text-sm text-white/75 mt-3 leading-relaxed max-w-xl">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={16} className="text-ms-gold" />
                {new Date(featured.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} className="text-ms-gold" />
                {featured.location}
              </span>
            </div>
            <div className="mt-6">
              <EventCountdown targetDate={featured.date} />
            </div>
            <Link href={featured.href} className="btn-pill-accent inline-flex mt-6 text-sm">
              Learn more
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {filteredOthers.map((event) => (
            <Link key={event.id} href={event.href} className="event-tile group">
              <div className="event-tile-image">
                <AcademyImage
                  src={eventImages[event.id] ?? academyImages.trainingAction}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="event-tile-body">
                <h3 className="font-bold leading-snug">{event.title}</h3>
                <p className="text-xs text-ms-text-muted mt-1 line-clamp-2">
                  {event.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
