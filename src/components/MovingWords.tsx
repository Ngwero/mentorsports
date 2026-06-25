import { movingWordValues } from "@/data/content";

export default function MovingWords() {
  const items = [...movingWordValues, ...movingWordValues];

  return (
    <div className="marquee-strip" aria-label="Academy values">
      <div className="marquee-strip-inner">
        <span className="marquee-values-badge">Our Values</span>
        <div className="marquee-strip-scroll overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-8 md:gap-12 py-3 md:py-3.5">
            {items.map((value, i) => (
              <span
                key={`${value}-${i}`}
                className="flex items-center gap-8 md:gap-12 shrink-0"
              >
                <span className="marquee-value-text">{value}</span>
                <span className="marquee-value-dot" aria-hidden="true">
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
