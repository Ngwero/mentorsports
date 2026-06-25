import { gettingStartedKit } from "@/data/content";

export default function GettingStarted() {
  return (
    <section className="py-12 md:py-16 bg-ms-off-white border-t border-ms-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Getting Started
          </h2>
          <p className="text-ms-text-muted text-sm mt-2 max-w-xl mx-auto">
            What players need before joining training sessions or trials
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gettingStartedKit.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-white border border-ms-border"
            >
              <h3 className="font-bold text-sm uppercase tracking-wide text-ms-blue mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-ms-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
