'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import NFTList from '@/components/NFTList';
import WaitConnect from '@/components/WaitConnect';

// Main page component that handles wallet connection state and renders appropriate content
const Home: React.FC = () => {
  const { address } = useAccount();
  // State to handle component mounting and wallet connection
  const [mounted, setMounted] = useState<boolean>(false);
  const [isAddressAvailable, setIsAddressAvailable] = useState<boolean>(false);

  // Effect to handle wallet connection status
  useEffect(() => {
    setMounted(true);
    if (address) {
      setIsAddressAvailable(true);
    } else {
      setIsAddressAvailable(false);
    }
  }, [address]);

  // Prevent hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-[1480px] pt-20 py-10 lg:px-5 xl:mx-auto">
      {!isAddressAvailable ? <WaitConnect /> : <NFTList />}{' '}
    </div>
  );
};
export default Home;
