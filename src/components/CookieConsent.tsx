"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "ms-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(CONSENT_KEY);
      if (!accepted) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // Storage unavailable — still dismiss for this session
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookie-consent-backdrop" aria-hidden onClick={accept} />
      <div
        className="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent-inner site-container">
        <div className="cookie-consent-icon" aria-hidden>
          <Cookie size={22} />
        </div>
        <div className="cookie-consent-copy">
          <h2 id="cookie-consent-title" className="cookie-consent-title">
            We value your privacy
          </h2>
          <p id="cookie-consent-desc" className="cookie-consent-text">
            We use cookies and similar technologies to improve your experience, analyse site
            traffic, and support academy services. By clicking &ldquo;Accept&rdquo;, you agree to
            our{" "}
            <Link href="/privacy" className="cookie-consent-link">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="cookie-consent-actions">
          <Link href="/privacy" className="cookie-consent-secondary">
            Learn more
          </Link>
          <button type="button" onClick={accept} className="btn-primary cookie-consent-accept">
            Accept
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
