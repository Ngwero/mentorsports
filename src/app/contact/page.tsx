import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Newsletter from "@/components/Newsletter";
import SocialLinks from "@/components/SocialLinks";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig, academyImages, staffContacts } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact | Mentor Sports International Academy",
  description: "Get in touch with Mentor Sports International Academy in Kampala, Uganda.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Reach out for trials, programs, partnerships, or general enquiries"
        image={academyImages.teamTrophyGroup}
        category="Get in Touch"
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal animation="slide-left">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                  Reach Out
                </h2>
                <ul className="space-y-5 mb-10">
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-start gap-3 text-ms-text-muted hover:text-ms-blue transition-colors group"
                    >
                      <Mail size={20} className="mt-0.5 shrink-0 text-ms-red" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-ms-text-muted mb-0.5">
                          General Enquiries
                        </p>
                        <p className="group-hover:text-ms-blue transition-colors">
                          {siteConfig.email}
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${siteConfig.trialsEmail}`}
                      className="flex items-start gap-3 text-ms-text-muted hover:text-ms-blue transition-colors group"
                    >
                      <Mail size={20} className="mt-0.5 shrink-0 text-ms-red" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-ms-text-muted mb-0.5">
                          Trials
                        </p>
                        <p className="group-hover:text-ms-blue transition-colors">
                          {siteConfig.trialsEmail}
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="flex items-start gap-3 text-ms-text-muted hover:text-ms-blue transition-colors group"
                    >
                      <Phone size={20} className="mt-0.5 shrink-0 text-ms-red" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-ms-text-muted mb-0.5">
                          Phone
                        </p>
                        <p className="group-hover:text-ms-blue transition-colors">
                          {siteConfig.phone}
                        </p>
                        <p className="text-sm text-ms-text-muted">{siteConfig.phoneAlt}</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-ms-text-muted">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-ms-red" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ms-text-muted mb-0.5">
                        Address
                      </p>
                      <p>{siteConfig.address}</p>
                      <p className="text-sm mt-1">{siteConfig.poBox}</p>
                    </div>
                  </li>
                  <li>
                    <a
                      href={`tel:${siteConfig.phoneOffice.replace(/\s/g, "")}`}
                      className="flex items-start gap-3 text-ms-text-muted hover:text-ms-blue transition-colors group"
                    >
                      <Phone size={20} className="mt-0.5 shrink-0 text-ms-red" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-ms-text-muted mb-0.5">
                          Office Line
                        </p>
                        <p className="group-hover:text-ms-blue transition-colors">
                          {siteConfig.phoneOffice}
                        </p>
                        <p className="text-sm">{siteConfig.phoneMobile2}</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-ms-text-muted">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-ms-red opacity-0" aria-hidden />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ms-text-muted mb-2">
                        Follow Us
                      </p>
                      <SocialLinks variant="stacked" />
                    </div>
                  </li>
                </ul>

                <div className="p-6 rounded-xl bg-ms-off-white border border-ms-border mb-6">
                  <h3 className="font-bold uppercase tracking-wide text-sm mb-4 text-ms-blue">
                    Staff Contacts
                  </h3>
                  <ul className="space-y-3">
                    {staffContacts.map((contact) => (
                      <li key={contact.role}>
                        <p className="text-xs uppercase tracking-wider text-ms-text-muted">
                          {contact.role}
                        </p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-sm text-ms-text hover:text-ms-blue transition-colors"
                        >
                          {contact.email}
                        </a>
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone.replace(/\s/g, "")}`}
                            className="block text-sm text-ms-text-muted hover:text-ms-blue transition-colors mt-0.5"
                          >
                            {contact.phone}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-ms-off-white border border-ms-border">
                  <h3 className="font-bold uppercase tracking-wide text-sm mb-2 text-ms-blue">
                    Office Hours
                  </h3>
                  <p className="text-sm text-ms-text-muted">
                    Monday – Saturday: 8:00 AM – 6:00 PM
                  </p>
                  <p className="text-sm text-ms-text-muted mt-1">
                    Sunday: Closed (match days excepted)
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={150}>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ScrollReveal animation="blur">
        <Newsletter />
      </ScrollReveal>
    </>
  );
}
