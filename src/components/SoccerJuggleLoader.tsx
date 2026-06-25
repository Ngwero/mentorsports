interface SoccerJuggleLoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "juggle-scene-sm",
  md: "juggle-scene-md",
  lg: "juggle-scene-lg",
};

export default function SoccerJuggleLoader({
  label = "Loading",
  size = "md",
  className = "",
}: SoccerJuggleLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={`juggle-scene ${sizeMap[size]}`}>
        <img
          src="/images/soccer-juggler-silhouette.png"
          alt=""
          className="juggle-silhouette-img"
          draggable={false}
        />
        <div className="juggle-ball-cover" aria-hidden="true" />
        <div className="juggle-scene-ball" aria-hidden="true">
          <svg viewBox="0 0 32 32" className="juggle-ball-svg">
            <circle cx="16" cy="16" r="15" className="juggle-ball-circle" />
          </svg>
        </div>
        <div className="juggle-scene-shadow" aria-hidden="true" />
      </div>

      {label && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ms-text-muted animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}
