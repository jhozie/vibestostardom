import type { Metadata } from 'next';
import './main.css';

export const metadata: Metadata = {
  title: 'VIBESTOSTARDOM | From Raw Talent to Star-Quality Impact',
  description: 'VIBESTOSTARDOM discovers, nurtures, and elevates talent. We manage careers, produce content, and build platforms for lasting impact.',
  icons: {
    icon: '/vts-favicon.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
