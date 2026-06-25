"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { referralSources } from "@/data/content";

interface ContactFormProps {
  variant?: "contact" | "trials";
}

export default function ContactForm({ variant = "contact" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    playerName: "",
    parentName: "",
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    position: "",
    residency: "",
    referral: "",
    previousAcademy: "",
    previousAcademyName: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-white border border-ms-border text-ms-text focus:outline-none focus:border-ms-blue focus:ring-2 focus:ring-ms-blue/10 transition-colors";
  const labelClass =
    "block text-xs font-bold uppercase tracking-wider text-ms-text-muted mb-1.5";

  if (submitted) {
    return (
      <div className="bg-ms-gray rounded-xl p-8 text-center border border-ms-border">
        <p className="text-ms-gold font-bold text-lg mb-2">
          {variant === "trials" ? "Application submitted!" : "Message sent!"}
        </p>
        <p className="text-ms-text-muted text-sm">
          We&apos;ll get back to you within 24–48 hours.
        </p>
      </div>
    );
  }

  if (variant === "trials") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className={labelClass}>Parent&apos;s Name</label>
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
              type="text"
              required
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className={inputClass}
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
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Desired Position</label>
            <select
              required
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className={inputClass}
            >
              <option value="">Select position</option>
              <option value="goalkeeper">Goal Keeper</option>
              <option value="defender">Defender</option>
              <option value="midfielder">Midfielder</option>
              <option value="striker">Striker</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Registration Type</label>
            <select
              required
              value={form.residency}
              onChange={(e) => setForm({ ...form, residency: e.target.value })}
              className={inputClass}
            >
              <option value="">Select type</option>
              <option value="local">Local (UGX 350,000 membership)</option>
              <option value="international">International (USD 100 membership)</option>
            </select>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Previously at another academy?</label>
            <select
              required
              value={form.previousAcademy}
              onChange={(e) =>
                setForm({ ...form, previousAcademy: e.target.value, previousAcademyName: "" })
              }
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {form.previousAcademy === "yes" && (
            <div>
              <label className={labelClass}>Previous academy name</label>
              <input
                type="text"
                required
                value={form.previousAcademyName}
                onChange={(e) => setForm({ ...form, previousAcademyName: e.target.value })}
                className={inputClass}
              />
            </div>
          )}
        </div>

        <div>
          <label className={labelClass}>Additional Information</label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Medical notes, preferred training location, or other details"
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-ms-red text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-lg hover:bg-ms-red-dark transition-colors"
        >
          <Send size={16} />
          Submit Registration
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
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
      </div>

      <div>
        <label className={labelClass}>Phone</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>How did you hear about us?</label>
        <select
          value={form.referral}
          onChange={(e) => setForm({ ...form, referral: e.target.value })}
          className={inputClass}
        >
          <option value="">Select source (optional)</option>
          {referralSources.map((source) => (
            <option key={source.value} value={source.value}>
              {source.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help you?"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-ms-red text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-lg hover:bg-ms-red-dark transition-colors"
      >
        <Send size={16} />
        Send Message
      </button>
    </form>
  );
}
