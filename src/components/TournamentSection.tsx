import Link from "next/link";
import { Trophy, ExternalLink } from "lucide-react";
import { academyImages } from "@/data/content";

export default function TournamentSection() {
  return (
    <section className="py-12 md:py-20 bg-ms-off-white relative overflow-hidden border-y border-ms-border">
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${academyImages.trophyCelebration}')`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-ms-red" size={32} />
            <span className="text-ms-blue text-xs font-bold uppercase tracking-widest">
              Upcoming Tournaments
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-ms-text">
            The Chipkizi Cup
          </h2>
          <p className="text-ms-text-muted leading-relaxed mb-4 text-lg">
            The largest East African youth &amp; grassroots football tournament
            in East Africa. Each year, the number of teams and participants has
            been increasing.
          </p>
          <p className="text-ms-text-muted leading-relaxed mb-8">
            In 2019 we had 168 teams with 2,200 boys and girls from 4 African
            nations take part, playing over 410 games on 14 fields.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-ms-red text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded hover:bg-ms-red-dark transition-colors"
            >
              Tournament Website
              <ExternalLink size={16} />
            </Link>
            <Link
              href="/trials"
              className="inline-flex items-center gap-2 border border-ms-border text-ms-text px-6 py-3 font-bold text-sm uppercase tracking-wide rounded hover:bg-white hover:border-ms-blue transition-colors"
            >
              Register Your Team
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-ms-border">
          {[
            { value: "168+", label: "Teams" },
            { value: "2,200", label: "Players" },
            { value: "410+", label: "Games" },
            { value: "14", label: "Fields" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-white border border-ms-border card-hover">
              <p className="text-3xl md:text-4xl font-black text-ms-red">
                {stat.value}
              </p>
              <p className="text-sm text-ms-text-muted uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
