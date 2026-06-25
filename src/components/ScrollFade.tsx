"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}

export default function ScrollFade({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: ScrollFadeProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    setArmed(true);
    const el = ref.current;
    if (!el) return;

    const show = () => setVisible(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) show();
    });

    const fallback = window.setTimeout(show, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const classes = [
    "scroll-fade",
    armed && !visible ? "scroll-fade-pending" : "",
    visible ? "scroll-fade-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
