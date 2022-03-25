// import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { useContract, useSigner, useAccount } from 'wagmi'
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  utils,
} from "ethers";

import { Signer } from 'ethers';
import { MockProfileCreationProxyABI } from '../ABIs';


import { CreateProfileDataStruct } from '../../../typechain-types/MockProfileCreationProxy';
import { image } from '@uiw/react-md-editor';


const useMockProfile = () => {
  // const [{ data, error, loading }, getSigner] = useSigner()

  const [{ data: account }] = useAccount();
  const [signer, setSigner] = useState<Signer>();

 // get signer
 useEffect(() => {
  (async () => {
    try {
      const res = await account?.connector?.getSigner();
      setSigner(res);
    } catch (e) {
      setSigner(undefined);
    }
  })();
}, [account?.connector]);
  
    const contract = useContract({
      addressOrName: '0x9BB48d8F9c4596b98C8bB1fB6D67aaE238F81CC2',
      contractInterface: MockProfileCreationProxyABI,
      signerOrProvider: signer
    });

    useEffect(() => {
      console.log(contract);
    }, [contract]);
  

  async function createProfile({ to, handle, imageURI, followModule, followModuleData, followNFTURI }: CreateProfileDataStruct) {
    try {
      console.log(to)
      console.log(handle)
      console.log(imageURI)
      console.log(followModule)
      console.log(followModuleData)
      console.log(followNFTURI)
      const result = await contract.functions.proxyCreateProfile({to, handle, imageURI, followModule, followModuleData, followNFTURI});
      console.log(result);

    } catch (error) {
      console.log(error);
    }
  }

  return { createProfile };
};

export default useMockProfile;