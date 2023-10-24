import React from "react";
import img from "assets/images/goerli.png";
import { sliceAddress } from "utils";
import Etherscan from "assets/images/Balance/Etherscan.png";
import Opensea from "assets/images/Balance/Opensea.png";
import Zerion from "assets/images/Balance/Zerion.png";
import Blur from "assets/images/Balance/Blur.png";
import colection from "assets/images/link.svg";

export default function NFT() {
  return (
    <div className="px-6 py-2 grid grid-cols-12">
      <div className="col-span-5 text-lg font-semibold">
        <div className="flex gap-6">
          <img src={img} alt="" className="w-[30px] h-[30px] object-cover object-center my-auto" />
          <div className="leading-0">
            <span className="text-sm">Ethereum Name Service</span>
            <br />
            <div className="text-sm italic text-gray-300 flex">
              eth: {sliceAddress("0xb2A056c6961b8801Eb7A0F27ee6487440c18086f")}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="/" target={"_blank"}>
                <img src={colection} className="w-[12px]" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3 text-sm flex items-center">hairdao.eth</div>

      <div className="col-span-4 text-lg font-semibold flex gap-6 items-center">
        <a href="/" target="_blank" className="overflow-hidden rounded-full hover:shadow-md shadow-black transition ease-in-out">
          <img src={Etherscan} className="w-[20px] h-[20px]" alt="" />
        </a>
        <a href="/" target="_blank" className="overflow-hidden rounded-full hover:shadow-md shadow-black transition ease-in-out">
          <img src={Opensea} className="w-[20px] h-[20px]" alt="" />
        </a>
        <a href="/" target="_blank" className="overflow-hidden rounded-full hover:shadow-md shadow-black transition ease-in-out">
          <img src={Zerion} className="w-[20px] h-[20px]" alt="" />
        </a>
        <a href="/" target="_blank" className="overflow-hidden rounded-full hover:shadow-md shadow-black transition ease-in-out">
          <img src={Blur} className="w-[20px] h-[20px]" alt="" />
        </a>
      </div>
    </div>
  );
}
