'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import NFTItem from './NFTItem';

const NFTList = () => {
  // const { address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const address = '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270';

  const fetchNFTs = async () => {
    const res = await fetch(`/api/nft?address=${address}`, {
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
