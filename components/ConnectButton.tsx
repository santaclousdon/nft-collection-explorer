'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import NetworkSwitcher from './SwtichButton';
import WalletListModal from './WalletListModal';

const ConnectButton: React.FC = () => {
  const { disconnect } = useDisconnect();
  const { address, chainId } = useAccount();

  const [mounted, setMounted] = useState<boolean>(false);
  const [showConnectWallet, setShowConnectWallet] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    setShowConnectWallet(false);
  }, [address]);

  const abbreviatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  if (!mounted) return null;

  const renderConnectedButton = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="text-xl border border-white rounded-[12px]  hover:bg-blue hover:border-transparent hover:text-white"
        >
          {abbreviatedAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-transparent text-white shadow-lg p-0 rounded-[10px] mr-0">
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="cursor-pointer hover:bg-gray-700 rounded-md p-2 w-full mx-auto"
        >
          Disconnect
        </DropdownMenuItem>
        {chainId !== 1 && (
          <DropdownMenuItem className="hover:bg-gray-700 rounded-md p-2">
            <NetworkSwitcher />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderConnectButton = () => (
    <Button
      onClick={() => setShowConnectWallet(true)}
      className=" text-base md:text-xl border border-white rounded-[12px] px-2 md:px-5 py-0 md:py-2 hover:bg-blue hover:border-transparent hover:text-white"
    >
      Connect
    </Button>
  );

  return (
    <>
      {address ? renderConnectedButton() : renderConnectButton()}
      <WalletListModal
        showConnectWallet={showConnectWallet}
        setShowConnectWallet={setShowConnectWallet}
      />
    </>
  );
};

export default ConnectButton;
