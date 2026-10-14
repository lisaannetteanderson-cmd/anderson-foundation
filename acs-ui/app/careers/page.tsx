"use client";

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

const benefits = [
  { icon: '✦', title: 'A supportive team', text: 'Work with people who value respect, consistency, and care.' },
  { icon: '◷', title: 'Flexible opportunities', text: 'Share your availability and discuss schedules that fit the role.' },
  { icon: '↗', title: 'Room to grow', text: 'Build practical skills in professional cleaning and client service.' },
];

export default function CareersPage() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('');
    setBusy(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, formType: 'application' }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Application could not be submitted. Please try again.');
      setStatus('Your application has been submitted. Our team will review it and follow up if there is a suitable next step.');
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Header active="Careers" />
      <main>
        <section className="page-hero" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', alignItems: 'center', gap: 28, paddingTop: 48, paddingBottom: 48 }}>
            <div>
              <p className="eyebrow">Join our team</p>
              <h1>Build a cleaner, brighter future with us.</h1>
              <p className="lead">Anderson Cleaning Services is interested in dependable, detail-oriented people who take pride in making homes and workplaces feel their best.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
                <Link href="#application" className="btn btn-primary">Apply for a position</Link>
                <Link href="/services" className="btn btn-outline">Explore our work</Link>
              </div>
            </div>
            <div style={{ minHeight: 300, borderRadius: 22, overflow: 'hidden', background: '#dcecf8' }}>
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85" alt="Professional cleaner carefully cleaning a bright home" style={{ display: 'block', width: '100%', height: '100%', minHeight: 300, objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        <section className="services">
          <div className="wrap">
            <div style={{ maxWidth: 700, marginBottom: 28 }}>
              <p className="eyebrow">Why work with us</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>Good work starts with good people.</h2>
              <p style={{ marginTop: 10 }}>We look for professionalism, care for clients’ spaces, and a willingness to follow safe, consistent cleaning practices.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 18 }}>
              {benefits.map((benefit) => (
                <article key={benefit.title} style={{ padding: 24, border: '1px solid #d5e3ee', borderRadius: 18, background: '#fff' }}>
                  <span aria-hidden="true" style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: 14, background: '#e7f4ff', color: '#0879c9', fontSize: 25, marginBottom: 16 }}>{benefit.icon}</span>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>

            <article id="open-role" style={{ marginTop: 36, padding: 'clamp(24px, 4vw, 40px)', borderRadius: 20, background: '#102849', color: '#fff' }}>
              <p style={{ color: '#9dd7ff', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Current opportunity</p>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', margin: '10px 0 12px' }}>Cleaning Assistant</h2>
              <p style={{ color: '#edf5fc', maxWidth: 780 }}>Assist with residential and commercial cleaning appointments, follow service checklists, use supplies responsibly, and treat every client and property with respect.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginTop: 22 }}>
                <p style={{ color: '#edf5fc' }}><strong>Location</strong><br />Palmdale area and assigned routes</p>
                <p style={{ color: '#edf5fc' }}><strong>Schedule</strong><br />Discussed according to availability and business needs</p>
                <p style={{ color: '#edf5fc' }}><strong>Experience</strong><br />Helpful, but reliability and attention to detail matter</p>
              </div>
            </article>

            <section id="application" style={{ marginTop: 42 }}>
              <div style={{ maxWidth: 760, marginBottom: 22 }}>
                <p className="eyebrow">Employment application</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Tell us about yourself.</h2>
                <p style={{ marginTop: 10 }}>Complete the fields below to express interest. Please do not submit Social Security numbers, identity document images, bank details, or passwords through this public form.</p>
              </div>
              <form onSubmit={submitApplication} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16, padding: 'clamp(20px, 3vw, 32px)', border: '1px solid #d5e3ee', borderRadius: 20, background: '#fff' }}>
                <label className="form-field">Full legal name *<input name="fullName" autoComplete="name" required maxLength={120} /></label>
                <label className="form-field">Email address *<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
                <label className="form-field">Phone number *<input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
                <label className="form-field">City and state *<input name="location" autoComplete="address-level2" required maxLength={120} placeholder="e.g. Palmdale, CA" /></label>
                <label className="form-field">Position applying for *<select name="position" required defaultValue=""><option value="" disabled>Select a position</option><option>Cleaning Assistant</option><option>Team Lead</option><option>Other / General Interest</option></select></label>
                <label className="form-field">Work availability *<select name="availability" required defaultValue=""><option value="" disabled>Select availability</option><option>Full-time</option><option>Part-time</option><option>Weekdays</option><option>Weekends</option><option>Flexible</option></select></label>
                <label className="form-field" style={{ gridColumn: '1 / -1' }}>Relevant experience and skills *<textarea name="experience" required rows={4} maxLength={4000} placeholder="Briefly describe relevant work experience, skills, and availability." /></label>
                <label className="form-field" style={{ gridColumn: '1 / -1' }}>Additional information (optional)<textarea name="additionalInfo" rows={3} maxLength={2000} placeholder="Anything else you would like us to know." /></label>
                <div style={{ gridColumn: '1 / -1', padding: 20, background: '#f1f8fd', borderRadius: 14, border: '1px solid #d5e3ee' }}>
                  <h3 style={{ marginBottom: 10 }}>Terms and conditions — use of applicant data</h3>
                  <p style={{ marginBottom: 10 }}>By checking the box below and submitting this form, I acknowledge and agree that:</p>
                  <ol style={{ paddingLeft: 22, display: 'grid', gap: 8 }}>
                    <li>The information I provide may be collected and used by Anderson Cleaning Services to review my application, contact me about this or future relevant openings, and administer the hiring process.</li>
                    <li>If I advance in the hiring process, the company may ask me to complete a separate identity-verification or background-screening process where lawful and relevant to the role.</li>
                    <li>Any background report requiring specific legal disclosures or authorization will be handled through a separate process before it is requested. This checkbox is not a standalone authorization for a consumer report.</li>
                    <li>My information may be shared with authorized service providers only as reasonably needed for recruiting, secure verification, screening, or legal compliance. Access should be limited to people who need it for these purposes.</li>
                    <li>I should provide accurate information and may contact the company to ask about or request correction of application information, subject to applicable law and recordkeeping requirements.</li>
                  </ol>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16, fontWeight: 600 }}>
                    <input type="checkbox" name="dataConsent" value="yes" required style={{ marginTop: 4, width: 18, height: 18, flexShrink: 0 }} />
                    I have read and agree to the applicant data terms above. *
                  </label>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-field" style={{ maxWidth: 260 }}>Leave blank (spam check)<input name="website" tabIndex={-1} autoComplete="off" /></label>
                  <button type="submit" className="btn btn-primary" disabled={busy} style={{ marginTop: 12 }}>{busy ? 'Submitting…' : 'Submit application'}</button>
                  <p aria-live="polite" role="status" style={{ marginTop: 12 }}>{status}</p>
                </div>
              </form>
              <p style={{ marginTop: 16, fontSize: '.92rem' }}>For your protection, do not upload ID documents or enter your Social Security number here. If identity verification is required, instructions for a secure verification process will be provided separately.</p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
