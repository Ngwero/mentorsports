import { Smile, Users, Award, Zap } from "lucide-react";
import { coreValues } from "@/data/content";

const iconMap = {
  smile: Smile,
  users: Users,
  award: Award,
  zap: Zap,
};

export default function CoreValues() {
  return (
    <section className="py-12 md:py-16 bg-white border-t border-ms-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Our Core Values
          </h2>
          <p className="text-ms-text-muted text-sm mt-2">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {coreValues.map((value) => {
            const Icon = iconMap[value.icon];
            return (
              <div
                key={value.name}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-ms-off-white border border-ms-border card-hover"
              >
                <div className="w-14 h-14 rounded-full bg-ms-red/10 flex items-center justify-center mb-4">
                  <Icon size={28} className="text-ms-blue" />
                </div>
                <h3 className="font-bold text-lg uppercase tracking-wide text-ms-text">
                  {value.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
