'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ConnectButton from './ConnectButton';
import Logo from './Logo';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [headerStyle, setHeaderStyle] = useState({
    backgroundColor: 'transparent',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > 50) {
      setHeaderStyle({ backgroundColor: '#000' });
    } else {
      setHeaderStyle({ backgroundColor: 'transparent' });
    }
  }, [scrollY]);

  return (
    <header
      className="animate fixed top-0 left-0 h-[78px] lg:h-[104px] w-full px-[15px] lg:px-[50px] py-5 lg:py-[30px] flex items-center justify-between z-10 border-b border-b-gray-900"
      style={{ ...headerStyle }}
    >
      <Link href="/" title="Avocado" aria-label="Avocado" className="z-10">
        <Logo />
        <p className="text-white">Avocado</p>
      </Link>

      <div className="max-lg:pt-5 max-lg:pr-[15px] max-lg:pb-[30px] flex items-center justify-between">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
