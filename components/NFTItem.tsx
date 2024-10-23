import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DetailModal from './DetailModal';
import { NFT } from '@/types/types';

// Define the NFT type based on the provided structure

type NFTItemProps = {
  item: NFT;
};

// Component to display individual NFT card with details
const NFTItem: React.FC<NFTItemProps> = ({ item }) => {
  // State for modal visibility and selected NFT
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectNFT, setSelectNFT] = useState<NFT | null>(null);

  // Handlers for modal open/close
  const handleImageClick = () => {
    setIsModalOpen(true);
    setSelectNFT(item);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <Card className="bg-grey-line/60 rounded-[12px] border-none relative">
      <CardContent className="flex flex-col items-center gap-y-5 px-4 py-5 md:px-5 md:py-8">
        <h2 className="uppercase text-xl font-monument lg:text-2xl xxl:text-[32px]  lg:mb-[15px] overflow-hidden text-ellipsis whitespace-nowrap max-w-full m-0">
          {item?.name}
        </h2>
        <div
          onClick={handleImageClick}
          className="cursor-pointer w-full overflow-hidden"
        >
          {item?.image?.contentType !== 'video/mp4' ? (
            <img
              src={item?.image?.cachedUrl || '/images/nft-placeholder.png'}
              className="animate hover:scale-[1.1] w-full h-[200px] lg:h-[360px] object-contain"
              alt="nft placeholder"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src =
                  item?.image.originalUrl || '/images/nft-placeholder.png';
              }}
            />
          ) : (
            <video
              src={item?.image.cachedUrl}
              className="animate hover:scale-[1.1] w-full h-[200px] lg:h-[360px] object-contain"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          )}
        </div>

        <div className="absolute right-[30px] top-[-10px] rounded-full bg-white text-black uppercase font-satoshi-bold text-xs px-[6px] py-[3px]">
          {item?.tokenType || 'ERC721'}
        </div>
        <p className="text-sm lg:text-lg !leading-[1.3]  lg:px-[30px] overflow-hidden text-ellipsis line-clamp-3 max-h-[70px] md:max-h-[70px] lg:max-h-[90px]">
          {item?.description ? (
            item?.description
          ) : (
            <span className="text-gray-500">[No description]</span>
          )}
        </p>
      </CardContent>

      {selectNFT && (
        <DetailModal
          source={selectNFT}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
        />
      )}
    </Card>
  );
};

export default NFTItem;
