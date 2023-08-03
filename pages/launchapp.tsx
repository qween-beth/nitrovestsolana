import React, { useState, ChangeEvent, FormEvent } from "react";
import type { NextPage } from "next";
import NavbarContainer from "../components/navbar-container";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { privateKey } from "../privateKey.mjs";
import { readFileSync } from "fs";

const sdk = ThirdwebSDK.fromPrivateKey("devnet", privateKey);

const MyNFTPage: React.FC = () => {
  const [nftMetadata, setNftMetadata] = useState({
    name: "",
    description: "",
    image: null as File | null,
    imageUrl: ""
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
            image: event.target.result as string
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
        imageUrl
      }));
    } else {
      setNftMetadata((prevMetadata) => ({
        ...prevMetadata,
        [name]: value
      }));
    }
  };

  return (
  <div>
    <NavbarContainer />
   
<div className="w-11/12 mx-auto my-2 flex flex-row items-center justify-center gap-3">

      <h1 className="text-2xl font-bold mb-4">Mint NFT</h1>
      <form onSubmit={handleFormSubmit} className="mb-4">
  <label className="block mb-2 text-white">
    NFT Name:
    <input
      type="text"
      name="name"
      value={nftMetadata.name}
      onChange={handleInputChange}
      className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-64"
    />
  </label>
  <br />
  <label className="block mb-2 text-white">
    NFT Description:
    <input
      type="text"
      name="description"
      value={nftMetadata.description}
      onChange={handleInputChange}
      className="border border-gray-300 p-2 mt-4"
    />
  </label>
  <br />
  <label className="block mb-2 text-white ">
    NFT Image:
    <input
      type="file"
      name="image"
      onChange={handleInputChange}
      className="mt-1 w-[74%] h-12 text-white bg-mediumblue-100 font-semibold flex flex-col items-center justify-center"
    />
  </label>
  <br></br>
  
  <button type="submit" className="w-[45%] h-12 text-white bg-mediumblue-100 font-semibold flex flex-col items-center justify-center">
          Mint NFT
        </button>
      

</form>


<br/>
<br/>

      <h2 className="text-xl font-bold mb-4  text-white">Minted NFTs</h2>
      <div className="flex flex-wrap">
        {mintedNfts.map((nft) => (
          <div
            key={nft}
            className="border border-gray-300 p-4 m-4"
            style={{ maxWidth: "200px" }}
          >
            <img src={nft} alt="Minted NFT" className="w-full" />
          </div>
        ))}
      </div>
    </div>
</div>
    
  );
};

export default MyNFTPage;
