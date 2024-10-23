import React, { useEffect } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

type DetailModalProps = {
  source: any;
  closeModal: () => void;
  isModalOpen: boolean;
};

const DetailModal: React.FC<DetailModalProps> = ({
  source,
  closeModal,
  isModalOpen,
}) => {
  const fetchHistory = async () => {
    const response = await fetch(
      `/api/history?address=${source?.contract?.address}&tokenType=${source?.contract?.tokenType}&tokenId=${source?.contract?.tokenId}`
    );
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    if (source?.contract?.address) {
      fetchHistory();
    }
  }, [source]);
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogTitle className="invisible">{source?.name}</DialogTitle>
      <DialogContent className="bg-grey-line px-4 md:px-6 py-4 rounded-lg ">
        <h2 className="text-white text-3xl font-bold text-center mb-4">
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
            <strong>Address:</strong> {source?.contract.address}
          </p>
          <p className="max-w-[300px] md:max-w-full overflow-ellipsis overflow-hidden">
            <strong>Deployer:</strong> {source?.contract.contractDeployer}
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

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Links:</h2>
          {source?.raw.metadata?.home_url && (
            <p>
              <strong>POAP Link:</strong>{' '}
              <Link
                href={source?.raw.metadata?.home_url || '#'}
                target="_blank"
                className="text-blue-500 underline hover:text-blue-700 transition"
              >
                View on POAP
              </Link>
            </p>
          )}
          {source?.raw.metadata?.external_url && (
            <p>
              <strong>External Link:</strong>{' '}
              <Link
                href={source?.raw.metadata?.external_url || '#'}
                target="_blank"
                className="text-blue-500 underline hover:text-blue-700 transition"
              >
                View
              </Link>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
