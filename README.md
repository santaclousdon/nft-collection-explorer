# Avocado DAO NFT List

A Next.js application for viewing NFT collections with wallet integration.

## Project Overview

This application allows users to:

- Connect their Web3 wallet
- View their NFT collections
- See detailed NFT information including images and metadata

## Features

- **Wallet Connect**: Seamlessly connect your Ethereum-compatible wallets using **wagmi**.
- **Switch Wallet**: Automatically detects the connected network and prompts users to switch to the **Ethereum mainnet** if necessary.

- **Display NFT Collections**: View a visually appealing grid of NFTs owned by the connected wallet address.

- **Detail View Modal**: Click on an NFT to access detailed information, including contract address, deployer address, name, symbol, and token type, all presented in a user-friendly modal.

- **Transaction History**: Effortlessly fetch and display transaction history for a selected NFT via the **Alchemy API**, with details shown in a structured table.

- **External Links**: Easily redirect to **Etherscan** for contract addresses and transaction hashes.

- **Responsive UI/UX**: Enjoy a responsive layout with animations, crafted using **Tailwind CSS** for an enhanced user experience.

## Getting Started

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Alchemy API key to `.env`:

```bash
ALCHEMY_API_KEY=your_api_key_here
```

Get your API key from [Alchemy Dashboard](https://dashboard.alchemy.com/)

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Third-Party Libraries

- **wagmi** ([docs](https://wagmi.sh/)) - React Hooks for Ethereum, providing wallet connection and interaction
- **viem** ([docs](https://viem.sh/)) - TypeScript interface for Ethereum, used for blockchain interactions
- **alchemy-sdk** ([docs](https://docs.alchemy.com/reference/alchemy-sdk-quickstart)) - NFT data fetching and blockchain API integration
- **@radix-ui/react-\*** ([docs](https://www.radix-ui.com/)) - Unstyled, accessible UI components
- **tailwindcss** ([docs](https://tailwindcss.com/)) - Utility-first CSS framework for styling
- **class-variance-authority** ([docs](https://cva.style/docs)) - Managing component variants and styles
- **lucide-react** ([docs](https://lucide.dev/)) - Icon components
