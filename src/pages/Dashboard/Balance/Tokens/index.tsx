import React, { useContext } from "react";
import Token from "./iterm";
import { sliceAddress } from "utils";
import { get as _get } from "lodash";
import { CHAIN_INFO } from "constants/chainInfo";
import { SafeTokensContext } from "context/safeTokens";

export default function TokenSection() {
  const { safeTokensInfo } = useContext(SafeTokensContext);
  

  return (
    <>
      {safeTokensInfo &&
        Object.keys(safeTokensInfo).map((address, index) => {
          return (
            <div key={index}>
              <div className="border-b border-gray-200 w-full px-6 py-4">
                <div className="flex gap-6">
                  <img
                    src={CHAIN_INFO[safeTokensInfo[address].chainId]?.logoUrl}
                    alt=""
                    className="w-7 h-7 my-auto"
                  />
                  <div>
                    <span className="text-sm font-semibold">
                      {safeTokensInfo[address].name}
                    </span>
                    <br />
                    <span className="text-sm italic text-gray-300">
                      {sliceAddress(address)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-7 pt-4 grid grid-cols-10">
                <div className="col-span-4 text-lg font-semibold">Asset</div>
                <div className="col-span-2 text-lg font-semibold">Price</div>
                <div className="col-span-2 text-lg font-semibold">Balance</div>
                <div className="col-span-2 text-lg font-semibold">Value</div>
              </div>

              <div className="py-4">
                {safeTokensInfo[address]?.tokens &&
                  safeTokensInfo[address]?.tokens.map(
                    (token: any, key: Number) => {
                      return <Token token={token} key={key} />;
                    }
                  )}
              </div>
            </div>
          );
        })}
    </>
  );
}
