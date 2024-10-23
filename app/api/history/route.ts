import axios from 'axios';
import Web3 from 'web3';

const web3 = new Web3();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contractAddress = searchParams.get('address') || '';
  const tokenId = searchParams.get('tokenId') || '1';

  var data = JSON.stringify({
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
        maxCount: '0xA',
      },
    ],
  });

  var config = {
    method: 'post',
    url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const response = await axios(config);
  console.log('------------------------------');
  console.log(tokenId);
  console.log(response.data.result);

  // let index = 1;
  const transfers = response.data.result.transfers.filter(
    (transfer: any) =>
      web3.utils.hexToNumber(transfer['erc721TokenId']) === parseInt(tokenId)
  );
  return Response.json(transfers);
}
//   // console.log("------------------------------")
//   // const nfts = await alchemy.core.getAssetTransfers({
//   //   // contractAddresses: [address],
//   //   // withMetadata: true,
//   //   // category: [AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155],
//   //   fromBlock: '0x0',
//   //   fromAddress: '0x0000000000000000000000000000000000000000',
//   //   toAddress: '0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152',
//   //   excludeZeroValue: true,
//   //   category: [AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155],
//   // });

//   console.log(nfts);
//   return Response.json(nfts);
// } catch (error) {
//   console.error(error);
//   return new Response('Failed to fetch NFTs', { status: 500 });
// }
