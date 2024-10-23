import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, base, optimism } from 'wagmi/chains';
import { injected, metaMask, safe, coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, base, optimism, sepolia],
  connectors: [injected(), metaMask(), safe(), coinbaseWallet()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [sepolia.id]: http(),
  },
});
