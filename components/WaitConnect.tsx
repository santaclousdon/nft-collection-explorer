import React from 'react';

type MessageSectionProps = {
  message: string;
};

const VideoSection: React.FC = () => (
  <div className="relative lg:flex-1">
    <video autoPlay loop muted>
      <source src="/videos/nft-video.mp4" type="video/mp4" />
    </video>
    <div className="absolute left-0 top-0 w-full h-full bg-linearDark mix-blend-soft-light" />
    <div className="absolute left-0 top-0 w-full h-full shadow-inner" />
  </div>
);

const TextSection: React.FC<MessageSectionProps> = ({ message }) => (
  <div className="lg:flex-1 flex flex-col items-center">
    <h2 className="font-monument uppercase text-[30px] md:text-[36px] leading-[1.2] mb-[20px] lg:mb-6 lg:text-[42px] text-center">
      Avocado NFT LIST
    </h2>
    <p className="w-fit font-satoshi-bold text-lg leading-[1.4] text-gradient mb-6 lg:text-[24px] lg:mb-12 text-center">
      {message}
    </p>
  </div>
);

const MessageDisplay: React.FC<MessageSectionProps> = ({ message }) => {
  return (
    <section className="flex flex-col gap-y-10 items-center lg:flex-row-reverse pt-20 px-10 gap-x-10">
      <VideoSection />
      <TextSection message={message} />
    </section>
  );
};

export const WaitConnect: React.FC = () => (
  <MessageDisplay message="Your wallet is currently disconnected. Please connect your wallet to access and view your exclusive NFT collection." />
);

export const NoResult: React.FC = () => (
  <MessageDisplay message="We can't find any NFTs for this wallet." />
);

export default WaitConnect;
