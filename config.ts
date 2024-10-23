import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, base, optimism } from 'wagmi/chains';
import { metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, base, optimism, sepolia],
  connectors: [
    metaMask(),
    coinbaseWallet(),
    walletConnect({ projectId: 'ec198987494bbd9d26a040729e1a48ae' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [sepolia.id]: http(),
  },
});
