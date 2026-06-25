import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import GettingStarted from "@/components/GettingStarted";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig, trialSteps, academyImages } from "@/data/content";

export const metadata: Metadata = {
  title: "Trials | Mentor Sports International Academy",
  description:
    "Book your academy trials for players aged 3–18+. Register online today.",
};

export default function TrialsPage() {
  return (
    <>
      <PageHero
        title="Book Your Trials"
        subtitle="Open trials for talented players aged 3–18+. Take the first step towards becoming a professional footballer."
        image={academyImages.playerPortrait}
        category="Registration"
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal animation="slide-left">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                  How It Works
                </h2>
                <div className="space-y-6">
                  {trialSteps.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-ms-red flex items-center justify-center font-black text-white">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{step.title}</h3>
                        <p className="text-sm text-ms-text-muted">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 rounded-xl bg-ms-off-white border border-ms-border">
                  <h3 className="font-bold uppercase tracking-wide text-sm mb-4 text-ms-blue">
                    Contact for Trials
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href={`mailto:${siteConfig.trialsEmail}`}
                        className="flex items-center gap-2 text-sm text-ms-text-muted hover:text-ms-blue transition-colors"
                      >
                        <Mail size={16} className="text-ms-red" />
                        {siteConfig.trialsEmail}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 text-sm text-ms-text-muted hover:text-ms-blue transition-colors"
                      >
                        <Phone size={16} className="text-ms-red" />
                        {siteConfig.phone}
                      </a>
                    </li>
                  </ul>
                </div>

                <p className="mt-6 text-sm text-ms-text-muted">
                  Or view our{" "}
                  <Link href="/programs" className="text-ms-blue hover:underline">
                    programs
                  </Link>{" "}
                  to learn more about what we offer.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={150}>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                  Mentor Sports Trials Application
                </h2>
                <ContactForm variant="trials" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ScrollReveal animation="fade-up">
        <GettingStarted />
      </ScrollReveal>
    </>
  );
}
