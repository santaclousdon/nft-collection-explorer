'use client';

import { useAccount } from 'wagmi';
import Header from '../components/Header';

export default function Home() {
  const { address } = useAccount();
  console.log(address);
  return (
    <div>
      <Header />
    </div>
  );
}
