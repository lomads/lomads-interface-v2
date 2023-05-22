import { getAddress } from '@ethersproject/address'

export function beautifyHexToken(token: string): string {
    return (token?.slice(0, 6) + "..." + token?.slice(-4))
  }

  export const isValidUrl = (urlString: string) => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }

  export function getContract(address: string, ABI: any, provider: JsonRpcProvider, account?: string): Contract {
    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
  
    return new Contract(address, ABI, getProviderOrSigner(provider, account) as any)
  }

  export function isAddress(value: any): string | false {
    try {
      return getAddress(value)
    } catch {
      return false
    }
  }