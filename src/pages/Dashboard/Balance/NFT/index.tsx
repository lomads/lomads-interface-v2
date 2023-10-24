import React, { useContext } from "react";
import NFT from "./iterm";
import { Web3AuthContext } from "context/web3Auth";
import { sliceAddress } from "utils";
import { get as _get } from "lodash";
import { CHAIN_INFO } from "constants/chainInfo";
import { useSafeNFTs } from "context/safeNFTs";

export default function NFTSection() {
  const { chainId } = useContext(Web3AuthContext);
  const { safeNFTs } = useSafeNFTs();

  console.log(safeNFTs);

  return (
    <div>
      <div className="border-b border-gray-300 w-full px-6 py-4">
        <div className="flex gap-6">
          <img
            src={CHAIN_INFO[chainId]?.logoUrl}
            alt=""
            className="w-8 h-8 my-auto"
          />
          <div>
            <span className="text-sm font-semibold">Safe Name 1</span>
            <br />
            <span className="text-sm italic text-gray-300">
              {sliceAddress("0xb2A056c6961b8801Eb7A0F27ee6487440c18086f")}
            </span>
          </div>
        </div>
      </div>

      <div className="px-7 pt-4 grid grid-cols-12">
        <div className="col-span-5 text-lg font-semibold">Collection</div>
        <div className="col-span-3 text-lg font-semibold">Token ID</div>
        <div className="col-span-4 text-lg font-semibold">Links</div>
      </div>

      <div className="py-4">
        <NFT />
        <NFT />
        <NFT />
      </div>
    </div>
  );
}
