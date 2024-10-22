import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900/50 border-t border-t-gray-800">
      <div className="flex justify-between px-10 py-5">
        <p className="flex gap-x-1">
          ©Avocado 2024.{' '}
          <span className="hidden md:block">All rights reserved.</span>{' '}
        </p>
        <p>Created by Robin</p>
      </div>
    </footer>
  );
};

export default Footer;
