import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SocialMediaLinks: React.FC = () => {
  const links = [
    {
      href: 'https://t.me/santaclous112',
      src: 'images/telegram.svg',
      alt: 'Telegram',
    },
    {
      href: 'https://www.linkedin.com/in/robin-cabal',
      src: 'images/linkedin.svg',
      alt: 'Linkedin',
      className: 'invert',
    },
    {
      href: 'https://wa.me/+639691272945',
      src: 'images/whatsapp.svg',
      alt: 'Whatsapp',
      className: 'invert',
    },
  ];

  return (
    <p className="flex gap-x-4">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          target="_blank"
          className="w-10 h-10 rounded-full border-[2px] hover:border-transparent border-white flex items-center justify-center hover:bg-blue hover:text-black"
        >
          <Image
            src={link.src}
            width={20}
            height={20}
            alt={link.alt}
            className={link.className}
          />
        </Link>
      ))}
    </p>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent ">
      <div className="flex flex-col md:justify-between md:flex-row items-center px-10 md:py-5">
        <p className=" gap-x-1 text-xl hidden md:block">© Avocado 2024. </p>

        <SocialMediaLinks />

        <p className="flex gap-x-1 text-xl md:hidden mt-4">© Avocado 2024. </p>
        <p className="text-xl">
          Created by{' '}
          <Link
            href="mailto:caballerorobin077@gmail.com"
            className="hover:text-blue font-monument"
          >
            ROBIN
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
