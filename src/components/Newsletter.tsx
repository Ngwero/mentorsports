"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-modern w-full site-container">
      <div className="relative overflow-hidden rounded-2xl border border-ms-border bg-gradient-to-br from-ms-off-white to-white p-8 md:p-12 shadow-sm">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ms-red/5 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-ms-blue/5 blur-3xl"
          aria-hidden
        />

        <div className="relative max-w-xl mx-auto text-center">
          <SectionHeader
            eyebrow="Stay connected"
            title="Subscribe for Updates"
            subtitle="Be the first to get updates about our academy, trials, and tournaments."
            className="!flex-col !items-center text-center [&_.section-subtitle]:mx-auto [&_.section-eyebrow]:justify-center"
          />

          {submitted ? (
            <p className="text-ms-gold font-semibold text-lg">
              Thank you for subscribing! We&apos;ll keep you updated.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-white border border-ms-border text-ms-text placeholder:text-ms-text-muted focus:outline-none focus:border-ms-blue focus:ring-2 focus:ring-ms-blue/10 transition-colors"
              />
              <button type="submit" className="btn-primary shrink-0">
                <Send size={16} />
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
