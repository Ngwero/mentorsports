interface VideoPlayerProps {
  videoId: string;
  title: string;
  className?: string;
  fill?: boolean;
}

export default function VideoPlayer({ videoId, title, className = "", fill = false }: VideoPlayerProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&playsinline=1`;

  if (fill) {
    return (
      <div className={`relative w-full h-full min-h-[280px] overflow-hidden rounded-2xl ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-1/2 left-1/2 h-full w-[max(100%,177.78%)] -translate-x-1/2 -translate-y-1/2 border-0"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl aspect-video ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
