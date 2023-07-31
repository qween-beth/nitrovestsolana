import React, { useState, ChangeEvent, FormEvent } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { privateKey } from "../privateKey.mjs";
import { readFileSync } from "fs";

const sdk = ThirdwebSDK.fromPrivateKey("devnet", privateKey);

const MyNFTPage: React.FC = () => {
  const [nftMetadata, setNftMetadata] = useState({
    name: "",
    description: "",
    image: null as File | null,
    imageUrl: "",
  });
  const [mintedNfts, setMintedNfts] = useState<string[]>([]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!nftMetadata.image) {
        throw new Error("Please select an image for the NFT.");
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const metadata = {
            name: nftMetadata.name,
            description: nftMetadata.description,
            image: event.target.result as string,
          };

          const myNftCollection = await sdk.getNFTCollection(
            "F1myk1urfXpwknwoR5sFaTj5BKQ2Gmtxd6gEM3iTDA8n"
          );
          const mintedNft = await myNftCollection.mint(metadata);

          setMintedNfts((prevMintedNfts) => [...prevMintedNfts, mintedNft]);
          setNftMetadata({ name: "", description: "", image: null, imageUrl: "" });

          console.log("🎉 Minted NFT successful:", mintedNft);
        }
      };
      reader.readAsDataURL(nftMetadata.image);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (name === "image" && files && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setNftMetadata((prevMetadata) => ({
        ...prevMetadata,
        image: files[0],
        imageUrl,
      }));
    } else {
      setNftMetadata((prevMetadata) => ({
        ...prevMetadata,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <h1>Mint NFT</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          NFT Name:
          <input
            type="text"
            name="name"
            value={nftMetadata.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          NFT Description:
          <input
            type="text"
            name="description"
            value={nftMetadata.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          NFT Image:
          <input type="file" name="image" onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Mint NFT</button>
      </form>

      <h2>Minted NFTs</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {mintedNfts.map((nft) => (
          <div
            key={nft}
            style={{
              border: "1px solid #000",
              padding: "1rem",
              margin: "1rem",
            }}
          >
            <img src={nft} alt="Minted NFT" style={{ width: "200px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNFTPage;
