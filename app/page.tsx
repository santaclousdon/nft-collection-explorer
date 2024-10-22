'use client';

import NFTList from '@/components/NFTList';
import WaitConnect from '@/components/WaitConnect';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

export default function Home() {
  const { address } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="max-w-[1480px] px-4 py-10 lg:px-5 xl:mx-auto">
      {isMounted && !address ? <WaitConnect /> : <NFTList />}
    </div>
  );
}
