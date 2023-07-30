import { useEffect, useState } from 'react';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/solana';
import { useProgram } from '@thirdweb-dev/react/solana';
import dynamic from 'next/dynamic';
import { privateKey } from "../privateKey.mjs";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const [sdk, setSdk] = useState(null);
  const [propertyAddress, setPropertyAddress] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [listings, setListings] = useState([]);
  const { data: myNftCollectionProgram } = useProgram(
    '8S2ja6ziCw75Wr7MWnofiDv1APjPs7Lgvr5LE3sAkp1b',
    'nft-collection'
  );

  useEffect(() => {
    const initializeSDK = async () => {
      //const privateKey = 'YOUR_PRIVATE_KEY';
      const sdk = ThirdwebSDK.fromPrivateKey('devnet', privateKey);
      setSdk(sdk);
    };

    initializeSDK();
  }, []);

  const handleCreateListing = async (e) => {
    e.preventDefault();

    if (!sdk) return;

    const metadata = {
      propertyAddress,
      price,
      image,
      type,
    };

    const listing = await sdk.nft.createNft({
      collection: myNftCollectionProgram,
      metadata,
    });

    console.log('Listing created:', listing);

    setListings([...listings, listing]);
    setPropertyAddress('');
    setPrice('');
    setImage('');
    setType('');
  };

  const handleMintListing = async (tokenId) => {
    if (!sdk) return;

    const mintedListing = await sdk.nft.mintNft({
      collection: myNftCollectionProgram,
      tokenId,
    });

    console.log('Listing minted:', mintedListing);
  };

  const handleReceiveTokens = async () => {
    if (!sdk) return;

    const tokens = await sdk.nft.getMyTokens(myNftCollectionProgram);
    console.log('My Tokens:', tokens);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Interact with Contract</h1>
      <form onSubmit={handleCreateListing} className="mb-4">
        <input
          type="text"
          placeholder="Property Address"
          value={propertyAddress}
          onChange={(e) => setPropertyAddress(e.target.value)}
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border rounded-md p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-md p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Listing
        </button>
      </form>

      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">NFT Listings</h2>
        {listings.map((listing) => (
          <div
            key={listing.tokenId}
            className="border border-gray-300 rounded-md p-4 mb-2"
          >
            <img
              src={listing.metadata.image}
              alt={listing.metadata.propertyAddress}
              className="w-32 h-32 object-cover mb-2"
            />
            <p className="font-semibold">{listing.metadata.propertyAddress}</p>
            <p>Price: {listing.metadata.price}</p>
            <button
              onClick={() => handleMintListing(listing.tokenId)}
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md mt-2"
            >
              Mint
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <WalletMultiButtonDynamic />
      </div>
    </div>
  );
}

