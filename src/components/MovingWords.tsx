import { movingWordValues } from "@/data/content";

const marqueeItems = ["Our Values", ...movingWordValues];

export default function MovingWords() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-strip" aria-label="Academy values">
      <div className="marquee-strip-inner">
        <div className="marquee-strip-scroll overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-6 md:gap-10 py-3 md:py-3.5">
            {items.map((value, i) => (
              <span
                key={`${value}-${i}`}
                className="flex items-center gap-6 md:gap-10 shrink-0"
              >
                <span
                  className={
                    value === "Our Values" ? "marquee-value-text marquee-value-lead" : "marquee-value-text"
                  }
                >
                  {value}
                </span>
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
