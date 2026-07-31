import type { Metadata } from "next";
import { siteConfig, socialLinks } from "@/data/content";

export const siteUrl = "https://www.mentorsportsintug.com";

export const defaultDescription =
  "Mentor Sports International Academy provides skills and age-appropriate football training for children ages 3–17 in Kampala, Uganda. UYFA-registered since 2019. Book your trials today.";

export const defaultKeywords = [
  "football academy Uganda",
  "youth football Kampala",
  "Mentor Sports International Academy",
  "Mentor Sports",
  "football trials Uganda",
  "UYFA registered academy",
  "Chipkizi Cup",
  "girls football Uganda",
  "youth soccer Uganda",
  "football training Kampala",
];

export const publicRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/programs", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/teams", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/trials", changeFrequency: "weekly" as const, priority: 0.95 },
  { path: "/pricing", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/events", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/tournaments", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/news", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/leadership", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/booster-club", changeFrequency: "weekly" as const, priority: 0.75 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
];

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description = defaultDescription,
  path = "",
  keywords,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const pageTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: pageTitle,
    description,
    keywords: keywords ?? defaultKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_UG",
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [
        {
          url: absoluteUrl("/images/academy/16-academy-victory-banner.webp"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — youth football academy in Uganda`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteUrl("/images/academy/16-academy-victory-banner.webp")],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: siteConfig.name,
    alternateName: "Mentor Sports",
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/images/academy/16-academy-victory-banner.webp"),
    description: siteConfig.intro,
    slogan: siteConfig.slogan,
    foundingDate: String(siteConfig.founded),
    email: siteConfig.email,
    telephone: siteConfig.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    areaServed: {
      "@type": "Country",
      name: "Uganda",
    },
    sameAs: socialLinks.map((link) => link.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: defaultDescription,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
  };
}
