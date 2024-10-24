import React from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { useAccount } from 'wagmi';
import { WalletOptions } from './WalletOptions';
import useIsMobile from '@/hook/useIsMobile';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';

type IWalletListModal = {
  showConnectWallet: boolean;
  setShowConnectWallet: (value: boolean) => void;
};
const WalletListModal: React.FC<IWalletListModal> = ({
  showConnectWallet,
  setShowConnectWallet,
}) => {
  const ConnectWallet = () => {
    const { isConnected } = useAccount();
    if (!isConnected) return <WalletOptions />;
  };
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Drawer open={showConnectWallet} onOpenChange={setShowConnectWallet}>
          <DrawerTitle className="hidden">Select Wallet</DrawerTitle>

          <DrawerContent className="bg-gray-800  p-4  border-none rounded-lg md:rounded-xl">
            <ConnectWallet />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showConnectWallet} onOpenChange={setShowConnectWallet}>
          <DialogTitle className="hidden">Select Wallet</DialogTitle>
          <DialogContent className="bg-gray-800 px-4 md:px-6 py-8  border-none rounded-lg md:rounded-xl">
            <ConnectWallet />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default WalletListModal;
