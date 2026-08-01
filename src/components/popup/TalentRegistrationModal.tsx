"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, X } from "lucide-react";
import { referralSources } from "@/data/content";
import {
  talentRegistrationEmailSubject,
  talentRegistrationRecipient,
} from "@/lib/share";
import { PopupStorage } from "@/lib/popupStorage";

interface TalentRegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TalentRegistrationModal({ open, onClose }: TalentRegistrationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    playerName: "",
    parentName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    position: "",
    club: "",
    referral: "",
    message: "",
  });

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setLoading(false);
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white border border-ms-border text-ms-text text-sm focus:outline-none focus:border-ms-blue focus:ring-2 focus:ring-ms-blue/10 transition-colors";
  const labelClass =
    "block text-xs font-bold uppercase tracking-wider text-ms-text-muted mb-1.5";

  const openMailtoFallback = (body: string) => {
    const subject = encodeURIComponent(talentRegistrationEmailSubject);
    const mailBody = encodeURIComponent(body);
    window.location.href = `mailto:${talentRegistrationRecipient}?subject=${subject}&body=${mailBody}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/talent-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        error?: string;
        mailtoBody?: string;
        ok?: boolean;
      };

      if (!response.ok) {
        if (data.mailtoBody) {
          openMailtoFallback(data.mailtoBody);
        }
        setError(
          data.error ??
            `Could not send online. Please email ${talentRegistrationRecipient} directly.`
        );
        if (data.mailtoBody) {
          PopupStorage.markRegistrationSubmitted();
          setSubmitted(true);
        }
        return;
      }

      PopupStorage.markRegistrationSubmitted();
      setSubmitted(true);
    } catch {
      setError(`Network error. Please try again or email ${talentRegistrationRecipient}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="popup-overlay popup-overlay-visible"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="popup-registration-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="talent-registration-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="popup-close"
          aria-label="Close registration form"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="popup-registration-success">
            <p className="text-ms-gold font-bold text-xl mb-2">Application submitted!</p>
            <p className="text-ms-text-muted text-sm leading-relaxed">
              Your details have been sent to{" "}
              <a href={`mailto:${talentRegistrationRecipient}`} className="text-ms-blue font-semibold">
                {talentRegistrationRecipient}
              </a>
              . Our team will contact you within 24–48 hours with next steps.
            </p>
            <button type="button" onClick={onClose} className="btn-primary mt-6 w-full justify-center">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="popup-registration-header">
              <span className="popup-eyebrow">MSIA Talent Program</span>
              <h2 id="talent-registration-title" className="popup-registration-title">
                Register for European Scout Exposure
              </h2>
              <p className="popup-registration-subtitle">
                Players aged 13–17 · WSH International Tournament · December 8–17
              </p>
              <p className="popup-registration-note">
                Form submissions go to{" "}
                <a href={`mailto:${talentRegistrationRecipient}`} className="text-ms-blue font-semibold">
                  {talentRegistrationRecipient}
                </a>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="popup-registration-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Player&apos;s Name</label>
                  <input
                    type="text"
                    required
                    value={form.playerName}
                    onChange={(e) => setForm({ ...form, playerName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Parent / Guardian Name</label>
                  <input
                    type="text"
                    required
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Player&apos;s Age</label>
                  <input
                    type="number"
                    required
                    min={13}
                    max={17}
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className={inputClass}
                    placeholder="13–17"
                  />
                </div>
                <div>
                  <label className={labelClass}>Gender</label>
                  <select
                    required
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Position</label>
                  <select
                    required
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select</option>
                    <option value="goalkeeper">Goalkeeper</option>
                    <option value="defender">Defender</option>
                    <option value="midfielder">Midfielder</option>
                    <option value="striker">Striker</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Current Academy or School Team</label>
                  <input
                    type="text"
                    required
                    value={form.club}
                    onChange={(e) => setForm({ ...form, club: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>How did you hear about us?</label>
                  <select
                    required
                    value={form.referral}
                    onChange={(e) => setForm({ ...form, referral: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select source</option>
                    {referralSources.map((source) => (
                      <option key={source.value} value={source.value}>
                        {source.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Additional Information</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Playing experience, achievements, or questions"
                  className={`${inputClass} resize-y min-h-[88px]`}
                />
              </div>

              {error && (
                <p className="text-sm text-ms-red font-medium leading-relaxed" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center mt-2 disabled:opacity-70"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {loading ? "Sending…" : "Submit Registration"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
