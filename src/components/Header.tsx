"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { mainNavItems, navMegaMenus } from "@/data/content";
import Logo from "@/components/Logo";
import NavMegaItem from "@/components/NavMegaItem";
import MegaMenuPanel from "@/components/MegaMenuPanel";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileExpanded(null);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setOpenMenu(null);
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  const activeMegaMenu = openMenu ? navMegaMenus[openMenu] ?? null : null;
  const headerHeight = scrolled ? 60 : 64;

  const mobileMenu = mounted
    ? createPortal(
        <>
          <div
            className={`mobile-menu-backdrop ${menuOpen ? "mobile-menu-backdrop-open" : ""}`}
            onClick={closeMenu}
            aria-hidden={!menuOpen}
          />
          <aside
            id="mobile-navigation"
            className={`mobile-menu-drawer ${menuOpen ? "mobile-menu-drawer-open" : ""}`}
            aria-hidden={!menuOpen}
          >
            <div className="mobile-menu-header">
              <Logo showText height={36} />
              <button
                type="button"
                onClick={closeMenu}
                className="mobile-menu-close"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-menu-nav">
              {mainNavItems.map((link, i) => {
                const mega = navMegaMenus[link.href];
                const expanded = mobileExpanded === link.href;

                return (
                  <div
                    key={link.href}
                    className={`mobile-menu-group ${menuOpen ? "mobile-menu-group-visible" : ""}`}
                    style={{ transitionDelay: menuOpen ? `${i * 45}ms` : "0ms" }}
                  >
                    <div className="mobile-menu-row">
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`mobile-menu-link ${isActive(link.href) ? "mobile-menu-link-active" : ""}`}
                      >
                        {link.label}
                      </Link>
                      {mega && (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(expanded ? null : link.href)
                          }
                          className="mobile-menu-expand"
                          aria-expanded={expanded}
                          aria-label={`Show ${link.label} links`}
                        >
                          <ChevronDown
                            size={18}
                            className={expanded ? "rotate-180" : ""}
                          />
                        </button>
                      )}
                    </div>

                    {mega && expanded && (
                      <div className="mobile-menu-sub">
                        {mega.subLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={closeMenu}
                            className="mobile-menu-sublink"
                          >
                            {sub.label}
                          </Link>
                        ))}
                        <div className="mobile-menu-featured">
                          {mega.featured.map((card) => (
                            <Link
                              key={card.title}
                              href={card.href}
                              onClick={closeMenu}
                              className="mobile-menu-featured-card"
                            >
                              {card.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mobile-menu-footer">
              <Link href="/trials" onClick={closeMenu} className="btn-primary w-full justify-center">
                Book Trials
              </Link>
              <Link href="/contact" onClick={closeMenu} className="mobile-menu-contact">
                Contact the academy
              </Link>
            </div>
          </aside>
        </>,
        document.body
      )
    : null;

  return (
    <>
      <header
        className={`site-header sticky top-0 z-[100] transition-all duration-300 ${
          scrolled ? "site-header-scrolled" : ""
        }`}
      >
        <div className="relative hidden lg:block" onMouseLeave={() => setOpenMenu(null)}>
          <div className="site-container">
            <div
              className="flex items-center justify-between transition-all duration-300"
              style={{ height: headerHeight }}
            >
              <Logo height={scrolled ? 40 : 44} />

              <nav className="flex items-center justify-center gap-0.5 flex-1 px-6">
                {mainNavItems.map((link) => (
                  <NavMegaItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={isActive(link.href)}
                    open={openMenu === link.href}
                    onEnter={() => setOpenMenu(link.href)}
                  />
                ))}
              </nav>

              <div className="flex items-center gap-2 shrink-0">
                <Link href="/trials" className="btn-primary !py-2.5 !px-4 !text-xs">
                  Book Trials
                </Link>
              </div>
            </div>
          </div>

          <MegaMenuPanel menu={activeMegaMenu} visible={!!openMenu} />
        </div>

        {/* Mobile bar */}
        <div className="lg:hidden site-container">
          <div
            className="flex items-center justify-between gap-3"
            style={{ height: headerHeight }}
          >
            <Logo showText={false} height={38} />

            <div className="flex items-center gap-2">
              <Link
                href="/trials"
                className="btn-primary !py-2 !px-3 !text-[10px] !rounded-lg sm:!text-xs sm:!px-4"
              >
                Trials
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="burger-btn"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
              >
                <span className={`burger-line ${menuOpen ? "burger-line-top-open" : ""}`} />
                <span className={`burger-line ${menuOpen ? "burger-line-mid-open" : ""}`} />
                <span className={`burger-line ${menuOpen ? "burger-line-bot-open" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
