import React from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { useAccount } from 'wagmi';
import { WalletOptions } from './WalletOptions';

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
  return (
    <Dialog open={showConnectWallet} onOpenChange={setShowConnectWallet}>
      <DialogTitle className="hidden">Select Wallet</DialogTitle>
      <DialogContent className="bg-grey-line px-4 md:px-6 py-8 rounded-lg">
        <ConnectWallet />
      </DialogContent>
    </Dialog>
  );
};

export default WalletListModal;
