import { NextResponse } from "next/server";
import {
  formatTalentRegistrationEmailBody,
  talentRegistrationEmailSubject,
  talentRegistrationRecipient,
  type TalentRegistrationPayload,
} from "@/lib/share";

function isValidPayload(body: unknown): body is TalentRegistrationPayload {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  const required = [
    "playerName",
    "parentName",
    "email",
    "phone",
    "age",
    "gender",
    "position",
    "club",
    "referral",
  ];

  return required.every((key) => typeof data[key] === "string" && data[key].toString().trim());
}

/**
 * Submissions are forwarded to info@mentorsportsintug.com via FormSubmit.
 * On first use, FormSubmit sends a confirmation email to activate the address.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidPayload(body)) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const payload: TalentRegistrationPayload = {
      playerName: body.playerName.trim(),
      parentName: body.parentName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      age: body.age.trim(),
      gender: body.gender.trim(),
      position: body.position.trim(),
      club: body.club.trim(),
      referral: body.referral.trim(),
      message: typeof body.message === "string" ? body.message.trim() : "",
    };

    const emailBody = formatTalentRegistrationEmailBody(payload);

    const formSubmitResponse = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(talentRegistrationRecipient)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: talentRegistrationEmailSubject,
          _template: "table",
          _captcha: "false",
          "Player Name": payload.playerName,
          "Parent / Guardian": payload.parentName,
          Email: payload.email,
          Phone: payload.phone,
          Age: payload.age,
          Gender: payload.gender,
          Position: payload.position,
          "Current Academy or School Team": payload.club,
          Referral: payload.referral,
          "Additional Information": payload.message || "—",
          _replyto: payload.email,
        }),
      }
    );

    if (!formSubmitResponse.ok) {
      return NextResponse.json(
        {
          error: `Could not send registration. Please email ${talentRegistrationRecipient} directly.`,
          mailtoBody: emailBody,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      recipient: talentRegistrationRecipient,
    });
  } catch {
    return NextResponse.json(
      { error: `Something went wrong. Please try again or email ${talentRegistrationRecipient}.` },
      { status: 500 }
    );
  }
}
