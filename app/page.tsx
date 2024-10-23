'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import NFTList from '@/components/NFTList';
import WaitConnect from '@/components/WaitConnect';

const Home: React.FC = () => {
  const { address } = useAccount();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isAddressAvailable, setIsAddressAvailable] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    if (address) {
      setIsAddressAvailable(true);
    } else {
      setIsAddressAvailable(false);
    }
  }, [address]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-[1480px] px-4 py-10 lg:px-5 xl:mx-auto">
      {!isAddressAvailable ? <WaitConnect /> : <NFTList />}{' '}
    </div>
  );
};
export default Home;
