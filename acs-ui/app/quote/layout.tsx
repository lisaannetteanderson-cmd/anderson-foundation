import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Free Cleaning Quote | Anderson Cleaning Services',
  description: 'Request a free cleaning quote from Anderson Cleaning Services for residential and commercial cleaning in the Palmdale area.',
  alternates: { canonical: '/quote' },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
