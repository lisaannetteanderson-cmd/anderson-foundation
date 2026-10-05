import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Our Services | Anderson Cleaning Services',
  description:
    'Residential, commercial, deep cleaning, move-in/move-out, and customized cleaning plans from Anderson Cleaning Services.',
};

const icon = { width: 30, height: 30, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const services = [
  {
    title: 'Residential Cleaning',
    desc: 'Regular or one-time cleaning for houses, apartments, and condos.',
    details: [
      'Kitchens, bathrooms, living areas, and bedrooms',
      'Dusting, vacuuming, mopping, and surface sanitizing',
      'Weekly, biweekly, or monthly recurring visits',
    ],
    svg: <svg {...icon}><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9.5h13V10" /><path d="M10 19.5v-5h4v5" /></svg>,
  },
  {
    title: 'Commercial Cleaning',
    desc: 'Keep offices, retail spaces, and shared workspaces client-ready.',
    details: [
      'Flexible scheduling around business hours',
      'Break rooms, restrooms, and common areas',
      'Trash removal and restocking supplies',
    ],
    svg: <svg {...icon}><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7.5h2M13 7.5h2M9 11.5h2M13 11.5h2M9 15.5h2M13 15.5h2" /></svg>,
  },
  {
    title: 'Deep Cleaning',
    desc: 'A top-���q�^