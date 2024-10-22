'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import NFTItem from './NFTItem';

const NFT_LIST = [
  {
    title: 'NFT 1',
    description: 'This is NFT 1',
  },
  {
    title: 'NFT 2',
    description: 'This is NFT 2',
  },
  {
    title: 'NFT 3',
    description: 'This is NFT 3',
  },
  {
    title: 'NFT 4',
    description: 'This is NFT 4',
  },
  {
    title: 'NFT 5',
    description: 'This is NFT 5',
  },
];

const NFTList = () => {
  const { address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const fetchNFTs = async () => {
    const res = await fetch('/api/nft', {
      method: 'GET',
    });
    const data = await res.json();
    setNfts(data?.ownedNfts || []);
  };
  useEffect(() => {
    if (address) {
      fetchNFTs();
    }
  }, [address]);
  return (
    <section className="pb-[58px] py-20 grid-cols-1 lg:py-20 gap-7 lg:gap-10 grid md:grid-cols-2 lg:grid-cols-3">
      {nfts.map((nft, index) => {
        return <NFTItem key={index} item={nft} />;
      })}
    </section>
  );
};

export default NFTList;
