import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata={title:'Anderson Cleaning Services | Palmdale, CA',description:'Professional residential and commercial cleaning services in Palmdale and surrounding communities.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}