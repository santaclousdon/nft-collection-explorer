import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { NFT } from '@/types/types';
import { Clipboard } from 'lucide-react';
import useIsMobile from '@/hook/useIsMobile';

type DetailModalProps = {
  source: NFT;
  closeModal: () => void;
  isModalOpen: boolean;
};

const DetailModal: React.FC<DetailModalProps> = ({
  source,
  closeModal,
  isModalOpen,
}) => {
  const isMobile = useIsMobile();
  // const fetchHistory = async () => {
  //   const res = await fetch(
  //     `/api/history?address=${source?.contract.address}&tokenId=${source?.tokenId}`
  //   );
  //   if (res.ok) {
  //     const data = await res.json();
  //     console.log(data);
  //   }
  // };

  // useEffect(() => {''
  //   fetchHistory();
  // }, [source?.contract.address]);
  const abbreviateAddress = (address: string) => {
    if (isMobile) return `${address.slice(0, 8)}...${address.slice(-4)}`;
    return `${address.slice(0, 20)}...${address.slice(-4)}`;
  };
  const [tooltipVisible, setTooltipVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setTooltipVisible({ ...tooltipVisible, [key]: true });
      setTimeout(() => {
        setTooltipVisible({ ...tooltipVisible, [key]: false });
      }, 1000);
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogTitle className="invisible">{source?.name}</DialogTitle>
      <DialogContent className="bg-grey-line px-4 md:px-6 py-4 rounded-lg border-none max-h-[calc(100vh-200px)] overflow-y-auto">
        <h2 className="font-monument text-white text-3xl font-bold text-center mb-4">
          {source?.name}
        </h2>
        {source?.image?.contentType !== 'video/mp4' ? (
          <img
            src={source?.image?.cachedUrl || '/images/nft-placeholder.png'}
            className="w-auto h-full rounded-lg max-h-[300px] mx-auto mb-4"
            alt="nft enlarged"
            onClick={(e) => e.stopPropagation()}
            loading="lazy"
          />
        ) : (
          <video
            src={source?.image?.originalUrl}
            className="w-auto h-full rounded-lg max-h-[300px] mx-auto mb-4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contract Details:</h2>
          <p className="max-w-[300px] md:max-w-full overflow-ellipsis overflow-hidden">
            <strong>Address:</strong>{' '}
            {abbreviateAddress(source?.contract.address)}
            <button
              onClick={() =>
                copyToClipboard(source?.contract.address, 'contractAddress')
              }
              className="ml-2 relative"
            >
              <Clipboard size={14} />

              {tooltipVisible.contractAddress && (
                <p className="text-white absolute top-[-8px] right-[-60px] text-xs p-2 bg-black rounded-[12px]">
                  Copied
                </p>
              )}
            </button>
          </p>
          <p className="max-w-[300px] md:max-w-full overflow-ellipsis overflow-hidden">
            <strong>Deployer:</strong>{' '}
            {abbreviateAddress(source?.contract.contractDeployer)}
            <button
              onClick={() =>
                copyToClipboard(
                  source?.contract.contractDeployer,
                  'deployerAddress'
                )
              }
              className="ml-2 relative"
            >
              <Clipboard size={14} />
              {tooltipVisible.deployerAddress && (
                <p className="text-white absolute top-[-8px] right-[-60px] text-xs p-2 bg-black rounded-[12px]">
                  Copied
                </p>
              )}
            </button>
          </p>
          <p>
            <strong>Name:</strong> {source?.contract.name}
          </p>
          <p>
            <strong>Symbol:</strong> {source?.contract.symbol}
          </p>
          <p>
            <strong>Total Supply:</strong> {source?.contract.totalSupply}
          </p>
          <p>
            <strong>Token Type:</strong> {source?.contract.tokenType}
          </p>
        </div>
        <div className="description">
          <h2 className="text-xl font-semibold mb-2">Description:</h2>
          <p>{source?.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
