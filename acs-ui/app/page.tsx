import Link from 'next/link';
import { Header, Footer } from './components/SiteChrome';

const highlights = [
  { number: '01', title: 'Residential cleaning', description: 'Routine cleaning for homes, apartments, and the spaces where life happens.' },
  { number: '02', title: 'Commercial cleaning', description: 'Cleaning support for offices, retail spaces, and shared work environments.' },
  { number: '03', title: 'Deep cleaning', description: 'A more detailed refresh, with priorities agreed before the visit.' },
  { number: '04', title: 'Move-in / move-out', description: 'Prepare a space for its next chapter with a tailored cleaning plan.' },
];

export default function HomePage() {
  return (
    <>
      <Header active="Home" />
      <main>
        <section className="home-hero">
          <div className="wrap home-hero-grid">
            <div className="home-hero-copy">
              <p className="eyebrow">Anderson Cleaning Services · Palmdale area</p>
              <h1>A cleaner space. A better day.</h1>
              <p className="lead">Professional cleaning for homes and workplaces, with clear communication and a plan built around your space.</p>
              <div className="home-hero-actions">
                <Link href="/quote" className="btn btn-primary">Get a Free Quote <span aria-hidden="true">→</span></Link>
                <a href="tel:+13462071721" className="btn btn-outline"><span aria-hidden="true">☎</span> Call (346) 207-1721</a>
              </div>
              <ul className="hero-points">
                <li><span aria-hidden="true">✓</span> Residential and commercial options</li>
                <li><span aria-hidden="true">✓</span> Service plans tailored to your needs</li>
                <li><span aria-hidden="true">✓</span> Serving Palmdale and nearby communities</li>
              </ul>
            </div>
            <div className="home-hero-image">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85" alt="Professional cleaner caring for a bright home interior" fetchPriority="high" />
              <div className="image-note"><span className="note-mark" aria-hidden="true">✓</span><span><strong>Thoughtful, dependable cleaning</strong><small>A clear plan for your space and priorities</small></span></div>
            </div>
          </div>
        </section>

        <section className="home-intro section-space">
          <div className="wrap home-intro-grid">
            <div><p className="eyebrow">A fresh start begins here</p><h2>More time for what matters.</h2></div>
            <div><p>Cleaning should feel straightforward from the first question to the final walkthrough. Tell us about your space, what you need help with, and your preferred timing. We’ll review your request and discuss the next step.</p><Link href="/about" className="text-link">Get to know Anderson Cleaning Services <span aria-hidden="true">→</span></Link></div>
          </div>
        </section>

        <section className="home-services section-space">
          <div className="wrap">
            <div className="section-heading"><div><p className="eyebrow">How we can help</p><h2>Cleaning services for your space.</h2></div><Link href="/services" className="text-link">Explore all services <span aria-hidden="true">→</span></Link></div>
            <div className="home-service-grid">
              {highlights.map((service) => <article className="home-service-card" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><Link href="/quote" aria-label={`Get a quote for ${service.title}`} className="card-link">Request a quote <span aria-hidden="true">→</span></Link></article>)}
            </div>
          </div>
        </section>

        <section className="home-process section-space">
          <div className="wrap process-grid">
            <div><p className="eyebrow">Simple from start to finish</p><h2>A clear path to a cleaner space.</h2><p>We keep the process straightforward so you know what to expect.</p><Link href="/quote" className="btn btn-primary">Start Your Free Quote</Link></div>
            <ol className="process-list"><li><span>1</span><div><h3>Tell us what you need</h3><p>Share your property type, service, and preferred timing.</p></div></li><li><span>2</span><div><h3>Review the details</h3><p>We’ll review your request and follow up to clarify the scope.</p></div></li><li><span>3</span><div><h3>Agree on the plan</h3><p>Confirm the service details and scheduling before work begins.</p></div></li></ol>
          </div>
        </section>

        <section className="home-final-cta">
          <div className="wrap final-cta-inner"><div><p className="eyebrow">Ready when you are</p><h2>Let’s talk about your space.</h2><p>Request a free quote or call to discuss your cleaning needs.</p></div><div className="home-hero-actions"><Link href="/quote" className="btn btn-primary">Get a Free Quote <span aria-hidden="true">→</span></Link><a href="tel:+13462071721" className="btn btn-outline"><span aria-hidden="true">☎</span> Call Now</a></div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
