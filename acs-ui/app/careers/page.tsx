import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Careers | Anderson Cleaning Services',
  description: 'Join the Anderson Cleaning Services team. See our open roles.',
};

const openRoles = [
  {
    title: 'Cleaning Assistant',
    type: 'Full-time / Part-time',
    location: 'On-site — residential & commercial routes',
    href: '/careers/cleaning-assistant',
    blurb: 'Help homes and businesses feel fresh, clean, and welcoming as part of our field team.',
  },
];

const perks = [
  { title: 'Flexible Scheduling', desc: 'Full-time, part-time, and weekend routes available.' },
  { title: 'Paid Training', desc: 'We teach our standards — no experience required to start.' },
  { title: 'Supportive Team', desc: 'Team leads and coworkers who have your back on every job.' },
];

export default function CareersHub() {
  return (
    <>
      <Header active="Careers" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">Careers</p>
            <h1>Join the Anderson team.</h1>
            <p className="lead">
              We&apos;re always looking for dependable, detail-oriented people who take pride in a
              job well done.
            </p>
          </div>
        </section>

        <section className="services">
          <div className="wrap">
            <h2 style={{ text���q�^