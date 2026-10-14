import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const clean = (value: unknown, max = 2000) =>
  typeof value === 'string' ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, max) : '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Please submit a valid form.' }, { status: 400 });
    }
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });
    const type = body.formType === 'application' ? 'application' : body.formType === 'quote' ? 'quote' : 'contact';
    const formType = type === 'application' ? 'Employment application' : type === 'quote' ? 'Free quote request' : 'Website contact';
    const fullName = clean(body.fullName, 120);
    const email = clean(body.email, 254);
    const phone = clean(body.phone, 40);
    if (!fullName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide your name and a valid email address.' }, { status: 400 });
    }
    if (type === 'application' && body.dataConsent !== 'yes') {
      return NextResponse.json({ error: 'Please agree to the applicant data terms before submitting.' }, { status: 400 });
    }
    if (type === 'quote' && (!phone || !clean(body.serviceType, 120) || !clean(body.propertyType, 120) || !/^[0-9]{5}(-[0-9]{4})?$/.test(clean(body.zipCode, 10)))) {
      return NextResponse.json({ error: 'Please provide a phone number, service type, property type, and valid ZIP code.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.RESEND_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !to || !from) {
      console.error('Email delivery is not configured: set RESEND_API_KEY, RESEND_TO_EMAIL (or CONTACT_TO_EMAIL), and RESEND_FROM_EMAIL.');
      return NextResponse.json({ error: 'The message service is not fully configured yet. Please try again later or contact the business through its established channel.' }, { status: 503 });
    }

    const fields: [string, string][] = type === 'application'
      ? [
          ['Name', fullName], ['Email', email], ['Phone', phone], ['Location', clean(body.location, 120)],
          ['Position', clean(body.position, 120)], ['Availability', clean(body.availability, 120)],
          ['Experience', clean(body.experience, 4000)], ['Additional information', clean(body.additionalInfo, 2000)],
          ['Applicant data terms accepted', 'Yes'],
        ]
      : type === 'quote'
        ? [
            ['Name', fullName], ['Email', email], ['Phone', phone], ['Service needed', clean(body.serviceType, 120)],
            ['Property type', clean(body.propertyType, 120)], ['Approximate property size', clean(body.propertySize, 80)],
            ['ZIP code', clean(body.zipCode, 10)], ['Preferred date', clean(body.preferredDate, 20)],
            ['Additional details', clean(body.details, 4000)],
          ]
        : [
            ['Name', fullName], ['Email', email], ['Phone', phone], ['Reason', clean(body.reason, 120)],
            ['Property type', clean(body.propertyType, 120)], ['Message', clean(body.message, 5000)],
          ];
    const textBody = fields.map(([label, value]) => label + ':\n' + (value || '(not provided)')).join('\n\n');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: formType + ' — ' + fullName,
        text: formType + '\n\n' + textBody + '\n\nSubmitted via Anderson Cleaning Services website.',
      }),
    });
    if (!response.ok) {
      const details = await response.text();
      console.error('Resend delivery failed:', response.status, details.slice(0, 500));
      return NextResponse.json({ error: 'We could not send your message right now. Please try again later.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Please check your entries and try submitting again.' }, { status: 400 });
  }
}
