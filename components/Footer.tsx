import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent ">
      <div className="flex flex-col md:justify-between md:flex-row items-center px-10 md:py-5">
        <p className=" gap-x-1 text-xl hidden md:block">© Avocado 2024. </p>

        <p className="flex gap-x-4">
          <Link
            href="https://t.me/santaclous112"
            target="_blank"
            className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-blue hover:text-black"
          >
            <Image
              src="images/telegram.svg"
              width={20}
              height={20}
              alt="Telegram"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/robin-cabal"
            target="_blank"
            className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-blue hover:text-black"
          >
            <Image
              src="images/linkedin.svg"
              width={20}
              height={20}
              alt="Linkedin"
              className="invert"
            />
          </Link>
          <Link
            href="https://wa.me/+639691272945"
            target="_blank"
            className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-blue hover:text-black"
          >
            <Image
              src="images/whatsapp.svg"
              width={20}
              height={20}
              alt="Whatsapp"
              className="invert"
            />
          </Link>
        </p>
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
