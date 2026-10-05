import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'About Us | Anderson Cleaning Services',
  description:
    'Learn about Anderson Cleaning Services — our story, our values, and the team behind every clean.',
};

const values = [
  {
    title: 'Reliability',
    desc: 'We show up when we say we will, and we finish the job to the same standard every time.',
  },
  {
    title: 'Attention to Detail',
    desc: 'From baseboards to countertops, we treat every room like it is the one that matters most.',
  },
  {
    title: 'Trust',
    desc: 'Our team is background-checked, trained, and treats your space with the respect it deserves.',
  },
  {
    title: 'Care',
    desc: 'A cleaner space is a healthier, happier one — for your family, your team, or your customers.',
  },
];

const stats = [
  { value: '10+', label: 'Years in business' },
  { value: '500+', label: 'Homes & offices served' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '7', label: 'Days a week availability' },
];

export default function AboutPage() {
  return (
    <>
      <Header active="About Us" />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">About Us</p>
            <h1>Built on trust, one clean space at a time.</h1>
            <p className="lead">
              Anderson Cleaning Services ���q�^