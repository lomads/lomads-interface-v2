import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { get as _get, find as _find, uniq as _uniq } from "lodash";
import axios from "axios";
import { GNOSIS_SAFE_BASE_URLS, SupportedChainId } from "constants/chains";
import { CHAIN_INFO } from "constants/chainInfo";
import axiosHttp from "../api";
import { useDAO } from "context/dao";
import { useWeb3Auth } from "context/web3Auth";
import { useAppSelector } from "helpers/useAppSelector";
import { setDAOAction } from "store/actions/dao";
import { useAppDispatch } from "helpers/useAppDispatch";

export const SafeNFTsContext = createContext<any>({
  safeTokens: null,
  tokensInfo: null,
  totalBalance: null,
});

export function useSafeNFTs(): any {
  return useContext(SafeNFTsContext);
}

export const SafeNFTsProvider = ({ children }: any) => {
  //@ts-ignore
  const { DAO } = useAppSelector((store) => store?.dao);
  const [safeNFTs, setsafeNFTs] = useState<any>();

  //   const dispatch = useAppDispatch();

  useEffect(() => {
    if (!DAO) {
      setsafeNFTs(null);
    }
  }, [DAO]);

  const getNFTs = async (
    chain: SupportedChainId,
    safeAddress: String,
    name: String
  ) => {
    return axios
      .get(
        // `${GNOSIS_SAFE_BASE_URLS[chain]}/api/v2/safes/${safeAddress}/collectibles/?trusted=false&exclude_spam=false`,
        `https://safe-transaction-mainnet.safe.global/api/v2/safes/0xe98134dCe5959Eb8D13b7d6543b8E16a20ed973E/collectibles/?trusted=false&exclude_spam=false`,
        { withCredentials: false }
      )
      .then((res: any) => {
        if (res.data.results) {
          let data = {
            NFTs: res.data.results,
            chainId: chain,
            address: safeAddress,
            name: name,
          };
          return data;
        }
        // let tokens = res.data.map((t: any) => {
        //   let tkn = t;
        //   if (!tkn.tokenAddress) {
        //     return {
        //       ...t,
        //       tokenAddress: process.env.REACT_APP_NATIVE_TOKEN_ADDRESS,
        //       token: {
        //         symbol: CHAIN_INFO[chain].nativeCurrency.symbol,
        //         decimal: CHAIN_INFO[chain].nativeCurrency.decimals,
        //         decimals: CHAIN_INFO[chain].nativeCurrency.decimals,
        //       },
        //     };
        //   }
        //   return t;
        // });
        // if (DAO.sweatPoints) {
        //   tokens.push({
        //     tokenAddress: "SWEAT",
        //     token: {
        //       symbol: "SWEAT",
        //       decimal: 18,
        //       decimals: 18,
        //     },
        //   });
        // }
        // const safe: any = await axios
        //   .get(`${GNOSIS_SAFE_BASE_URLS[chain]}/api/v1/safes/${safeAddress}/`, {
        //     withCredentials: false,
        //   })
        //   .then((res) => res.data);
        // if (tokens && tokens.length > 0) {
        //   let total = tokens.reduce((a: any, b: any) => {
        //     return a + parseFloat(_get(b, "fiatBalance", 0));
        //   }, 0);
        //   axiosHttp.post(`/safe/${safeAddress}/sync`, {
        //     owners: safe?.owners,
        //     tokens,
        //     balance: total,
        //     threshold: safe?.threshold,
        //   });
        // }
        // return {
        //   [`${safeAddress}`]: tokens,
        //   owners: safe?.owners,
        //   name: name,
        //   chainId: chain,
        // };
      });
  };

  useEffect(() => {
    if (DAO?.url) {
      Promise.all(
        DAO?.safes?.map((s: any) => getNFTs(s.chainId, s.address, s.name))
      )
        .then(async (res) => {
          console.log(
            res,
            "--------------------------------NFTs-----------------------------------"
          );
          // let tokensInfo: any = {};
          // let tokens: any = {};
          // let owners: any = [];
          // for (let index = 0; index < res.length; index++) {
          //   const element = res[index];
          //   tokens[`${Object.keys(element)[0]}`] =
          //     element[`${Object.keys(element)[0]}`];
          //   tokensInfo[`${Object.keys(element)[0]}`] = {
          //     tokens: element[`${Object.keys(element)[0]}`],
          //     name: element["name"],
          //     chainId: element["chainId"],
          //   };
          //   owners = owners.concat(element["owners"]);
          // }
          // setsafeNFTs(tokens);
          // setsafeNFTsInfo(tokensInfo);
          // const { data } = await axiosHttp.patch(
          //   `dao/${DAO.url}/sync-safe-owners`,
          //   _uniq(owners)
          // );
          // dispatch(setDAOAction(data));
        })
        .catch((e) => console.log(e));
    }
  }, [DAO?.url, DAO?.sweatPoints]);

  const contextProvider = {
    safeNFTs,
  };
  return (
    <SafeNFTsContext.Provider value={contextProvider}>
      {children}
    </SafeNFTsContext.Provider>
  );
};
