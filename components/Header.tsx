import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <div className="flex justify-between p-4">
      <h1 className="text-2xl font-bold">Avocado</h1>
      <ConnectButton />
    </div>
  );
};

export default Header;
