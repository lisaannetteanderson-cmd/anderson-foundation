import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://anderson-cleaning-services.vercel.app'),
  title: {
    default: 'Anderson Cleaning Services | Professional Cleaning in Palmdale',
    template: '%s',
  },
  description: 'Request a free quote for residential and commercial cleaning from Anderson Cleaning Services serving Palmdale and surrounding communities.',
  applicationName: 'Anderson Cleaning Services',
  openGraph: {
    type: 'website',
    siteName: 'Anderson Cleaning Services',
    title: 'Anderson Cleaning Services | Professional Cleaning in Palmdale',
    description: 'Residential and commercial cleaning services in Palmdale and nearby communities. Call or request a free quote.',
    url: 'https://anderson-cleaning-services.vercel.app',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
