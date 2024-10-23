import { Transfer } from '@/types/types';
import axios from 'axios';
import Web3 from 'web3';

const web3 = new Web3();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractAddress = searchParams.get('address') || '';
  const tokenId = searchParams.get('tokenId') || '1';

  const data = JSON.stringify({
    jsonrpc: '2.0',
    id: 0,
    method: 'alchemy_getAssetTransfers',
    params: [
      {
        fromBlock: '0x0',
        toBlock: 'latest',
        contractAddresses: [contractAddress],
        withMetadata: true,
        excludeZeroValue: false,
        category: ['erc721', 'erc1155'],
        order: 'asc',
      },
    ],
  });

  const config = {
    method: 'post',
    url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios(config);

    const transfers = response.data.result.transfers.filter(
      (transfer: Transfer) => {
        if (transfer['tokenId']) {
          return (
            web3.utils.hexToNumber(transfer['tokenId']) === parseInt(tokenId)
          );
        }
      }
    );
    return Response.json(transfers);
  } catch (error) {
    console.error('Error fetching asset transfers:', error);
    return new Response('Error fetching asset transfers', { status: 500 });
  }
}
