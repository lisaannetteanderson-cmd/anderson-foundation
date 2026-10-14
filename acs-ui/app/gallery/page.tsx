import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Cleaning Gallery | Anderson Cleaning Services',
  description: 'Explore the spaces, details, and finishing touches that inspire our cleaning work.',
};

const projects = [
  { title: 'Kitchen refresh', category: 'Kitchens', detail: 'Clear counters and a fresh, welcoming finish', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=85', size: 'large' },
  { title: 'Bright living space', category: 'Living areas', detail: 'A tidy, comfortable place to unwind', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85', size: 'normal' },
  { title: 'Bathroom details', category: 'Bathrooms', detail: 'A polished look with attention to the details', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=85', size: 'normal' },
  { title: 'Calm bedroom', category: 'Bedrooms', detail: 'Fresh linens and a peaceful finish', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85', size: 'normal' },
  { title: 'Open, airy interior', category: 'Living areas', detail: 'A refreshed space ready for everyday life', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85', size: 'large' },
  { title: 'Finishing touches', category: 'Details', detail: 'Small details that make a room feel complete', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85', size: 'normal' },
];

export default function GalleryPage() {
  return (
    <>
      <Header active="Gallery" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">The Gallery</p>
            <h1>A fresh perspective on clean.</h1>
            <p className="lead">Explore the spaces and finishing touches that inspire our work. Every visit is tailored to the home or workplace in front of us.</p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:24}}>
              <Link href="/contact" className="btn btn-primary">Plan your clean</Link>
              <a href="#gallery-grid" className="btn btn-outline">Explore the gallery</a>
            </div>
          </div>
        </section>
        <section className="services" id="gallery-grid">
          <div className="wrap">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:18,flexWrap:'wrap',marginBottom:28}}>
              <div>
                <p className="eyebrow">Spaces we care for</p>
                <h2 style={{fontSize:'clamp(1.9rem,3vw,2.7rem)'}}>The details make the difference.</h2>
              </div>
              <p style={{maxWidth:420,margin:0}}>Use these images as inspiration. Final results depend on the space, service selected, and its starting condition.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))',gap:22}}>
              {projects.map((project, index) => (
                <article key={project.title} style={{overflow:'hidden',borderRadius:18,border:'1px solid #d5e3ee',background:'#fff',boxShadow:'0 8px 24px rgba(16,40,73,.06)'}}>
                  <div style={{position:'relative',height:250,overflow:'hidden',background:'#e7f4fe'}}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.image} alt={project.title} loading={index < 2 ? 'eager' : 'lazy'} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .35s ease'}} />
                    <span style={{position:'absolute',left:16,top:16,padding:'7px 12px',borderRadius:999,background:'rgba(255,255,255,.94)',color:'#102849',fontSize:'.8rem',fontWeight:700}}>{project.category}</span>
                  </div>
                  <div style={{padding:22}}>
                    <h3 style={{fontSize:'1.45rem'}}>{project.title}</h3>
                    <p style={{margin:'8px 0 0'}}>{project.detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <div style={{marginTop:36,padding:'clamp(24px,4vw,40px)',borderRadius:22,background:'#e7f4fe',display:'flex',justifyContent:'space-between',alignItems:'center',gap:24,flexWrap:'wrap'}}>
              <div style={{maxWidth:650}}>
                <p className="eyebrow">Your space, your priorities</p>
                <h2 style={{fontSize:'clamp(1.8rem,3vw,2.4rem)'}}>Ready for your own before-and-after?</h2>
                <p style={{marginBottom:0}}>Tell us what you need and we’ll help you find the right cleaning service.</p>
              </div>
              <Link href="/contact" className="btn btn-primary">Get a free quote</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
