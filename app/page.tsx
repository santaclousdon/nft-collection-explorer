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
    <div className="pt-20 py-10 xl:mx-auto">
      {!isAddressAvailable ? (
        <WaitConnect />
      ) : (
        <div className="relative">
          <div className="max-w-[1480px] mx-auto px-2 lg:px-5">
            <NFTList />
          </div>{' '}
          <div className="absolute bottom-0 right-0 left-0 w-full z-[-1] top-0">
            <video autoPlay loop muted className="w-full h-full object-cover">
              <source src="/videos/roadmap-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute left-0 top-0 w-full h-full bg-linear mix-blend-soft-light" />
            <div className="absolute left-0 top-0 w-full h-full bg-linearShadow" />
          </div>
        </div>
      )}{' '}
    </div>
  );
};
export default Home;
