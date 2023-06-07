import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}


export const TICK_LENS_ADDRESSES: AddressMap = {
  [SupportedChainId.ARBITRUM_ONE]: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573',
  [SupportedChainId.ARBITRUM_RINKEBY]: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573',
}

export const DAOFACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.GOERLI]: '0x50DABA7aFEACCDc3234875E82152F09174C8f481',
  [SupportedChainId.POLYGON_MUMBAI]: '0xb75eC48cE7b47b27772870AE4Ad9712193F1A6A6',
} 
export const DAOTOKEN_ADDRESSES: AddressMap = {
  [SupportedChainId.GOERLI]: '0x50DABA7aFEACCDc3234875E82152F09174C8f481',
  [SupportedChainId.POLYGON_MUMBAI]: '0xb75eC48cE7b47b27772870AE4Ad9712193F1A6A6',
}

/* SBT DEPLOYER ADDRESS */
export const SBT_DEPLOYER_ADDRESSES : AddressMap = {
  // [SupportedChainId.GOERLI]: "0x72D5020993c43ffdFCe2aEdd0442b776A9617097",
  // [SupportedChainId.POLYGON]: '0x022e58834d2c91Ed9C06E977B6e8aaDf019b514D',
  [SupportedChainId.GOERLI]: '0x0C0E11bedca82D1EC3d748F01bf962A37a004652',
  [SupportedChainId.POLYGON]: '0xEd8bf520A0667349BF941110FAE2eAb478E38bcE',
} 

/* SBT DEPLOYER ADDRESS V0 */
export const SBT_DEPLOYER_ADDRESSES_V0 : AddressMap = {
  [SupportedChainId.GOERLI]: '0xC1eC8454a75A82090B1831b055883e914Dc43CBb',
  [SupportedChainId.POLYGON]: '0x022e58834d2c91Ed9C06E977B6e8aaDf019b514D',
} 

export const SBT_DEPLOYER_ADDRESSES_V3 : AddressMap = {
  [SupportedChainId.GOERLI]: '0x0C0E11bedca82D1EC3d748F01bf962A37a004652',
  [SupportedChainId.POLYGON]: '0xEd8bf520A0667349BF941110FAE2eAb478E38bcE',
} 

export const BICONOMY_FORWARDER_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: '0xE041608922d06a4F26C0d4c27d8bCD01daf1f792',
  [SupportedChainId.POLYGON]: '0xf0511f123164602042ab2bCF02111fA5D3Fe97CD',
}

export const BICONOMY_GAS_TANK_ADDRESSES: AddressMap = {
  [SupportedChainId.GOERLI]: '0x6781dbfdbd6a2803e1698c6e705659d3b597f643',
  [SupportedChainId.POLYGON]: '0xeb808ba857a080d35554fe5830dc61df1ba53e0c',
}