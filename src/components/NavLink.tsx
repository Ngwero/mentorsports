"use client";

import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({
  href,
  label,
  active,
  onClick,
  className = "",
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-link ${active ? "nav-link-active" : ""} ${className}`}
    >
      {label}
    </Link>
  );
}
