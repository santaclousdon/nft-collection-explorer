import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Avocado NFT List',
  description: 'Avocado NFT List',
};

import { Providers } from '../providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-satoshi-regular">
        <Providers>
          <Header />
          <main className="min-h-[calc(100vh-20px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
