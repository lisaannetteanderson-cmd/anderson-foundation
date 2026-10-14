import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'About Us | Anderson Cleaning Services',
  description: 'Learn about Anderson Cleaning Services, our values, and our commitment to dependable cleaning.',
};

const values = [
  { title: 'Reliability', desc: 'Clear communication, dependable scheduling, and consistent care for every space.' },
  { title: 'Attention to detail', desc: 'We focus on the small details that help a room feel genuinely refreshed.' },
  { title: 'Trust and respect', desc: 'We treat your home, workplace, time, and privacy with care.' },
  { title: 'A better everyday', desc: 'A clean, comfortable space gives you more room to focus on what matters.' },
];

export default function AboutPage() {
  return (
    <>
      <Header active="About Us" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">About Anderson</p>
            <h1>Thoughtful cleaning. A fresh start.</h1>
            <p className="lead">Anderson Cleaning Services helps homes and workplaces feel cleaner, calmer, and ready for what comes next.</p>
          </div>
        </section>
        <section className="services">
          <div className="wrap">
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:22}}>
              {values.map((item, i) => (
                <article key={item.title} style={{padding:26,border:'1px solid #d5e3ee',borderRadius:18,background:i===1?'#f3f8fb':'#fff'}}>
                  <span style={{display:'inline-grid',placeItems:'center',width:42,height:42,borderRadius:12,background:'#e7f4fe',color:'#0168b0',fontWeight:800}}>{String(i+1).padStart(2,'0')}</span>
                  <h2 style={{fontSize:'1.55rem',marginTop:18,marginBottom:10}}>{item.title}</h2>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
            <div style={{marginTop:42,padding:'clamp(24px,5vw,48px)',borderRadius:22,background:'#102849',color:'#fff'}}>
              <p style={{color:'#9dd7ff',fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em'}}>Our promise</p>
              <h2 style={{color:'#fff',fontSize:'clamp(2rem,4vw,3rem)',maxWidth:760,marginTop:10}}>Professional service that respects your space.</h2>
              <p style={{maxWidth:680,color:'#e3edf7',marginTop:14}}>From routine upkeep to a deeper reset, we work to make the process straightforward, respectful, and tailored to your needs.</p>
              <Link href="/contact" className="btn btn-primary" style={{marginTop:20}}>Request a free quote</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
