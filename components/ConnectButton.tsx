'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Button } from '@/components/ui/button';

const ConnectButton = () => {
  const { connect } = useConnect();

  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const abbreviatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  return (
    <>
      {address ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="border border-white rounded-[12px]"
            >
              {abbreviatedAddress}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-700 border-none text-white">
            <DropdownMenuItem onClick={() => disconnect()}>
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => connect({ connector: injected() })}
          className="border border-white rounded-[12px]"
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default ConnectButton;
