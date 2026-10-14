"use client";

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export default function QuotePage() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus('');
    setError(false);
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, formType: 'quote' }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your quote request could not be sent. Please try again.');
      setStatus('Your quote request has been sent. We’ll review the details and follow up using the contact information you provided.');
      form.reset();
    } catch (err) {
      setError(true);
      setStatus(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us directly.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Header active="Contact" />
      <main>
        <section className="quote-hero">
          <div className="wrap quote-hero-grid">
            <div><p className="eyebrow">Free, no-obligation quote request</p><h1>Tell us about your space.</h1><p className="lead">Share a few details about the cleaning you need. We’ll review your request and contact you to discuss the scope and next steps.</p><a className="quote-call-link" href="tel:+13462071721">Prefer to talk? Call (346) 207-1721</a></div>
            <div className="quote-hero-photo"><img src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=85" alt="Clean, bright home interior" /></div>
          </div>
        </section>
        <section className="services quote-section">
          <div className="wrap quote-form-layout">
            <aside className="quote-sidebar"><p className="eyebrow">What happens next</p><h2>A simple, clear process.</h2><ol><li>Tell us about your property and priorities.</li><li>We’ll review the information and contact you.</li><li>We’ll discuss the service scope and scheduling before confirming anything.</li></ol><div className="quote-safe-note"><strong>Your privacy matters.</strong><p>Please do not include passwords, payment-card details, Social Security numbers, or identity-document images.</p></div></aside>
            <form className="quote-form" onSubmit={submitQuote}>
              <div className="quote-form-heading"><p className="eyebrow">Quote details</p><h2>Request your free quote</h2><p>Fields marked with * are required.</p></div>
              <div className="quote-fields">
                <label className="form-field">Full name *<input name="fullName" required autoComplete="name" maxLength={120} /></label>
                <label className="form-field">Email address *<input name="email" type="email" required autoComplete="email" maxLength={254} /></label>
                <label className="form-field">Phone number *<input name="phone" type="tel" required autoComplete="tel" maxLength={40} /></label>
                <label className="form-field">Service needed *<select name="serviceType" required defaultValue=""><option value="" disabled>Select a service</option><option>Residential cleaning</option><option>Commercial cleaning</option><option>Deep cleaning</option><option>Move-in / move-out cleaning</option><option>Recurring cleaning</option><option>Custom cleaning plan</option><option>Other / not sure yet</option></select></label>
                <label className="form-field">Property type *<select name="propertyType" required defaultValue=""><option value="" disabled>Select property type</option><option>House</option><option>Apartment / condo</option><option>Office / commercial</option><option>Other</option></select></label>
                <label className="form-field">Approximate property size<select name="propertySize" defaultValue=""><option value="">Select size (optional)</option><option>Under 1,000 sq. ft.</option><option>1,000–1,999 sq. ft.</option><option>2,000–2,999 sq. ft.</option><option>3,000+ sq. ft.</option><option>Not sure</option></select></label>
                <label className="form-field">ZIP code *<input name="zipCode" inputMode="numeric" autoComplete="postal-code" required maxLength={10} pattern="[0-9]{5}(-[0-9]{4})?" placeholder="e.g. 93550" /></label>
                <label className="form-field">Preferred date (optional)<input name="preferredDate" type="date" /></label>
                <label className="form-field quote-wide">Tell us more (optional)<textarea name="details" rows={5} maxLength={4000} placeholder="Number of rooms, priorities, frequency, or anything else that will help us understand the job." /></label>
                <label className="form-field spam-field">Leave blank (spam check)<input name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <div className="quote-submit-row"><button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Sending request…' : 'Request My Free Quote'}</button><p className={error ? 'form-status is-error' : 'form-status'} role="status" aria-live="polite">{status}</p></div>
              <p className="quote-privacy-copy">By submitting, you agree that Anderson Cleaning Services may use these details to respond to your request. Do not submit sensitive identity or financial information.</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
