'use client';

import * as React from 'react';
import { useConnect } from 'wagmi';

export const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex flex-col gap-4 p-8 border border-white rounded-[12px] bg-black/0 backdrop-blur-sm">
      <p className="text-xl font-bold text-center">Connect Wallet</p>
      {connectors.map((connector) => (
        <button
          className="w-full h-[56px] px-8 py-2 border border-white rounded-[12px] text-xl hover:bg-[#d98328]  hover:text-black transition-all"
          key={connector.uid}
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
};
