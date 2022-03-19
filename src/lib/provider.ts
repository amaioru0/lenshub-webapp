
import { ethers } from "ethers";
import { Network } from "@ethersproject/networks";

export const mumbai: Network = {
    name: 'matic-testnet',
    chainId: 80001,
    _defaultProvider: (providers) => new providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/16730a405a254c81b8721025f50b815f')
}

export const matic: Network = {
    name: 'matic',
    chainId: 137,
    _defaultProvider: (providers) => new providers.JsonRpcProvider('https://polygon.infura.io/v3/16730a405a254c81b8721025f50b815f')
}

const provider = ethers.getDefaultProvider(mumbai, {
    etherscan: "Q2HXIWPVIGUTGAH5FHU7CDY4UQA1ND25PP",
    infura: "bc7ae83f636c4d5fb7d227283cc2918c",
    alchemy: "k2VwGnvtKNZmjscjokIic_sO8d6YDUrU",
    pocket: "6124eb55f6d1650033d7dbbf"
});



export default provider;