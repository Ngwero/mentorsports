import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { academyImages, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy | Mentor Sports International Academy",
  description:
    "How Mentor Sports International Academy collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information we collect",
    body: [
      "We may collect information you provide directly — such as your name, email, phone number, and messages when you register for trials, contact us, subscribe to updates, or donate through the Booster Club.",
      "We may also collect technical data automatically, including browser type, device information, and pages visited, to help us improve the website.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "To respond to enquiries, process trial applications, and communicate about academy programs and events.",
      "To operate the Booster Club, process donations, and send receipts or thank-you messages.",
      "To improve our website, security, and user experience.",
      "To comply with legal obligations in Uganda.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "We use cookies and similar technologies to remember your preferences (such as cookie consent), understand how visitors use our site, and keep certain features working correctly.",
      "You can control cookies through your browser settings. Some site features may not work fully if cookies are disabled.",
    ],
  },
  {
    title: "Sharing your information",
    body: [
      "We do not sell your personal information. We may share data with trusted service providers who help us operate the website, process payments, or send communications — only as needed and under appropriate safeguards.",
      "We may disclose information if required by law or to protect the rights and safety of our academy, players, and staff.",
    ],
  },
  {
    title: "Data retention & security",
    body: [
      "We keep personal information only as long as necessary for the purposes described in this policy, or as required by law.",
      "We take reasonable technical and organisational measures to protect your data, though no online system is completely secure.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information where applicable.",
      "You may withdraw consent for marketing communications at any time by contacting us.",
      "Booster Club donors may request anonymous recognition on public donor lists.",
    ],
  },
  {
    title: "Children",
    body: [
      "Our academy serves children ages 3–17. Parent or guardian contact details are collected for registrations and communications. We do not knowingly collect personal information from children without appropriate parental involvement.",
    ],
  },
  {
    title: "Contact us",
    body: [
      `For privacy questions or requests, contact ${siteConfig.name} at ${siteConfig.email} or ${siteConfig.phone}. Office: ${siteConfig.address}, ${siteConfig.poBox}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
        image={academyImages.coachTeamTalk}
        category="Legal"
      />

      <section className="section-modern w-full site-container">
        <ScrollReveal>
          <p className="text-sm text-ms-text-muted mb-8 max-w-3xl leading-relaxed">
            Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            . This policy applies to visitors of our website and individuals who interact with{" "}
            {siteConfig.name} online.
          </p>

          <div className="max-w-3xl space-y-8">
            {sections.map((section) => (
              <article key={section.title} className="card-modern p-6 md:p-8">
                <h2 className="text-lg font-black tracking-tight">{section.title}</h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-sm text-ms-text-muted leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="text-sm text-ms-text-muted mt-8">
            See also our{" "}
            <Link href="/contact" className="text-ms-blue hover:underline">
              contact page
            </Link>{" "}
            for general enquiries.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
