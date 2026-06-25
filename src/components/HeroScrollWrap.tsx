"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function HeroScrollWrap({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fade = Math.min(scrollY / 400, 1);

  return (
    <div
      className="hero-scroll-wrap"
      style={{
        opacity: 1 - fade * 0.25,
        transform: `translateY(${scrollY * 0.08}px)`,
      }}
    >
      {children}
    </div>
  );
}
