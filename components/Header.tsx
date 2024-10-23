'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ConnectButton from './ConnectButton';
import Logo from './Logo';

// Header component with dynamic background based on scroll position
const Header: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [headerStyle, setHeaderStyle] = useState<{ backgroundColor: string }>({
    backgroundColor: 'transparent',
  });

  // Handle scroll events to update header background
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update header style based on scroll position
  useEffect(() => {
    setHeaderStyle({
      backgroundColor: scrollY > 50 ? '#000000ea' : 'transparent',
    });
  }, [scrollY]);

  return (
    <header
      className="animate fixed top-0 left-0 h-[78px] lg:h-[104px] w-full px-[15px] lg:px-[50px] py-5 lg:py-[30px] flex items-center justify-between z-10"
      style={headerStyle}
    >
      <Link
        href="/"
        title="Avocado"
        aria-label="Avocado"
        className="z-10 flex items-center gap-3"
      >
        <Logo />
        <h2 className="font-monument">Avocado DAO</h2>
      </Link>

      <div className="max-lg:pt-5 max-lg:pr-[15px] max-lg:pb-[30px] flex items-center justify-between">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
