import AcademyImage from "@/components/AcademyImage";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { newsArticles } from "@/data/content";

interface NewsGridProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function NewsGrid({ limit, showViewAll = false }: NewsGridProps) {
  const articles = limit ? newsArticles.slice(0, limit) : newsArticles;
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-4">
      <SectionHeader
        eyebrow="Latest"
        title="Today at Mentor Sports"
        subtitle="The latest articles"
        action={
          showViewAll ? (
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-ms-gold hover:text-ms-red transition-colors"
            >
              View All
              <ChevronRight size={16} />
            </Link>
          ) : undefined
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="group relative rounded-2xl overflow-hidden card-modern cursor-pointer lg:row-span-2 min-h-[400px]">
            <AcademyImage
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-ms-red text-white text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded">
                  {featured.category}
                </span>
                <span className="text-xs text-white/60">{featured.time}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black leading-tight group-hover:text-ms-gold transition-colors">
                {featured.title}
              </h3>
            </div>
          </article>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.slice(0, 4).map((article) => (
              <article
                key={article.id}
                className="group flex flex-col card-modern cursor-pointer overflow-hidden"
              >
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-ms-gray mb-3">
                  <AcademyImage
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-ms-blue text-xs font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-ms-text-muted">{article.time}</span>
                </div>
                <h3 className="text-sm font-bold leading-snug group-hover:text-ms-gold transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </article>
            ))}
          </div>
        </div>

        {!limit && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {rest.slice(4).map((article) => (
              <article
                key={article.id}
                className="group flex gap-4 card-hover cursor-pointer p-3 rounded-lg hover:bg-ms-surface transition-colors"
              >
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-ms-gray">
                  <AcademyImage
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-ms-blue text-[10px] font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-ms-text-muted">{article.time}</span>
                  </div>
                  <h3 className="text-sm font-bold leading-snug group-hover:text-ms-gold transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        )}

        {showViewAll && (
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-ms-gold hover:underline"
            >
              View All News
              <ChevronRight size={16} />
            </Link>
          </div>
        )}
    </section>
  );
}
