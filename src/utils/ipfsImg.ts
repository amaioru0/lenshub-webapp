export const ipfsToImg = (ipfsLink:String) => {
    if(ipfsLink.startsWith("ipfs://")) {
      return ipfsLink.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/")
    }
}