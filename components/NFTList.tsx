'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import NFTItem from './NFTItem';
import { NoResult } from './WaitConnect';
import { NFT } from '@/types/types';
import { Loader2 } from 'lucide-react';

const NFTList: React.FC = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);

  /**
   * Fetches NFTs from the API for the connected wallet address
   */
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
        console.error('Error fetching NFTs:', res.status);
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
  }, [address, fetchNFTs]);

  /**
   * Render loading spinner while fetching NFTs
   */
  const renderLoading = () => (
    <div className="flex justify-center items-center h-screen">
      <Loader2 size={40} className="animate-spin" />
    </div>
  );

  /**
   * Render error message if NFT fetch fails
   */
  const renderError = () => (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-bold">{error}</p>
    </div>
  );

  /**
   * Render grid of NFT items
   */
  const renderNFTs = () => (
    <section className="pb-[58px] py-20 grid-cols-1 lg:py-20 gap-7 lg:gap-10 grid md:grid-cols-2 lg:grid-cols-3">
      {nfts.map((nft, index) => (
        <NFTItem key={index} item={nft} />
      ))}
    </section>
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
