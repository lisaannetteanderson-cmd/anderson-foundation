import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Anderson Cleaning Services | Professional Cleaning You Can Trust',description:'Reliable residential and commercial cleaning services in Palmdale and surrounding communities.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}