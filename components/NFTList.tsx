'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import NFTItem from './NFTItem';
import NoResult from './NoResult';

const NFTList = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [nfts, setNfts] = useState<any[]>([]);

  const fetchNFTs = async () => {
    setLoading(true);
    const res = await fetch(`/api/nft?address=${address}`, {
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      setNfts(data?.ownedNfts || []);
      setLoading(false);
    } else {
      console.log('Error fetching NFTs:', res.status);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchNFTs();
    }
  }, [address]);
  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="skeleton-loader">Loading...</div>
    </div>
  ) : nfts.length > 0 ? (
    <section className="pb-[58px] py-20 grid-cols-1 lg:py-20 gap-7 lg:gap-10 grid md:grid-cols-2 lg:grid-cols-3">
      {nfts.map((nft, index) => {
        return <NFTItem key={index} item={nft} />;
      })}
    </section>
  ) : (
    <NoResult />
  );
};

export default NFTList;
