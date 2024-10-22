'use client';

import NFTList from '@/components/NFTList';
import WaitConnect from '@/components/WaitConnect';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

export default function Home() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [isAddressAvailable, setIsAddressAvailable] = useState(false);

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
}
