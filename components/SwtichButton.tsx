import { useSwitchChain } from 'wagmi';
import { useAccount } from 'wagmi';

const NetworkSwitcher = () => {
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  return (
    <div>
      {chainId !== 1 ? (
        <button onClick={() => switchChain({ chainId: 1 })}>
          Switch to Ethereum Mainnet
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NetworkSwitcher;
