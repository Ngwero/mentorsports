import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqChatbot from "@/components/FaqChatbot";
import CookieConsent from "@/components/CookieConsent";
import PageLoader from "@/components/PageLoader";
import { siteConfig } from "@/data/content";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description:
    "Mentor Sports International Academy provides skills and age-appropriate football training for children ages 3-17 in Uganda. Registered by UYFA. Book your trials today.",
  keywords: [
    "football academy Uganda",
    "youth football",
    "Mentor Sports",
    "Chipkizi Cup",
    "UYFA",
    "football trials Uganda",
  ],
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <PageLoader />
        <Header />
        <main className="overflow-x-hidden w-full">{children}</main>
        <Footer />
        <FaqChatbot />
        <CookieConsent />
      </body>
    </html>
  );
}
