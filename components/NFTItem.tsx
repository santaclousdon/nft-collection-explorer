import React from 'react';
import Image from 'next/image';

const NFTItem = ({ item }: { item: any }) => {
  return (
    <article className="bg-grey-line/60 rounded-md relative">
      <div className="p-5 lg:p-[30px] md:min-h-[125px] lg:min-h-[159px]">
        <h3 className="font-monument uppercase text-xl lg:text-3xl xxl:text-[38px] leading-[1.2] mb-2 lg:mb-[15px]">
          {item.title}
        </h3>
        <p className="font-satoshi-bold text-gradient">{item?.subtitle}</p>
      </div>
      <div className="relative mr-5 lg:mr-[30px] rounded-r-lg overflow-hidden group">
        <Image
          src="/images/nft-placeholder.png"
          width={423}
          height={300}
          className="w-full h-full animate group-hover:scale-[1.15]"
          alt="nft placeholder"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-linear mix-blend-color" />
      </div>
      <p className="text-sm lg:text-lg !leading-[1.3] p-5 pb-8 lg:pt-[28px] lg:px-[30px] lg:pb-[58px]">
        {item.description}
      </p>
      {!item.active ? (
        <div className="absolute right-[30px] top-[-10px] rounded-full bg-white text-black uppercase font-satoshi-bold text-xs px-[6px] py-[3px]">
          {item?.type || 'ERC-721'}
        </div>
      ) : null}
    </article>
  );
};

export default NFTItem;
