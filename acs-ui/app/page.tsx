import Link from 'next/link';
import { Header, Footer } from './components/SiteChrome';

const services=[
  {title:'Residential Cleaning',desc:'Keep your home fresh, clean, and comfortable.',icon:'home'},
  {title:'Commercial Cleaning',desc:'A clean workspace boosts productivity and makes a great impression.',icon:'building'},
  {title:'Deep Cleaning',desc:'A more thorough clean for a healthier space.',icon:'sparkles'},
  {title:'Move-In/Move-Out Cleaning',desc:'Start fresh in a spotless space.',icon:'calendar'},
  {title:'Customized Cleaning Plans',desc:'Flexible options to fit your schedule and budget.',icon:'gear'}
];

function Icon({type}:{type:string}){
  const c={width:32,height:32,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.9,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  if(type==='home')return <svg {...c}><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/></svg>;
  if(type==='building')return <svg {...c}><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7.5h2M13 7.5h2M9 11.5h2M13 11.5h2M9 15.5h2M13 15.5h2"/></svg>;
  if(type==='sparkles')return <svg {...c}><path d="M12 3.5c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"/><path d="M19 3v3M17.5 4.5h3M5 4v2M4 5h2"/></svg>;
  if(type==='calendar')return <svg {...c}><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8.5 3v4M15.5 3v4"/><path d="m9 15 2 2 4-4"/></svg>;
  return <svg {...c}><circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v2.3M12 18.2v2.3M3.5 12h2.3M18.2 12h2.3M5.9 5.9l1.6 1.6M16.5 16.5l1.6 1.6M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6"/></svg>;
}

export default function HomePage(){
  return <>
    <Header active="Home"/>
    <main>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">CLEAN SPACES. HEALTHY PLACES.</p>
          <h1>Professional Cleaning<br/>Services You Can Trust</h1>
          <p className="hero-lead">At Anderson Cleaning Services, we take pride in delivering reliable, detailed, and affordable cleaning solutions for homes and businesses. Let us handle the cleaning, so you can enjoy a cleaner, healthier space.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/contact">Get a Free Quote</Link>
            <Link className="btn btn-outline" href="/services">Our Services</Link>
          </div>
        </div>
        <div className="home-hero-photo" aria-hidden="true">
          <div style={{position:'absolute',right:'4.5%',bottom:'34px',zIndex:4,color:'#fff',fontFamily:'"Brush Script MT","Segoe Script",cursive',fontSize:'34px',lineHeight:'.95',fontStyle:'italic',textAlign:'center',textShadow:'0 2px 5px rgba(0,0,0,.25)',transform:'rotate(-2deg)'}}>
            A cleaner home is<br/>a happier home
            <span style={{display:'block',width:'105px',height:'8px',margin:'5px auto 0',borderRadius:'100%',background:'#0795dc',transform:'rotate(-6deg)'}}/>
          </div>
        </div>
      </section>

      <section className="home-services">
        <div className="home-section-heading">
          <h2>Our Cleaning Services</h2>
          <p>We offer a range of cleaning services tailored to your needs.</p>
        </div>
        <div className="service-row">
          {services.map(s=><article className="service-item" key={s.title}>
            <div className="service-icon"><Icon type={s.icon}/></div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </article>)}
        </div>
      </section>

      <section className="difference-band">
        <div className="difference-copy">
          <h2>The Anderson<br/>Difference</h2>
          <p>Our team of dedicated professionals is committed to delivering exceptional results. From sparkling kitchens to freshened living spaces, we bring care and attention to every detail.</p>
          <Link className="btn btn-primary" href="/gallery">View More Photos</Link>
        </div>
        <div className="gallery-collage" aria-label="Anderson Cleaning Services gallery">
          <div className="gallery-main-photo"/>
          <div className="gallery-top-grid"><div className="gallery-kitchen"/><div className="gallery-bedroom"/></div>
          <div className="gallery-bottom-grid">
            <div className="before-after"><span>Before</span><div className="ba-before"/><span>After</span><div className="ba-after"/></div>
            <div className="gallery-living"/>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="cta-icon"><Icon type="calendar"/></div>
        <div><h2>Ready for a Cleaner Space?</h2><p>Get your free quote today and experience the Anderson difference.</p></div>
        <Link className="btn btn-primary" href="/contact">Get a Free Quote</Link>
      </section>
    </main>
    <Footer/>
  </>;
}