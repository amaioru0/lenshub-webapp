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
// import { abi }  from '../../../artifacts/contracts/mocks/MockProfileCreationProxy.sol/MockProfileCreationProxy.json'
import { MockProfileCreationProxyABI } from '../ABIs';

// Create PRofile
// address to;
// string handle;
// string imageURI;
// address followModule;
// bytes followModuleData;
// string followNFTURI;

import { CreateProfileDataStruct } from '../../../typechain-types/MockProfileCreationProxy';


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
      // this is incorrectly `null` even after `signer` is available
      console.log(contract);
    }, [contract]);
  

  // const [createProfileData, setCreateProfileData] = useState({})

  // useEffect(() => {
  //     console.log("signer")
  //     console.log(data)
  //     const finallyCreateProfile = async () => {
  //       try {
  //         const result = await contract.functions.createProfile(createProfileData);
  //         console.log(result);
  //         console.log("hello")
  //       } catch(err) {
  //         console.log(err)
  //       }
  //     }
  //     finallyCreateProfile();
  // }, [data])


  async function createProfile({ to, handle, imageURI, followModule, followModuleData, followNFTURI }: CreateProfileDataStruct) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      console.log(contract)
      const result = await contract.functions.proxyCreateProfile({to, handle, imageURI, followModule, followModuleData, followNFTURI});
      console.log(result);

    } catch (error) {
      console.log(error);
    }
  }

  return { createProfile };
};

export default useMockProfile;