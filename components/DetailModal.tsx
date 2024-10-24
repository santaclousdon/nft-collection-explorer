import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Copy, Loader2 } from 'lucide-react';
import HistoryTable from './HistoryTable';
import Link from 'next/link';
import { NFT, Transfer } from '@/types/types';
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
  const [history, setHistory] = useState<Transfer[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(
        `/api/history?address=${source?.contract.address}&tokenId=${source?.tokenId}`
      );
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [source?.contract.address]);

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
      <DialogContent className="bg-grey-line px-4 md:px-10 py-10 rounded-[20px] border-none max-h-[calc(100vh-200px)] max-w-[99vw] xs:max-w-[80vw] lg:max-w-[60vw] md:rounded-[20px]">
        <h2 className="font-monument text-white text-3xl font-bold text-left text-gradient">
          {source?.name}
        </h2>
        <div className="flex flex-col pb-5 mt-10 gap-y-6 max-h-[calc(100vh-380px)] overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-center gap-x-10">
            <div className="w-full md:max-w-[50%]">
              {source?.image?.contentType !== 'video/mp4' ? (
                <img
                  src={
                    source?.image?.cachedUrl || '/images/nft-placeholder.png'
                  }
                  className="w-auto h-full max-h-[300px] lg:max-h-[350px] mx-auto lg:mx-0 mb-4 rounded-[20px]"
                  alt="nft enlarged"
                  onClick={(e) => e.stopPropagation()}
                  loading="lazy"
                />
              ) : (
                <video
                  src={source?.image?.originalUrl}
                  className="w-auto h-full rounded-lg max-h-[300px] lg:max-h-[350px] mx-auto lg:mx-0 mb-4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              )}
            </div>
            <div className="mb-2">
              <h2 className="text-2xl font-semibold mb-2">Token Details:</h2>
              <div className="flex flex-col gap-y-2">
                <p>
                  <strong>Address:</strong>{' '}
                  <Link
                    href={`https://etherscan.io/address/${source?.contract.address}`}
                    target="_blank"
                    className="hover:text-blue"
                  >
                    {abbreviateAddress(source?.contract.address)}
                  </Link>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        source?.contract.address,
                        'contractAddress'
                      )
                    }
                    className="ml-2 relative"
                  >
                    <Copy size={14} className="text-blue hover:text-white" />

                    {tooltipVisible.contractAddress && (
                      <p className="text-white absolute top-[-40px] text-xs -left-4 p-2 bg-black rounded-[12px]">
                        Copied
                      </p>
                    )}
                  </button>
                </p>
                <p>
                  <strong>Deployer:</strong>{' '}
                  <Link
                    href={`https://etherscan.io/address/${source?.contract.contractDeployer}`}
                    target="_blank"
                    className="hover:text-blue"
                  >
                    {abbreviateAddress(source?.contract.contractDeployer)}
                  </Link>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        source?.contract.contractDeployer,
                        'deployerAddress'
                      )
                    }
                    className="ml-2 relative"
                  >
                    <Copy size={14} className="text-blue hover:text-white" />
                    {tooltipVisible.deployerAddress && (
                      <p className="text-white absolute top-[-40px] text-xs -left-4 p-2 bg-black rounded-[12px]">
                        Copied
                      </p>
                    )}
                  </button>
                </p>
                {source?.contract.name && (
                  <p>
                    <strong>Name:</strong> {source?.contract.name}
                  </p>
                )}
                {source?.contract.symbol && (
                  <p>
                    <strong>Symbol:</strong> {source?.contract.symbol}
                  </p>
                )}
                {source?.contract.totalSupply && (
                  <p>
                    <strong>Total Supply:</strong>{' '}
                    {source?.contract.totalSupply}
                  </p>
                )}
                <p>
                  <strong>Token Type:</strong> {source?.contract.tokenType}
                </p>
              </div>
            </div>
          </div>
          <div className="history">
            <h2 className="text-xl font-semibold mb-2">History:</h2>
            {historyLoading ? (
              <div className="flex justify-center items-center">
                <Loader2 size={24} className="animate-spin" />
              </div>
            ) : history.length > 0 ? (
              <HistoryTable history={history} />
            ) : (
              <p>No History</p>
            )}
          </div>
          <div className="description">
            <h2 className="text-xl font-semibold mb-2">Description:</h2>
            <p>
              {source?.description ? (
                source?.description
              ) : (
                <span className="text-gray-500">[No Description]</span>
              )}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
