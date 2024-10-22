'use client';

import NFTList from '@/components/NFTList';
import WaitConnect from '@/components/WaitConnect';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address } = useAccount();
  return (
    <div className="max-w-[1480px] px-4 py-10 lg:px-5 xl:mx-auto">
      {!address ? <WaitConnect /> : <NFTList />}
    </div>
  );
}
