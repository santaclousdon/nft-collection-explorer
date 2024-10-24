'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import NFTItem from './NFTItem';
import { NoResult } from './WaitConnect';
import { NFT } from '@/types/types';
import { Loader2 } from 'lucide-react';

// Component to fetch and display user's NFT collection
const NFTList: React.FC = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);

  // Fetch NFTs from the API for connected wallet
  const fetchNFTs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/nft?address=${address}`, {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        setNfts(data?.ownedNfts || []);
      } else {
        setError('Error fetching NFTs');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Fetch NFTs when wallet address changes
  useEffect(() => {
    if (address) {
      fetchNFTs();
    }
  }, [address, fetchNFTs]); // Added fetchNFTs to the dependency array

  // Render functions for different states
  const renderLoading = () => (
    <div className="flex justify-center items-center h-screen">
      <Loader2 size={40} className="animate-spin" />
    </div>
  );
  const renderError = () => (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-bold">{error}</p>
    </div>
  );
  const renderNFTs = () => (

    <div className="relative">
      <div className="max-w-[1480px] mx-auto px-10 lg:px-5">
        <section className="relative pb-[58px] py-20 grid-cols-1 lg:py-20 gap-7 lg:gap-10 grid md:grid-cols-2 lg:grid-cols-3">
          {nfts.map((nft, index) => (
            <NFTItem key={index} item={nft} />
          ))}

        </section>
      </div>
      <div className="fixed top-0 right-0 left-0 w-full z-[-1]">
        <div className="relative h-full overflow-hidden">
          <video autoPlay loop muted className="w-full h-screen object-cover">
            <source src="/videos/roadmap-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute left-0 top-0 w-full h-full bg-linear mix-blend-soft-light" />
        <div className="absolute left-0 top-0 w-full h-full bg-linearShadow" />
      </div>
    </div>
  );

  const renderNoResult = () => <NoResult />;

  // Conditional rendering based on state
  return loading
    ? renderLoading()
    : error
      ? renderError()
      : nfts.length > 0
        ? renderNFTs()
        : renderNoResult();
};

export default NFTList;
