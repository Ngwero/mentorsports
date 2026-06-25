import type { ReactNode } from "react";
import ScrollFade from "@/components/ScrollFade";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  icon,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 md:mb-7 ${className}`}
    >
      <ScrollFade className={`max-w-2xl ${icon ? "flex items-start gap-3" : ""}`}>
        {icon && <div className="mt-1 shrink-0">{icon}</div>}
        <div>
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      </ScrollFade>
      {action && (
        <ScrollFade delay={120} className="shrink-0">
          {action}
        </ScrollFade>
      )}
    </div>
  );
}
