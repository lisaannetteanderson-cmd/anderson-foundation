"use client";

import Link from 'next/link';
import { useState } from 'react';

const PHONE = '+13462071721';
const links = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export function Header({ active = 'Home' }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap header-in">
        <Link href="/" className="logo" aria-label="Anderson Cleaning Services home" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="Anderson Cleaning Services" width={336} height={76} />
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
        <nav id="main-navigation" className={menuOpen ? 'main-navigation is-open' : 'main-navigation'} aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className={link.label === active ? 'active' : undefined} aria-current={link.label === active ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{link.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <a href={`tel:${PHONE}`} className="btn btn-outline header-call"><span aria-hidden="true">☎</span><span>Call Now</span></a>
          <Link href="/quote" className="btn btn-primary header-cta">Get a Free Quote</Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="wrap footer-in">
          <Link href="/" className="footer-logo" aria-label="Anderson Cleaning Services home">
            <img src="/logo-light.png" alt="Anderson Cleaning Services" width={430} height={106} />
          </Link>
          <nav aria-label="Footer navigation">
            {links.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
            <Link href="/quote">Get a Free Quote</Link>
          </nav>
          <p>Anderson Cleaning Services · Serving Palmdale and surrounding communities</p>
          <p><a href={`tel:${PHONE}`}>Call (346) 207-1721</a></p>
        </div>
      </footer>
      <div className="mobile-action-bar" aria-label="Quick contact actions">
        <a href={`tel:${PHONE}`} className="mobile-call"><span aria-hidden="true">☎</span> Call Now</a>
        <Link href="/quote" className="mobile-quote"><span aria-hidden="true">▣</span> Get a Free Quote</Link>
      </div>
    </>
  );
}
