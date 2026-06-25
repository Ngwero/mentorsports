"use client";

import { useEffect, useState } from "react";
import SoccerJuggleLoader from "@/components/SoccerJuggleLoader";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minDisplay = reducedMotion ? 0 : 900;
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, minDisplay - elapsed);

      window.setTimeout(() => {
        setFadeOut(true);
        window.setTimeout(() => setVisible(false), 450);
      }, delay);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`page-loader ${fadeOut ? "page-loader-out" : ""}`}
      aria-hidden={fadeOut}
    >
      <SoccerJuggleLoader size="lg" label="Loading academy" />
    </div>
  );
}
