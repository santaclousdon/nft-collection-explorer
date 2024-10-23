'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import NFTItem from './NFTItem';
import { NoResult } from './WaitConnect';

const NFTList: React.FC = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nfts, setNfts] = useState<any[]>([]);

  const fetchNFTs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/nft?address=${address}`, {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        setNfts(data?.ownedNfts || []);
        console.log(data);
      } else {
        setError('Error fetching NFTs');
        console.error('Error fetching NFTs:', res.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchNFTs();
    }
  }, [address]);

  const renderLoading = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="skeleton-loader">Loading...</div>
    </div>
  );
  const renderError = () => (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-bold">{error}</p>
    </div>
  );
  const renderNFTs = () => (
    <section className="pb-[58px] py-20 grid-cols-1 lg:py-20 gap-7 lg:gap-10 grid md:grid-cols-2 lg:grid-cols-3">
      {nfts.map((nft, index) => (
        <NFTItem key={index} item={nft} />
      ))}
    </section>
  );

  const renderNoResult = () => <NoResult />;

  return loading
    ? renderLoading()
    : error
    ? renderError()
    : nfts.length > 0
    ? renderNFTs()
    : renderNoResult();
};

export default NFTList;
