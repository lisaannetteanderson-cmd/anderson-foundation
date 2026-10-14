import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Cleaning Services | Anderson Cleaning Services',
  description: 'Explore residential, commercial, deep, and move-in or move-out cleaning services from Anderson Cleaning Services in the Palmdale area.',
};

const services = [
  {
    number: '01',
    title: 'Residential Cleaning',
    description: 'Routine care for houses, apartments, and condos so your space feels fresh and comfortable.',
    tasks: ['Kitchen and bathroom surfaces', 'Dusting, vacuuming, and mopping', 'Bedrooms and shared living areas'],
  },
  {
    number: '02',
    title: 'Commercial Cleaning',
    description: 'Dependable cleaning for offices, retail spaces, and shared work environments.',
    tasks: ['Work areas and common spaces', 'Restrooms and break rooms', 'Trash removal and surface care'],
  },
  {
    number: '03',
    title: 'Deep Cleaning',
    description: 'A more detailed reset for areas that need extra time and attention.',
    tasks: ['Detail-focused surface cleaning', 'Hard-to-reach areas where accessible', 'Additional tasks agreed before the visit'],
  },
  {
    number: '04',
    title: 'Move-In / Move-Out',
    description: 'Help prepare a home for a new occupant or leave a space tidy after moving.',
    tasks: ['Cabinets and reachable surfaces', 'Kitchen and bathroom refresh', 'Floor care and room-by-room checklist'],
  },
  {
    number: '05',
    title: 'Recurring Cleaning',
    description: 'A practical schedule that helps you stay on top of regular upkeep.',
    tasks: ['Weekly or biweekly options', 'Consistent task priorities', 'Scheduling based on your needs'],
  },
  {
    number: '06',
    title: 'Custom Cleaning Plan',
    description: 'Tell us what matters most and we can discuss a plan tailored to your space.',
    tasks: ['Prioritized task list', 'Residential or workplace needs', 'Clear scope before work begins'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header active="Services" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">Our services</p>
            <h1>A cleaner space, built around you.</h1>
            <p className="lead">From routine upkeep to a more detailed refresh, explore cleaning options for homes and workplaces in the Palmdale area.</p>
            <Link href="/contact" className="btn btn-primary" style={{ marginTop: 22 }}>Request a quote</Link>
          </div>
        </section>
        <section className="services">
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {services.map((service) => (
                <article key={service.number} style={{ padding: 26, border: '1px solid #d5e3ee', borderRadius: 18, background: '#fff', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ display: 'inline-grid', placeItems: 'center', width: 44, height: 44, borderRadius: 13, background: '#e7f4fe', color: '#0879c9', fontWeight: 800 }}>{service.number}</span>
                  <h2 style={{ fontSize: '1.45rem', marginTop: 18, marginBottom: 10 }}>{service.title}</h2>
                  <p>{service.description}</p>
                  <ul style={{ paddingLeft: 20, marginTop: 14, marginBottom: 22 }}>
                    {service.tasks.map((task) => <li key={task} style={{ marginBottom: 7 }}>{task}</li>)}
                  </ul>
                  <div style={{ marginTop: 'auto' }}><Link href="/contact" className="btn btn-outline">Ask about this service</Link></div>
                </article>
              ))}
            </div>
            <div style={{ marginTop: 34, padding: 'clamp(24px, 4vw, 40px)', borderRadius: 20, background: '#102849', color: '#fff' }}>
              <p style={{ color: '#9dd7ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em' }}>Not sure what you need?</p>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginTop: 8 }}>Let’s find the right cleaning plan.</h2>
              <p style={{ color: '#e3edf7', maxWidth: 700, marginTop: 12 }}>Share the type of space, your priorities, and preferred timing. We’ll discuss the scope and next steps with you.</p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: 18 }}>Contact Anderson Cleaning Services</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
