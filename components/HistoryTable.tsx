import React, { useCallback } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Copy } from 'lucide-react';
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
import { formatTimeAgo } from '@/lib/functions';

type HistoryTableProps = {
  history: Transfer[];
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

  const renderAddressCell = (address: string, type: 'hash' | 'address') => (
    <div className="flex gap-x-2 items-center">
      <Link
        href={`https://etherscan.io/${
          type === 'hash' ? 'tx' : 'address'
        }/${address}`}
        target="_blank"
        className="hover:text-blue"
      >
        {abbreviateAddress(address)}
      </Link>
      <div className="relative">
        <Copy
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
            <TableCell>{renderAddressCell(transfer.hash, 'hash')}</TableCell>
            <TableCell>{parseInt(transfer.blockNum, 16)}</TableCell>
            <TableCell>{renderAddressCell(transfer.from, 'address')}</TableCell>
            <TableCell>{renderAddressCell(transfer.to, 'address')}</TableCell>
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
