import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  if (className) {
    return <div className={className}>{children}</div>;
  }
  return <>{children}</>;
}
