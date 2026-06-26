import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { upcomingEvents } from "@/data/content";
import EventCountdown from "@/components/EventCountdown";
import SectionHeader from "@/components/SectionHeader";

export default function EventsSection() {
  const featured = upcomingEvents.find((event) => event.featured) ?? upcomingEvents[0];
  const others = upcomingEvents.filter((event) => event.id !== featured.id);

  return (
    <section className="section-modern w-full site-container">
      <SectionHeader
        eyebrow="What's Next"
        title="Upcoming Events"
        subtitle="Tournaments, trials, and academy milestones on the calendar."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-modern p-6 md:p-8 bg-gradient-to-br from-ms-off-white to-white">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-ms-red mb-3">
            Featured Event
          </span>
          <h3 className="text-2xl font-black uppercase tracking-tight">{featured.title}</h3>
          <p className="text-sm text-ms-text-muted mt-3 leading-relaxed">
            {featured.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-ms-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={16} className="text-ms-blue" />
              {new Date(featured.date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} className="text-ms-blue" />
              {featured.location}
            </span>
          </div>
          <div className="mt-6">
            <EventCountdown targetDate={featured.date} />
          </div>
          <Link href={featured.href} className="btn-primary inline-flex mt-6 text-sm">
            Learn more
          </Link>
        </div>

        <div className="space-y-4">
          {others.map((event) => (
            <Link
              key={event.id}
              href={event.href}
              className="block card-modern p-5 md:p-6 card-hover"
            >
              <h3 className="font-black uppercase tracking-tight">{event.title}</h3>
              <p className="text-sm text-ms-text-muted mt-2 leading-relaxed">
                {event.description}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-ms-text-muted uppercase tracking-wider">
                <span>
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span>{event.location}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
