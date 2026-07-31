import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqChatbot from "@/components/FaqChatbot";
import CookieConsent from "@/components/CookieConsent";
import PopupManager from "@/components/popup/PopupManager";
import PageLoader from "@/components/PageLoader";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/data/content";
import { createMetadata, defaultDescription, defaultKeywords, siteUrl } from "@/lib/seo";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_UG",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/academy/16-academy-victory-banner.webp",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — youth football academy in Uganda`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <PageLoader />
        <Header />
        <main className="overflow-x-hidden w-full">{children}</main>
        <Footer />
        <FaqChatbot />
        <CookieConsent />
        <PopupManager />
      </body>
    </html>
  );
}
