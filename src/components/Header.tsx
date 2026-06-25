"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ChevronDown } from "lucide-react";
import { mainNavItems, navMegaMenus } from "@/data/content";
import Logo from "@/components/Logo";
import NavMegaItem from "@/components/NavMegaItem";
import MegaMenuPanel from "@/components/MegaMenuPanel";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);
  const activeMegaMenu = openMenu ? navMegaMenus[openMenu] ?? null : null;

  const headerHeight = scrolled ? 64 : 72;

  return (
    <header
      className={`site-header sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "site-header-scrolled" : ""
      }`}
    >
      {/* Main bar — logo + burger | nav links | account */}
      <div
        className="relative"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: headerHeight }}
          >
            {/* Left: crest + hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              <Logo showText={false} height={scrolled ? 40 : 44} />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="burger-btn flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span className={`burger-line ${menuOpen ? "burger-line-top-open" : ""}`} />
                <span className={`burger-line ${menuOpen ? "burger-line-mid-open" : ""}`} />
                <span className={`burger-line ${menuOpen ? "burger-line-bot-open" : ""}`} />
              </button>
            </div>

            {/* Center: horizontal nav (desktop) */}
            <nav className="hidden lg:flex items-center justify-center gap-0.5 flex-1 px-6">
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

            {/* Right: trials + account */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/trials"
                className="hidden md:inline-flex btn-primary !py-2.5 !px-4 !text-xs"
              >
                Book Trials
              </Link>
              <button
                className="p-2 text-ms-text hover:text-ms-blue transition-colors rounded-full hover:bg-ms-surface"
                aria-label="Account"
              >
                <User size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <MegaMenuPanel menu={activeMegaMenu} visible={!!openMenu} />
      </div>

      {/* Full menu overlay (burger tap — all screen sizes) */}
      <div
        className={`menu-overlay fixed inset-x-0 bottom-0 top-[72px] bg-white z-40 transition-all duration-300 shadow-2xl ${
          menuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        } ${scrolled ? "!top-16" : ""}`}
      >
        <nav className="h-full overflow-y-auto px-6 py-6 max-w-7xl mx-auto">
          {mainNavItems.map((link, i) => {
            const mega = navMegaMenus[link.href];
            const expanded = mobileExpanded === link.href;

            return (
              <div
                key={link.href}
                className={`mobile-nav-item border-b border-ms-border ${
                  menuOpen ? "mobile-nav-item-visible" : ""
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`py-4 text-base font-semibold ${
                      isActive(link.href) ? "text-ms-red" : "text-ms-text"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {mega && (
                    <button
                      onClick={() =>
                        setMobileExpanded(expanded ? null : link.href)
                      }
                      className="p-2 text-ms-text-muted"
                      aria-label={`Expand ${link.label}`}
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {mega && expanded && (
                  <div className="pb-4 pl-1 grid sm:grid-cols-2 gap-4 animate-fade-in-up">
                    <div className="space-y-1">
                      {mega.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={closeMenu}
                          className="block py-2 text-sm text-ms-text-muted hover:text-ms-blue transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {mega.featured.map((card) => (
                        <Link
                          key={card.title}
                          href={card.href}
                          onClick={closeMenu}
                          className="text-xs font-medium text-ms-blue hover:text-ms-red transition-colors p-2 rounded-lg bg-ms-off-white"
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

          <Link
            href="/trials"
            onClick={closeMenu}
            className={`mt-6 block text-center bg-ms-red text-white py-3.5 font-semibold text-sm hover:bg-ms-red-dark transition-colors rounded-lg mobile-nav-item ${
              menuOpen ? "mobile-nav-item-visible" : ""
            }`}
            style={{ transitionDelay: menuOpen ? "320ms" : "0ms" }}
          >
            Book Trials
          </Link>
        </nav>
      </div>
    </header>
  );
}
