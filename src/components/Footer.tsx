import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { navLinks, siteConfig, partners, teams, staffContacts } from "@/data/content";
import SocialLinks from "@/components/SocialLinks";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="footer-dark">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo showText={false} height={56} />
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {siteConfig.internationalPitch}
            </p>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-ms-gold">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-ms-gold">
              Our Teams
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              {teams.map((team) => (
                <li key={team.id}>
                  <Link href="/teams" className="hover:text-white transition-colors">
                    {team.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-sm uppercase tracking-widest mt-6 mb-4 text-ms-gold">
              Programs
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  Holiday Programs
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  Youth Programs
                </Link>
              </li>
              <li>
                <Link href="/trials" className="hover:text-white transition-colors">
                  Trials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-ms-gold">
              Reach Out
            </h3>
            <ul className="space-y-3">
              {staffContacts.slice(0, 2).map((contact) => (
                <li key={contact.role}>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-2 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <Mail size={16} className="mt-0.5 shrink-0 text-ms-red" />
                    <span>
                      <span className="block text-xs uppercase tracking-wider">{contact.role}</span>
                      {contact.email}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-ms-red" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneAlt.replace(/\s/g, "")}`}
                  className="flex items-start gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-ms-red" />
                  {siteConfig.phoneAlt}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneOffice.replace(/\s/g, "")}`}
                  className="flex items-start gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-ms-red" />
                  {siteConfig.phoneOffice}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneMobile2.replace(/\s/g, "")}`}
                  className="flex items-start gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-ms-red" />
                  {siteConfig.phoneMobile2}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-ms-red" />
                <span>
                  {siteConfig.address}
                  <br />
                  {siteConfig.poBox}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4 text-center">
            Our Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((partner) =>
              partner.href ? (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 font-medium uppercase tracking-wide hover:text-white transition-colors"
                >
                  {partner.name}
                </a>
              ) : (
                <span
                  key={partner.name}
                  className="text-sm text-white/50 font-medium uppercase tracking-wide"
                >
                  {partner.name}
                </span>
              )
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Mentor Sports International Academy.
            All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
