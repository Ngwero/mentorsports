interface VideoPlayButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "video-play-glow-sm",
  md: "video-play-glow-md",
  lg: "video-play-glow-lg",
};

export default function VideoPlayButton({
  size = "md",
  className = "",
}: VideoPlayButtonProps) {
  return (
    <div className={`video-play-glow ${sizeClasses[size]} ${className}`} aria-hidden>
      <span className="video-play-glow-ring" />
      <span className="video-play-glow-ring video-play-glow-ring-delay" />
      <span className="video-play-glow-button">
        <span className="video-play-glow-icon" />
      </span>
    </div>
  );
}
