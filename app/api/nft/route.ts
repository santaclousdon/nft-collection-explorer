import { alchemy } from '@/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address') || '';

  try {
    const nfts = await alchemy.nft.getNftsForOwner(address);
    return Response.json(nfts);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return new Response('Failed to fetch NFTs', { status: 500 });
  }
}
