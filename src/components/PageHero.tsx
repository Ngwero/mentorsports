import AcademyImage from "@/components/AcademyImage";
import { academyImages } from "@/data/content";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  category?: string;
}

export default function PageHero({
  title,
  subtitle,
  image = academyImages.teamBlueGroup,
  category,
}: PageHeroProps) {
  return (
    <section className="relative h-[40vh] min-h-[280px] md:h-[46vh] md:min-h-[320px] overflow-hidden bg-slate-900">
      <AcademyImage src={image} alt={title} fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 page-hero-gradient" />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-8 md:pb-10">
        <div className="glass-panel max-w-3xl p-6 md:p-8">
          {category && (
            <span className="section-eyebrow text-ms-gold">{category}</span>
          )}
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-white/80 mt-3">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
