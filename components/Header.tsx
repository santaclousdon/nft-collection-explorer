import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md fixed top-0 w-full z-50">
      <h1 className="text-3xl font-extrabold text-white">Avocado</h1>
      <ConnectButton />
    </div>
  );
};

export default Header;
