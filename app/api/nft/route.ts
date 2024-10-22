import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

export async function GET() {
  const nfts = await alchemy.nft.getNftsForOwner(
    '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270'
  );
  return Response.json(nfts);
}
