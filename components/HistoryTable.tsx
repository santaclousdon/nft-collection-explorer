import React, { useCallback } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Clipboard } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useIsMobile from '@/hook/useIsMobile';
import { Transfer } from '@/types/types';

type HistoryTableProps = {
  history: Transfer[];
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} yrs ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} mons ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hrs ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} mins ago`;
  return `${seconds} seconds ago`;
};

const HistoryTable: React.FC<HistoryTableProps> = React.memo(({ history }) => {
  const isMobile = useIsMobile();
  const [tooltipVisible, setTooltipVisible] = useState<{
    [key: string]: boolean;
  }>({});
  const abbreviateAddress = useCallback(
    (address: string) => {
      if (isMobile) return `${address.slice(0, 4)}...${address.slice(-2)}`;
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    },
    [isMobile]
  );

  const handleCopy = useCallback((address: string) => {
    navigator.clipboard.writeText(address);
    setTooltipVisible((prev) => ({ ...prev, [address]: true }));
    setTimeout(() => {
      setTooltipVisible((prev) => ({ ...prev, [address]: false }));
    }, 2000);
  }, []);

  const renderAddressCell = (address: string) => (
    <div className="flex gap-x-2 items-center">
      <Link
        href={`https://etherscan.io/address/${address}`}
        target="_blank"
        className="hover:text-blue"
      >
        {abbreviateAddress(address)}
      </Link>
      <div className="relative">
        <Clipboard
          size={14}
          className="text-blue hover:text-white cursor-pointer"
          onClick={() => handleCopy(address)}
        />
        {tooltipVisible[address] && (
          <div className="absolute bg-black text-white p-1 rounded -top-8 -left-4">
            Copied!
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Hash</TableHead>
          <TableHead>Block</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Age</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((transfer: Transfer) => (
          <TableRow key={transfer.hash}>
            <TableCell>{renderAddressCell(transfer.hash)}</TableCell>
            <TableCell>{parseInt(transfer.blockNum, 16)}</TableCell>
            <TableCell>{renderAddressCell(transfer.from)}</TableCell>
            <TableCell>{renderAddressCell(transfer.to)}</TableCell>
            <TableCell className="text-nowrap">
              {formatTimeAgo(transfer.metadata.blockTimestamp)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default HistoryTable;
