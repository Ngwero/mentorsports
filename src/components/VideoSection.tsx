import Link from "next/link";
import { ExternalLink } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import VideoPlayer from "@/components/VideoPlayer";
import { featuredVideo } from "@/data/content";

export default function VideoSection() {
  return (
    <section className="section-modern section-surface max-w-7xl mx-auto px-4">
      <SectionHeader
        eyebrow="Watch"
        title="Academy Highlights"
        subtitle="See Mentor Sports International Academy in action on the pitch."
      />

      <div className="max-w-4xl mx-auto">
        <VideoPlayer videoId={featuredVideo.youtubeId} title={featuredVideo.title} />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          <p className="text-sm font-semibold text-ms-text">{featuredVideo.title}</p>
          <Link
            href={featuredVideo.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ms-red hover:text-ms-red-dark transition-colors"
          >
            Watch on YouTube
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
