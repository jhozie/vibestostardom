import './main.css';
import { Outfit, Syne, Space_Grotesk } from 'next/font/google';
import FourCornerNav from '@/components/FourCornerNav/FourCornerNav';
import CustomCursor from '@/components/CustomCursor/CustomCursor';

// Optimize Font Loading
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-family-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-family-art',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-family-alt',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'VIBESTOSTARDOM | Global Talent Management',
    template: '%s | VIBESTOSTARDOM',
  },
  description: 'We don\u2019t just manage talent; we engineer legacies. The premier management agency for the next generation of global superstars.',
  keywords: ['Talent Management', 'Music Industry', 'Afrobeats', 'Artist Branding', 'VIBESTOSTARDOM'],
  openGraph: {
    title: 'VIBESTOSTARDOM',
    description: 'We don\u2019t just manage talent; we engineer legacies.',
    url: 'https://vibestostardom.com',
    siteName: 'VIBESTOSTARDOM',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Replace with real OG Image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico', // Ensure this exists or use a generic one
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CustomCursor />
        <FourCornerNav />
        {children}
      </body>
    </html>
  );
}
