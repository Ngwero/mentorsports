"use client";

import type { ReactNode } from "react";
import ScrollFade from "@/components/ScrollFade";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  return (
    <ScrollFade delay={delay} className={className}>
      {children}
    </ScrollFade>
  );
}
