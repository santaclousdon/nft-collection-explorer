'use client';

import * as React from 'react';
import Image from 'next/image';
import { useConnect } from 'wagmi';

const logos = ['images/metamask.svg', 'images/coinbase.svg'];

export const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex flex-col gap-4 p-8 rounded-[12px] bg-black/0 backdrop-blur-sm text-black">
      <p className="text-xl font-bold text-left">Connect Wallet</p>
      {connectors.map((connector, index) => (
        <button
          className="w-full h-[56px] px-2 py-2 border rounded-[12px] text-xl hover:bg-gray-200 hover:border-transparent  transition-all flex items-center gap-x-4 justify-start"
          key={connector.uid}
          onClick={() => connect({ connector })}
        >
          <Image
            src={logos[index]}
            alt={connector.name}
            width={30}
            height={30}
          />
          {connector.name}
        </button>
      ))}
    </div>
  );
};
