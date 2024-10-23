export type NFT = {
  contract: {
    address: string;
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: {
      floorPrice: number;
      collectionName: string;
      collectionSlug: string;
      safelistRequestStatus: string;
      imageUrl: string;
      description: string;
      twitterUsername: string;
      discordUrl: string;
      bannerImageUrl: string;
      lastIngestedAt: string;
    };
    spamClassifications: any[];
  };
  tokenId: string;
  tokenType: string;
  name: string;
  description: string;
  tokenUri: string;
  image: {
    cachedUrl: string;
    thumbnailUrl: string;
    pngUrl: string;
    contentType: string;
    size: number;
    originalUrl: string;
  };
  raw: {
    tokenUri: string;
    metadata: {
      platform: string;
      tokenID: string;
      series: string;
      aspect_ratio: number;
      payout_address: string;
      name: string;
      minted: boolean;
      artist: string;
      description: string;
      script_type: string;
      project_id: string;
      curation_status: string;
      heritage_curation_status: string;
      image: string;
      preview_asset_url: string;
      generator_url: string;
      animation_url: string;
      home_url?: string;
      royaltyInfo: {
        artistAddress: string;
        additionalPayee: string;
        additionalPayeePercentage: number;
        royaltyFeeByID: number;
      };
      collection_name: string;
      website: string;
      token_hash: string;
      external_url: string;
      primary_asset_url: string;
      features: {
        [key: string]: string;
      };
      traits: {
        trait_type: string;
        value: string;
      }[];
      is_static: boolean;
      license: string;
    };
  };
  collection: {
    name: string;
    slug: string;
    bannerImageUrl: string;
  };
  mint: {};
  timeLastUpdated: string;
  balance: string;
  acquiredAt: {};
};

export type Transfer = {
  blockNum: string;
  uniqueId: string;
  hash: string;
  from: string;
  to: string;
  erc721TokenId: string;
  erc1155Metadata: null | Object;
  tokenId: string;
  asset: string;
  category: string;
  metadata: {
    blockTimestamp: string;
  };
};
