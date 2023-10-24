import React from "react";
import img from "assets/images/goerli.png";
import { sliceAddress } from "utils";

export default function Token({ token }: any) {
  return (
    <div className="px-6 py-2 grid grid-cols-10">
      <div className="col-span-4 text-lg font-semibold">
        <div className="flex gap-6">
          <img
            src={img}
            alt=""
            className="w-[30px] h-[30px] object-cover object-center my-auto rounded-full"
          />
          <div className="leading-0">
            <span className="text-sm font-semibold">{token?.token?.symbol}</span>
            <br />
            <span className="text-sm italic text-gray-300 flex">{sliceAddress(token?.tokenAddress)}</span>
          </div>
        </div>
      </div>

      <div className="col-span-2 text-sm flex items-center">$ {token.fiatConversion}</div>
      <div className="col-span-2 text-sm flex items-center">{token.fiatBalance} {token?.token?.symbol}</div>
      <div className="col-span-2 text-sm flex items-center">{token.ethValue} </div>
    </div>
  );
}
