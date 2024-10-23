import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '../providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Avocado NFT List',
  description: 'Avocado NFT List',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-satoshi-regular">
        <Providers>
          <Header />
          <main className="min-h-[calc(100vh-80px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
