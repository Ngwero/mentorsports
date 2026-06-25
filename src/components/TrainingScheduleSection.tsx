import { Calendar, Clock } from "lucide-react";
import { trainingSchedules } from "@/data/content";

interface TrainingScheduleSectionProps {
  id?: string;
}

export default function TrainingScheduleSection({ id }: TrainingScheduleSectionProps) {
  return (
    <section id={id} className="py-12 md:py-20 bg-ms-off-white border-y border-ms-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 md:mb-10">
          <span className="text-ms-gold text-xs font-bold uppercase tracking-widest">
            When We Train
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mt-2">
            Training Schedule
          </h2>
          <p className="text-ms-text-muted mt-3 max-w-2xl">
            Flexible sessions for international school students on weekends and
            local curriculum students during holidays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingSchedules.map((block) => (
            <div
              key={block.id}
              className="rounded-2xl bg-white border border-ms-border p-6 md:p-8 card-hover"
            >
              <h3 className="text-xl font-black uppercase tracking-tight">{block.title}</h3>
              <p className="text-sm text-ms-blue font-semibold mt-2">{block.audience}</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="text-ms-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ms-text-muted">
                      Days
                    </p>
                    <p className="font-semibold">{block.days.join(" · ")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-ms-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ms-text-muted">
                      Time
                    </p>
                    <p className="font-semibold">{block.time}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-ms-text-muted leading-relaxed mt-6">{block.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
