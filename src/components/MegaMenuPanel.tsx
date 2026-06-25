"use client";

import AcademyImage from "@/components/AcademyImage";
import Link from "next/link";
import type { NavMegaMenu } from "@/data/content";

interface MegaMenuPanelProps {
  menu: NavMegaMenu | null;
  visible: boolean;
}

export default function MegaMenuPanel({ menu, visible }: MegaMenuPanelProps) {
  if (!menu) return null;

  return (
    <div
      className={`mega-menu-panel absolute left-0 right-0 top-full pt-2 transition-all duration-300 origin-top ${
        visible
          ? "opacity-100 visible translate-y-0 pointer-events-auto"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="bg-white border-b border-ms-border shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-[200px_1fr] gap-8">
            <nav className="flex flex-col gap-1">
              {menu.subLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="mega-sub-link text-[15px] font-semibold text-ms-text py-2.5 px-3 rounded-lg hover:bg-ms-off-white hover:text-ms-blue transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="grid grid-cols-2 gap-3 max-w-sm ml-auto">
              {menu.featured.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group relative aspect-[3/2] max-h-[120px] rounded-xl overflow-hidden ${
                    card.dark ? "bg-ms-blue-dark" : ""
                  }`}
                >
                  {!card.dark && (
                    <AcademyImage
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      sizes="160px"
                    />
                  )}
                  {card.dark && (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-[1.02] transition-transform duration-300"
                      style={{ backgroundImage: `url(${card.image})` }}
                    />
                  )}
                  <div
                    className={`absolute inset-0 ${
                      card.dark
                        ? "bg-gradient-to-t from-ms-blue-dark via-ms-blue-dark/80 to-transparent"
                        : "bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    {card.subtitle && (
                      <p className="text-white/70 text-[10px] mb-0.5">{card.subtitle}</p>
                    )}
                    <p className="text-white font-bold text-xs leading-snug group-hover:text-ms-gold transition-colors">
                      {card.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
