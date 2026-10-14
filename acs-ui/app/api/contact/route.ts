import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const clean = (value: unknown, max = 2000) =>
  typeof value === 'string' ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, max) : '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });
    const formType = body.formType === 'application' ? 'Employment application' : 'Website contact';
    const fullName = clean(body.fullName, 120);
    const email = clean(body.email, 254);
    const phone = clean(body.phone, 40);
    if (!fullName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide your name and a valid email address.' }, { status: 400 });
    }
    if (body.formType === 'application' && body.dataConsent !== 'yes') {
      return NextResponse.json({ error: 'Please agree to the applicant data terms before submitting.' }, { status: 400 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.RESEND_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !to || !from) {
      console.error('Email delivery is not configured: set RESEND_API_KEY, RESEND_TO_EMAIL (or CONTACT_TO_EMAIL), and RESEND_FROM_EMAIL.');
      return NextResponse.json({ error: 'The message service is not fully configured yet. Please try again later or contact the business through its established channel.' }, { status: 503 });
    }

    const fields = body.formType === 'application'
      ? [
          ['Name', fullName], ['Email', email], ['Phone', phone], ['Location', clean(body.location, 120)],
          ['Position', clean(body.position, 120)], ['Availability', clean(body.availability, 120)],
          ['Experience', clean(body.experience, 4000)], ['Additional information', clean(body.additionalInfo, 2000)],
          ['Applicant data terms accepted', 'Yes'],
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
