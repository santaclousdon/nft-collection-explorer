import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900/50 border-t border-t-gray-800">
      <div className="flex justify-between px-10 py-5">
        <p className="flex gap-x-1">
          ©Avocado 2024.{' '}
          <span className="hidden md:block">All rights reserved.</span>{' '}
        </p>
        <p className="flex gap-x-1">
          <Link href="https://t.me/santaclous112" target="_blank">
            <Image
              src="images/telegram.svg"
              width={20}
              height={20}
              alt="Telegram"
            ></Image>
          </Link>
        </p>
        <p>Created by Robin</p>
      </div>
    </footer>
  );
};

export default Footer;
