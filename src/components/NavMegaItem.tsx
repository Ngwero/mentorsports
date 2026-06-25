"use client";

import Link from "next/link";

interface NavMegaItemProps {
  href: string;
  label: string;
  active: boolean;
  open: boolean;
  onEnter: () => void;
}

export default function NavMegaItem({
  href,
  label,
  active,
  open,
  onEnter,
}: NavMegaItemProps) {
  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      className={`nav-link ${active ? "nav-link-active" : ""} ${
        open ? "nav-link-open" : ""
      }`}
    >
      {label}
    </Link>
  );
}
