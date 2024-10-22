import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
type ImageModalProps = {
  source: any;
  closeModal: () => void;
  isModalOpen: boolean;
};

const ImageModal = ({ source, closeModal, isModalOpen }: ImageModalProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogTitle>NFT Image</DialogTitle>
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
