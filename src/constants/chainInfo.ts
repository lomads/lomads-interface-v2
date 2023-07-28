import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
import polygonMaticLogo from 'assets/svg/polygon-matic-logo.svg'
import celoLogo from 'assets/svg/celo.svg'

import { SupportedChainId } from './chains'

export enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly infoLink: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
}

export interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2
  readonly bridge: string
  readonly statusPage?: string
  readonly defaultListUrl: string
}

export const CHAIN_INFO: any = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    opensea: 'https://opensea.io/assets/ethereum/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    chainId: '0x1',
    network: 'cyan',
    chainName: 'mainnet'
  },
  [SupportedChainId.GOERLI]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    opensea: 'https://testnets.opensea.io/assets/goerli/',
    label: 'Görli',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Görli Ether', symbol: 'GörETH', decimals: 18 },
    chainId: '0x5',
    network: 'testnet',
    chainName: 'goerli'
  },
  [SupportedChainId.POLYGON]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: `10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://polygonscan.com/',
    opensea: 'https://opensea.io/assets/matic/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon',
    logoUrl: polygonMaticLogo,
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
    chainId: '0x89',
    network: 'cyan',
    chainName: 'polygon'
  },
  [SupportedChainId.CELO]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: `10m`,
    docs: 'https://celo.io/',
    explorer: 'https://celoscan.io/',
    opensea: 'https://opensea.io/assets/celo/',
    infoLink: 'https://info.uniswap.org/#/celo/',
    label: 'Celo',
    logoUrl: celoLogo,
    nativeCurrency: { name: 'Celo Native Asset', symbol: 'CELO', decimals: 18 },
    chainId: '0xA4EC',
    network: 'cyan',
    chainName: 'celo'
  }
}