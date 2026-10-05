import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Gallery | Anderson Cleaning Services',
  description: 'See the Anderson Cleaning Services difference in our before-and-after and completed job photos.',
};

const tiles = [
  { cls: 'g1', tag: undefined },
  { cls: 'g2', tag: undefined },
  { cls: 'g3', tag: undefined },
  { cls: 'gbefore', tag: 'Before' },
  { cls: 'gafter', tag: 'After' },
  { cls: 'g4', tag: undefined },
  { cls: 'g5', tag: undefined },
  { cls: 'g6', tag: undefined },
];

export default function GalleryPage() {
  return (
    <>
      <Header active="Gallery" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">Gallery</p>
            <h1>See the difference, room by room.</h1>
            <p className="lead">
              A look at recent work — kitchens, bathrooms, living spaces, and the before-and-after
              moments our clients love most.
            </p>
          </div>
        </section>

        <section className="services">
          <div className="wrap">
            <ul className="full-gallery-grid">
              {tiles.map((t, i) => (
                <li key={i} className={`ph gtile ${t.cls}`}>
                  {t.tag && <span className="tag">{t.tag}</span>}
                </li>
              ))}
            </ul>
          </div>
        ���q�^