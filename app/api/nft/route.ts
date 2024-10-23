import { Alchemy, Network } from 'alchemy-sdk';

const AlchemyConfig = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(AlchemyConfig);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address') || '';

  try {
    const nfts = await alchemy.nft.getNftsForOwner(address);
    return Response.json(nfts);
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch NFTs', { status: 500 });
  }
}
