import "./globals.css";
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Enoh Akpan | Project Portfolio',
    template: '%s | Project Portfolio',
  },
  description: 'A portfolio of web development projects built with Next.js and PostgreSQL.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'Enoh Akpan | Project Portfolio',
    description: 'A portfolio of web development projects built with Next.js and PostgreSQL.',
    type: 'website',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enoh Akpan | Project Portfolio',
    description: 'A portfolio of web development projects built with Next.js and PostgreSQL.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      );
}