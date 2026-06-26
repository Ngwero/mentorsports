import { Mail } from "lucide-react";
import AcademyImage from "@/components/AcademyImage";
import { leadershipTeam } from "@/data/content";

export default function LeadershipSection() {
  const executive = leadershipTeam.filter((role) => role.department === "Executive");
  const rest = leadershipTeam.filter((role) => role.department !== "Executive");

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 md:mb-10">
          <span className="text-ms-gold text-xs font-bold uppercase tracking-widest">
            Our Team
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mt-2">
            Leadership & Organogram
          </h2>
          <p className="text-ms-text-muted mt-3 max-w-2xl">
            Professional leadership across coaching, operations, girls&apos; football,
            and tournament management.
          </p>
        </div>

        <div className="space-y-10">
          <div className="flex flex-col items-center">
            {executive.map((role) => (
              <LeadershipCard key={role.id} role={role} featured />
            ))}
            <div className="w-px h-8 bg-ms-border" aria-hidden />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div
              className="hidden lg:block absolute top-0 left-[12.5%] right-[12.5%] h-px bg-ms-border"
              aria-hidden
            />
            {rest.map((role) => (
              <div key={role.id} className="relative lg:pt-6">
                <div
                  className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-ms-border"
                  aria-hidden
                />
                <LeadershipCard role={role} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadershipCard({
  role,
  featured = false,
}: {
  role: (typeof leadershipTeam)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 md:p-6 w-full ${
        featured
          ? "max-w-md border-ms-blue bg-ms-off-white text-center"
          : "border-ms-border bg-white h-full"
      }`}
    >
      {role.image && (
        <div className="relative aspect-[4/5] w-full max-w-[220px] mx-auto mb-4 rounded-xl overflow-hidden">
          <AcademyImage
            src={role.image}
            alt={role.title}
            fill
            className="object-cover object-top"
            sizes="220px"
          />
        </div>
      )}
      <span className="text-xs font-bold uppercase tracking-widest text-ms-blue">
        {role.department}
      </span>
      <h3 className="text-base md:text-lg font-black uppercase tracking-tight mt-2">
        {role.title}
      </h3>
      <p className="text-sm text-ms-text-muted leading-relaxed mt-2">{role.description}</p>
      {role.email && (
        <a
          href={`mailto:${role.email}`}
          className="inline-flex items-center gap-1.5 text-sm text-ms-blue hover:text-ms-red transition-colors mt-4"
        >
          <Mail size={14} />
          {role.email}
        </a>
      )}
    </div>
  );
}
