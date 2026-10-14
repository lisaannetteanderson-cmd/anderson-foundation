import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Contact | Anderson Cleaning Services',
  description: 'Contact Anderson Cleaning Services about cleaning options in the Palmdale area.',
};

export default function ContactPage() {
  return (
    <>
      <Header active="Contact" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">Contact us</p>
            <h1>Let’s make your space feel fresh.</h1>
            <p className="lead">Tell us about your cleaning needs and preferred timing. We can discuss service options and next steps.</p>
            <Link href="/services" className="btn btn-primary" style={{ marginTop: 22 }}>Explore services</Link>
          </div>
        </section>
        <section className="services">
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
            <article style={{ padding: 28, border: '1px solid #d5e3ee', borderRadius: 18, background: '#fff' }}>
              <p className="eyebrow">Get in touch</p>
              <h2 style={{ fontSize: '1.7rem', marginTop: 10 }}>Request a quote</h2>
              <p style={{ marginTop: 12 }}>Please use the contact details provided by your service representative to ask about scheduling, service options, and a quote.</p>
            </article>
            <article style={{ padding: 28, borderRadius: 18, background: '#102849', color: '#fff' }}>
              <p style={{ color: '#9dd7ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em' }}>Service area</p>
              <h2 style={{ color: '#fff', fontSize: '1.7rem', marginTop: 10 }}>Palmdale and nearby routes</h2>
              <p style={{ color: '#e3edf7', marginTop: 12 }}>Share the type of property and your priorities so we can discuss whether your location and requested service fit our schedule.</p>
              <Link href="/gallery" className="btn btn-primary" style={{ marginTop: 20 }}>View our gallery</Link>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
