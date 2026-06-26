import Link from "next/link";
import { siteConfig } from "@/data/content";

export default function TrialsCTA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-ms-red via-ms-blue to-ms-blue-dark" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 50%, white 0%, transparent 45%), radial-gradient(circle at 85% 30%, var(--ms-gold) 0%, transparent 40%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-ms-gold mb-4">
          Join the Academy
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
          Book Your Trials
        </h2>
        <p className="text-white/85 text-lg mb-2 max-w-2xl mx-auto leading-relaxed">
          Open trials for talented players aged 3–17. Take the first step
          towards becoming a professional footballer.
        </p>
        <p className="text-white/55 text-sm mb-10">
          Email{" "}
          <a href={`mailto:${siteConfig.trialsEmail}`} className="text-ms-gold hover:underline">
            {siteConfig.trialsEmail}
          </a>{" "}
          or call {siteConfig.phone}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`mailto:${siteConfig.trialsEmail}?subject=Academy Trial Registration`}
            className="inline-flex items-center gap-2 bg-white text-ms-blue-dark px-8 py-4 font-bold text-sm uppercase tracking-wide rounded-xl hover:bg-ms-off-white transition-all hover:scale-[1.02] shadow-lg"
          >
            Register for Trials
          </Link>
          <Link href="/programs" className="btn-ghost">
            View Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
