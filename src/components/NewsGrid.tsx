"use client";

import { useState } from "react";
import AcademyImage from "@/components/AcademyImage";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import VideoModal from "@/components/VideoModal";
import VideoPlayer from "@/components/VideoPlayer";
import VideoPlayButton from "@/components/VideoPlayButton";
import { featuredVideo, newsArticles } from "@/data/content";
import { getYoutubeId } from "@/lib/youtube";

type NewsArticle = (typeof newsArticles)[number];

interface ActiveVideo {
  videoId: string;
  title: string;
  youtubeUrl: string;
}

interface NewsGridProps {
  limit?: number;
  showViewAll?: boolean;
}

function articleImageClass(article: NewsArticle) {
  if (article.imageFit === "contain") {
    return "object-contain p-3 md:p-4 bg-[#c8102e] group-hover:scale-[1.02] transition-transform duration-500";
  }

  if (article.imageAspect === "portrait") {
    return "object-cover object-top group-hover:scale-105 transition-transform duration-500";
  }

  return "object-cover group-hover:scale-105 transition-transform duration-500";
}

function articleImageAspect(article: NewsArticle) {
  if (article.imageAspect === "portrait") return "aspect-[4/5]";
  if (article.imageFit === "contain") return "aspect-square";
  return "aspect-[16/10]";
}

function FeaturedVideoCard() {
  return (
    <article className="news-featured card-modern overflow-hidden">
      <div className="news-featured-grid">
        <div className="news-featured-media">
          <VideoPlayer
            videoId={featuredVideo.youtubeId}
            title={featuredVideo.title}
            className="md:rounded-l-[1.2rem] md:rounded-r-none"
          />
        </div>
        <div className="news-featured-copy">
          <span className="news-featured-eyebrow">Academy Highlights</span>
          <h3 className="news-featured-title">{featuredVideo.title}</h3>
          <p className="news-featured-text">
            See Mentor Sports International Academy in action on the pitch.
          </p>
          <Link
            href={featuredVideo.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="news-featured-link"
          >
            Watch on YouTube
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function NewsCardImage({ article }: { article: NewsArticle }) {
  return (
    <div
      className={`relative ${articleImageAspect(article)} rounded-xl overflow-hidden bg-ms-gray mb-4`}
    >
      <AcademyImage
        src={article.image}
        alt={article.title}
        fill
        className={articleImageClass(article)}
        sizes="(max-width: 640px) 100vw, 25vw"
      />
      {article.youtubeUrl && (
        <div className="news-card-video-overlay">
          <VideoPlayButton size="md" />
        </div>
      )}
    </div>
  );
}

function NewsCardBody({ article }: { article: NewsArticle }) {
  return (
    <div className="flex flex-col flex-1 px-0.5 pb-1">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-ms-blue text-xs font-bold uppercase tracking-wider">
          {article.category}
        </span>
        <span className="text-xs text-ms-text-muted">{article.time}</span>
      </div>
      <h3 className="text-sm md:text-base font-bold leading-snug group-hover:text-ms-gold transition-colors">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="text-xs md:text-sm text-ms-text-muted mt-2 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      )}
    </div>
  );
}

function NewsCard({
  article,
  onOpenVideo,
}: {
  article: NewsArticle;
  onOpenVideo: (article: NewsArticle) => void;
}) {
  const cardClassName =
    "group flex flex-col card-modern cursor-pointer p-4 md:p-5 h-full text-left";

  if (article.youtubeUrl) {
    return (
      <button
        type="button"
        onClick={() => onOpenVideo(article)}
        className={cardClassName}
        aria-label={`Play video: ${article.title}`}
      >
        <NewsCardImage article={article} />
        <NewsCardBody article={article} />
      </button>
    );
  }

  return (
    <article className={cardClassName}>
      <NewsCardImage article={article} />
      <NewsCardBody article={article} />
    </article>
  );
}

function CompactNewsCard({
  article,
  onOpenVideo,
}: {
  article: NewsArticle;
  onOpenVideo: (article: NewsArticle) => void;
}) {
  const content = (
    <>
      <div
        className={`relative shrink-0 rounded-xl overflow-hidden bg-ms-gray ${
          article.imageAspect === "portrait"
            ? "w-24 h-32"
            : article.imageFit === "contain"
              ? "w-24 h-24 bg-[#c8102e]"
              : "w-24 h-24"
        }`}
      >
        <AcademyImage
          src={article.image}
          alt={article.title}
          fill
          className={articleImageClass(article)}
          sizes="96px"
        />
        {article.youtubeUrl && (
          <div className="news-card-video-overlay">
            <VideoPlayButton size="sm" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1 py-0.5">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-ms-blue text-[10px] font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-[10px] text-ms-text-muted">{article.time}</span>
        </div>
        <h3 className="text-sm font-bold leading-snug group-hover:text-ms-gold transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-xs text-ms-text-muted mt-1.5 leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        )}
      </div>
    </>
  );

  if (article.youtubeUrl) {
    return (
      <button
        type="button"
        onClick={() => onOpenVideo(article)}
        className="group flex gap-4 card-modern card-hover cursor-pointer p-4 md:p-5 h-full text-left w-full"
        aria-label={`Play video: ${article.title}`}
      >
        {content}
      </button>
    );
  }

  return (
    <article className="group flex gap-4 card-modern card-hover cursor-pointer p-4 md:p-5 h-full">
      {content}
    </article>
  );
}

export default function NewsGrid({ limit, showViewAll = false }: NewsGridProps) {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const articles = limit ? newsArticles.slice(0, limit) : newsArticles;
  const gridArticles = limit ? articles : articles.slice(0, 4);
  const compactArticles = limit ? [] : articles.slice(4);

  const openVideo = (article: NewsArticle) => {
    if (!article.youtubeUrl) return;

    const videoId = getYoutubeId(article.youtubeUrl);
    if (!videoId) return;

    setActiveVideo({
      videoId,
      title: article.title,
      youtubeUrl: article.youtubeUrl,
    });
  };

  return (
    <section className="w-full site-container">
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

      <FeaturedVideoCard />

      <div className="news-cards-grid">
        {gridArticles.map((article) => (
          <NewsCard key={article.id} article={article} onOpenVideo={openVideo} />
        ))}
      </div>

      {compactArticles.length > 0 && (
        <div className="news-compact-grid">
          {compactArticles.map((article) => (
            <CompactNewsCard
              key={article.id}
              article={article}
              onOpenVideo={openVideo}
            />
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

      <VideoModal
        videoId={activeVideo?.videoId ?? null}
        title={activeVideo?.title ?? ""}
        youtubeUrl={activeVideo?.youtubeUrl}
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
