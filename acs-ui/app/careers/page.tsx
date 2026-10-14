import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Careers | Anderson Cleaning Services',
  description: 'Explore cleaning assistant opportunities with Anderson Cleaning Services.',
};

const benefits = [
  { title: 'Flexible scheduling', description: 'Discuss full-time, part-time, and weekend availability with our team.' },
  { title: 'Training and support', description: 'Learn consistent cleaning standards and safe work practices.' },
  { title: 'Meaningful work', description: 'Help clients maintain clean, comfortable homes and workplaces.' },
];

export default function CareersPage() {
  return (
    <>
      <Header active="Careers" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">Careers at Anderson</p>
            <h1>Bring care to every clean.</h1>
            <p className="lead">
              We are interested in dependable, detail-oriented people who take pride in their work.
              Explore the cleaning assistant role and contact us to discuss your experience.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
              <Link href="#open-role" className="btn btn-primary">View open role</Link>
              <Link href="/contact" className="btn btn-outline">Contact our team</Link>
            </div>
          </div>
        </section>

        <section className="services">
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {benefits.map((benefit) => (
                <article key={benefit.title} style={{ padding: 24, border: '1px solid #d5e3ee', borderRadius: 18, background: '#fff' }}>
                  <h2 style={{ fontSize: '1.35rem', marginBottom: 10 }}>{benefit.title}</h2>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>

            <article id="open-role" style={{ marginTop: 36, padding: 'clamp(24px, 4vw, 40px)', borderRadius: 20, background: '#f3f8fb', border: '1px solid #d5e3ee' }}>
              <p className="eyebrow">Current opportunity</p>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', marginBottom: 12 }}>Cleaning Assistant</h2>
              <p>Support residential and commercial cleaning appointments, follow checklists, handle supplies responsibly, and treat every client’s space with respect.</p>
              <ul style={{ paddingLeft: 22, marginTop: 16 }}>
                <li>Location: Palmdale area and assigned service routes</li>
                <li>Schedule: Discussed based on availability and business needs</li>
                <li>Experience: Relevant experience is helpful; reliability and attention to detail matter</li>
              </ul>
              <p style={{ marginTop: 18 }}>To express interest, use our contact page and mention “Cleaning Assistant application.” Please include only basic contact details and relevant work experience in your initial message.</p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: 18 }}>Ask about this role</Link>
            </article>

            <aside style={{ marginTop: 24, padding: 22, borderLeft: '4px solid #0879c9', background: '#fff', borderRadius: 8 }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Applicant privacy and screening</h2>
              <p>Do not send Social Security numbers, identity document images, bank details, passwords, or other sensitive personal information through the public website or ordinary email. If screening is required for a position, the process should begin with the appropriate disclosure and authorization and use a secure screening provider.</p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
