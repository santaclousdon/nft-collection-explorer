import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ImageModal from './ImageModal';

type NFTItemProps = {
  item: any;
};

const NFTItem: React.FC<NFTItemProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = () => {
    setIsModalOpen(true);
    setSelectedImage(item?.image.originalUrl);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <Card className="bg-grey-line/80 rounded-[12px] relative border-none shadow-outline shadow-white">
      <CardHeader>
        <CardTitle className="uppercase text-xl lg:text-3xl xxl:text-[38px] leading-[1.2] mb-2 lg:mb-[15px] text-white overflow-hidden text-ellipsis whitespace-nowrap line-clamp-2 max-w-full">
          {item?.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div onClick={handleImageClick} className="cursor-pointer">
          <img
            src={item?.image.originalUrl || '/images/nft-placeholder.png'}
            className="animate hover:scale-[1.1] w-full h-[200px] lg:h-[400px] object-contain"
            alt="nft placeholder"
          />
        </div>

        <div className="absolute right-[30px] top-[-10px] rounded-full bg-white text-black uppercase font-satoshi-bold text-xs px-[6px] py-[3px]">
          {item?.tokenType || 'ERC-721'}
        </div>
      </CardContent>
      <CardFooter className="text-white mt-5">{item?.description}</CardFooter>
      <ImageModal
        source={selectedImage}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
      />
    </Card>
  );
};

export default NFTItem;
