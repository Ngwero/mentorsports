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
      className={`juggle-loader ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="juggle-loader-orbit">
        <div className="juggle-loader-ring" aria-hidden="true" />
        <div className={`juggle-scene ${sizeMap[size]}`}>
          <div className="juggle-scene-glow" aria-hidden="true" />
          <div className="juggle-scene-shadow" aria-hidden="true" />

          <div className="juggle-player-wrap">
            <img
              src="/images/soccer-juggler-loader.png"
              alt=""
              className="juggle-silhouette-img"
              draggable={false}
            />
          </div>

          <div className="juggle-ball-track" aria-hidden="true">
            <div className="juggle-ball-cover" />
            <div className="juggle-scene-ball">
              <div className="juggle-ball-inner">
                <svg viewBox="0 0 32 32" className="juggle-ball-svg">
                  <circle cx="16" cy="16" r="15" className="juggle-ball-circle" />
                  <path
                    d="M8 12 L24 12 M8 20 L24 20 M12 8 L12 24 M20 8 L20 24"
                    className="juggle-ball-pattern"
                  />
                </svg>
              </div>
              <div className="juggle-ball-trail" />
            </div>
          </div>
        </div>
      </div>

      {label && (
        <div className="juggle-loader-status">
          <span className="juggle-loader-label">{label}</span>
          <span className="juggle-loader-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
      )}
    </div>
  );
}
