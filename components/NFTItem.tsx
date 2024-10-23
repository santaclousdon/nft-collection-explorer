import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DetailModal from './DetailModal';

type NFTItemProps = {
  item: any;
};

// Component to display individual NFT card with details
const NFTItem: React.FC<NFTItemProps> = ({ item }) => {
  // State for modal visibility and selected NFT
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectNFT, setSelectNFT] = useState<any>(null);

  // Handlers for modal open/close
  const handleImageClick = () => {
    setIsModalOpen(true);
    setSelectNFT(item);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <Card className="bg-grey-line/80 rounded-[12px] relative border-none shadow-outline shadow-white py-1">
      <CardHeader>
        <CardTitle className="uppercase text-xl lg:text-2xl xxl:text-[30px] leading-[1.2] mb-2 lg:mb-[15px] text-white max-w-max overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* NFT media display - handles both images and videos */}
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

        {/* Token type badge */}
        <div className="absolute right-[30px] top-[-10px] rounded-full bg-white text-black uppercase font-satoshi-bold text-xs px-[6px] py-[3px]">
          {item?.tokenType || 'ERC-721'}
        </div>
      </CardContent>
      <CardFooter className="text-white mt-5 overflow-hidden text-ellipsis line-clamp-5">
        {item?.description}
      </CardFooter>
      <DetailModal
        source={selectNFT}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
      />
    </Card>
  );
};

export default NFTItem;
