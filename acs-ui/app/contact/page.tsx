"use client";

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, formType: 'contact' }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please try again.');
      setStatus('Your message has been sent. We will follow up as soon as we can.');
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Header active="Contact" />
      <main>
        <section className="page-hero" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', alignItems: 'center', gap: 28, paddingTop: 48, paddingBottom: 48 }}>
            <div>
              <p className="eyebrow">Get in touch</p>
              <h1>We’re here to help.</h1>
              <p className="lead">Request a quote, ask about a service, or send a question to Anderson Cleaning Services. Tell us what you need and we’ll review your message.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
                <Link href="/services" className="btn btn-primary">Explore services</Link>
                <Link href="/careers" className="btn btn-outline">Join our team</Link>
              </div>
            </div>
            <div style={{ minHeight: 260, borderRadius: 22, overflow: 'hidden', background: '#dcecf8' }}>
              <img src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=85" alt="Bright, freshly cleaned home interior" style={{ display: 'block', width: '100%', height: '100%', minHeight: 260, objectFit: 'cover' }} />
            </div>
          </div>
        </section>
        <section className="services">
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: 24, alignItems: 'start' }}>
            <aside style={{ padding: 26, border: '1px solid #d5e3ee', borderRadius: 18, background: '#fff' }}>
              <p className="eyebrow">Anderson Cleaning Services</p>
              <h2 style={{ fontSize: '1.6rem', margin: '10px 0' }}>How can we help?</h2>
              <p>We serve the Palmdale area and nearby routes, subject to service availability.</p>
              <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid #d5e3ee' }}>
                <strong>Service area</strong>
                <p style={{ marginTop: 6 }}>Palmdale and surrounding communities</p>
              </div>
              <div style={{ marginTop: 18 }}>
                <strong>Looking for work?</strong>
                <p style={{ marginTop: 6 }}>Use the dedicated careers page to submit your interest and applicant information.</p>
                <Link href="/careers" className="btn btn-primary" style={{ marginTop: 12 }}>Apply for a position</Link>
              </div>
            </aside>
            <section style={{ padding: 'clamp(20px, 3vw, 32px)', border: '1px solid #d5e3ee', borderRadius: 18, background: '#fff' }}>
              <p className="eyebrow">Send us a message</p>
              <h2 style={{ fontSize: '1.7rem', margin: '10px 0 20px' }}>Request a quote or ask a question</h2>
              <form onSubmit={submitContact} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16 }}>
                <label className="form-field">Your name *<input name="fullName" required autoComplete="name" maxLength={120} /></label>
                <label className="form-field">Email address *<input name="email" type="email" required autoComplete="email" maxLength={254} /></label>
                <label className="form-field">Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
                <label className="form-field">Reason for contact *<select name="reason" required defaultValue=""><option value="" disabled>Select a reason</option><option>Request a cleaning quote</option><option>Service question</option><option>Scheduling</option><option>Feedback</option><option>Other</option></select></label>
                <label className="form-field" style={{ gridColumn: '1 / -1' }}>Property type (optional)<select name="propertyType" defaultValue=""><option value="">Select property type</option><option>Residential</option><option>Commercial</option><option>Move-in / move-out</option><option>Other</option></select></label>
                <label className="form-field" style={{ gridColumn: '1 / -1' }}>Message *<textarea name="message" required rows={5} maxLength={5000} placeholder="Tell us about the service you need, your preferred timing, and any priorities." /></label>
                <label className="form-field" style={{ maxWidth: 260 }}>Leave blank (spam check)<input name="website" tabIndex={-1} autoComplete="off" /></label>
                <div style={{ gridColumn: '1 / -1' }}>
                  <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
                  <p role="status" aria-live="polite" style={{ marginTop: 12 }}>{status}</p>
                </div>
              </form>
              <p style={{ fontSize: '.9rem', marginTop: 18 }}>Please do not include payment card details, passwords, Social Security numbers, or identity document images in this form.</p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
