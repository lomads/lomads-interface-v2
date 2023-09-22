import { SupportedChainId } from "./chains"
import { INFURA_NETWORK_URLS } from "./infura"

export function getRpcUrls(chainId: SupportedChainId): [string] {
    switch (chainId) {
      case SupportedChainId.MAINNET:
      case SupportedChainId.GOERLI:
        return [INFURA_NETWORK_URLS[chainId]]
      case SupportedChainId.CELO:
        return ['https://forno.celo.org']
      case SupportedChainId.POLYGON:
        return ['https://polygon-rpc.com/']
      default:
    }
    // Our API-keyed URLs will fail security checks when used with external wallets.
    throw new Error('RPC URLs must use public endpoints')
  }
  