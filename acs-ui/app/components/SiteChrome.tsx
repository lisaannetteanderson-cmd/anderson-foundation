import Link from 'next/link';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export function Header({ active = 'Home' }: { active?: string }) {
  return (
    <header className="site-header">
      <div className="wrap header-in">
        <Link href="/" className="logo" aria-label="Anderson Cleaning Services home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Anderson Cleaning Services" width={700} height={168} />
        </Link>
        <nav aria-label="Main">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className={l.label === active ? 'active' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn-primary header-cta">
          Get a Free Quote
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-in">
        <Link href="/" className="footer-logo" aria-label="Anderson Cleaning Services home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-light.png" alt="Anderson Cleaning Services" width={430} height={106} />
        </Link>
        <nav ar���q�^