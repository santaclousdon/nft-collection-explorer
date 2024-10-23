import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

type ImageModalProps = {
  source: string;
  closeModal: () => void;
  isModalOpen: boolean;
};

const ImageModal: React.FC<ImageModalProps> = ({
  source,
  closeModal,
  isModalOpen,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogTitle className="invisible">NFT Image</DialogTitle>
      <DialogContent className="bg-grey-line/60">
        <img
          src={source || '/images/nft-placeholder.png'}
          className="w-full h-full rounded-lg"
          alt="nft enlarged"
          onClick={(e) => e.stopPropagation()}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
