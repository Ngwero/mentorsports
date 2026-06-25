import { socialLinks } from "@/data/content";

const iconPaths: Record<string, string> = {
  tiktok:
    "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  instagram:
    "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};

interface SocialLinksProps {
  variant?: "inline" | "stacked" | "hero-dark";
  className?: string;
}

export default function SocialLinks({ variant = "inline", className = "" }: SocialLinksProps) {
  if (variant === "hero-dark") {
    return (
      <div className={`hero-social-dark ${className}`}>
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-dark-link"
            aria-label={`Follow us on ${link.label}`}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden>
              <path d={iconPaths[link.platform]} />
            </svg>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${
        variant === "inline" ? "flex flex-wrap items-center gap-3" : "space-y-3"
      } ${className}`}
    >
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            variant === "inline"
              ? "inline-flex items-center gap-2 text-sm text-ms-text-muted hover:text-ms-blue transition-colors"
              : "flex items-center gap-3 text-sm text-ms-text-muted hover:text-ms-blue transition-colors"
          }
          aria-label={`Follow us on ${link.label}`}
        >
          <span className="w-8 h-8 rounded-full bg-white border border-ms-border flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
              <path d={iconPaths[link.platform]} />
            </svg>
          </span>
          <span>
            <span className="font-semibold text-ms-text block">{link.label}</span>
            <span className="text-xs">{link.handle}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
