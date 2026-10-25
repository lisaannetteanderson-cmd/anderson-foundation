import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 10 * 1024;
const BIDI_CONTROLS = /[\u202A-\u202E\u2066-\u2069]/g;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const INVALID_REQUEST = 'Invalid request. Please check your entries and try again.';

function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.normalize('NFC').replace(CONTROL_CHARS, '').replace(BIDI_CONTROLS, '').trim().slice(0, max);
}

function hasDangerousKeys(value: unknown, depth = 0): boolean {
  if (!value || typeof value !== 'object' || depth > 8) return depth > 8;
  for (const key of Object.keys(value)) {
    if (key === '__proto__' || key === 'prototype' || key === 'constructor') return true;
    if (hasDangerousKeys((value as Record<string, unknown>)[key], depth + 1)) return true;
  }
  return false;
}

function badRequest(status = 400) {
  return NextResponse.json({ error: INVALID_REQUEST }, { status });
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().startsWith('application/json')) return badRequest(415);

    // Same-origin browser requests only. Requests without Origin remain supported for non-browser integrations.
    const origin = request.headers.get('origin');
    if (origin) {
      const requestOrigin = new URL(request.url).origin;
      if (origin !== requestOrigin) return badRequest(403);
    }

    const declaredLength = Number(request.headers.get('content-length') || 0);
    if (declaredLength > MAX_BODY_BYTES) return badRequest(413);
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return badRequest(413);

    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch { return badRequest(); }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed) || hasDangerousKeys(parsed)) return badRequest();
    const body = parsed as Record<string, unknown>;

    // Honeypot: respond generically and do not trigger email delivery.
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });

    const type = body.formType === 'application' ? 'application' : body.formType === 'quote' ? 'quote' : body.formType === 'contact' ? 'contact' : null;
    if (!type) return badRequest();
    const formType = type === 'application' ? 'Employment application' : type === 'quote' ? 'Free quote request' : 'Website contact';

    const fullName = clean(body.fullName, 120);
    const email = clean(body.email, 254);
    const phone = clean(body.phone, 40);
    if (!fullName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return badRequest();
    if (type === 'application' && body.dataConsent !== 'yes') return badRequest();

    const serviceType = clean(body.serviceType, 120);
    const propertyType = clean(body.propertyType, 120);
    const zipCode = clean(body.zipCode, 10);
    if (type === 'quote' && (!phone || !serviceType || !propertyType || !/^[0-9]{5}(?:-[0-9]{4})?$/.test(zipCode))) return badRequest();

    const fields: [string, string][] = type === 'application'
      ? [
          ['Name', fullName], ['Email', email], ['Phone', phone], ['Location', clean(body.location, 120)],
          ['Position', clean(body.position, 120)], ['Availability', clean(body.availability, 120)],
          ['Experience', clean(body.experience, 4000)], ['Additional information', clean(body.additionalInfo, 2000)],
          ['Applicant data terms accepted', 'Yes'],
        ]
      : type === 'quote'
        ? [
            ['Name', fullName], ['Email', email], ['Phone', phone], ['Service needed', serviceType],
            ['Property type', propertyType], ['Approximate property size', clean(body.propertySize, 80)],
            ['ZIP code', zipCode], ['Preferred date', clean(body.preferredDate, 20)],
            ['Additional details', clean(body.details, 4000)],
          ]
        : [
            ['Name', fullName], ['Email', email], ['Phone', phone], ['Reason', clean(body.reason, 120)],
            ['Property type', propertyType], ['Message', clean(body.message, 4000)],
          ];

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.RESEND_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !to || !from) {
      console.error('Email delivery configuration is incomplete.');
      return NextResponse.json({ error: 'The message service is temporarily unavailable. Please try again later.' }, { status: 503 });
    }

    const textBody = fields.map(([label, value]) => label + ':\n' + (value || '(not provided)')).join('\n\n');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from, to: [to], reply_to: email,
        subject: formType + ' — ' + fullName,
        text: formType + '\n\n' + textBody + '\n\nSubmitted via Anderson Cleaning Services website.',
      }),
    });
    if (!response.ok) {
      console.error('Email delivery provider returned status:', response.status);
      return NextResponse.json({ error: 'We could not send your message right now. Please try again later.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    console.error('Contact form request failed.');
    return badRequest();
  }
}
