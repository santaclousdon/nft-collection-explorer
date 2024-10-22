'use client';

import React, { useEffect } from 'react';
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
  console.log(address);
  const fetchNFTs = async () => {};
  useEffect(() => {
    if (address) {
      fetchNFTs();
    }
  }, [address]);
  return (
    <section className="pb-[58px] lg:py-20 gap-7 lg:gap-10 grid md:grid-cols-2 lg:grid-cols-3">
      {NFT_LIST.map((nft, index) => {
        return <NFTItem key={index} item={nft} />;
      })}
    </section>
  );
};

export default NFTList;
