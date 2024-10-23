'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { injected } from 'wagmi/connectors';
import { Button } from '@/components/ui/button';
import NetworkSwitcher from './SwtichButton';

const ConnectButton: React.FC = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const abbreviatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  if (!mounted) return null;

  const renderConnectedButton = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="text-xl border border-white rounded-[12px] hover:bg-blue hover:text-white"
        >
          {abbreviatedAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-none rounded-[5px] text-white">
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="cursor-pointer"
        >
          Disconnect
        </DropdownMenuItem>

        <DropdownMenuItem>
          <NetworkSwitcher />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderConnectButton = () => (
    <Button
      onClick={() => connect({ connector: injected() })}
      className="text-xl border border-white rounded-[12px] hover:bg-blue hover:text-white"
    >
      Connect
    </Button>
  );

  return <>{address ? renderConnectedButton() : renderConnectButton()}</>;
};

export default ConnectButton;
