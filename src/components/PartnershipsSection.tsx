import Link from "next/link";
import { Handshake } from "lucide-react";
import { partners } from "@/data/content";
import SectionHeader from "@/components/SectionHeader";

interface PartnershipsSectionProps {
  id?: string;
}

export default function PartnershipsSection({ id }: PartnershipsSectionProps) {
  return (
    <section id={id} className="section-modern w-full site-container">
      <SectionHeader
        eyebrow="Global Network"
        title="Partnerships"
        subtitle="Building international connections, tournament platforms, and professional pathways for our players."
        icon={<Handshake className="text-ms-blue shrink-0" size={28} />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((partner) => {
          const content = (
            <>
              {partner.type && (
                <span className="text-xs font-bold uppercase tracking-widest text-ms-blue">
                  {partner.type}
                </span>
              )}
              <h3 className="text-lg font-black uppercase tracking-tight mt-2">
                {partner.name}
              </h3>
              {partner.description && (
                <p className="text-sm text-ms-text-muted leading-relaxed mt-2">
                  {partner.description}
                </p>
              )}
            </>
          );

          if (partner.href) {
            const isExternal = partner.href.startsWith("http");
            return (
              <Link
                key={partner.name}
                href={partner.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card-modern p-6 card-hover block"
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={partner.name} className="card-modern p-6">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
