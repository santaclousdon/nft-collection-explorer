import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '../providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Avocado DAO NFT List',
  description: 'Avocado DAO NFT List',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" />
      </head>
      <body className="bg-black text-white font-satoshi-regular">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
