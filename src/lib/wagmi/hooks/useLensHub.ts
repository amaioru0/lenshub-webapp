// import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { LENS_HUB_ABI } from '../ABIs';
import { useContract, useSigner, useAccount } from 'wagmi'
// import {
//   BaseContract,
//   BigNumber,
//   BytesLike,
//   CallOverrides,
//   ContractTransaction,
//   Overrides,
//   PopulatedTransaction,
//   Signer,
//   utils,
// } from "ethers";

import { Signer } from 'ethers';


// Create PRofile
// address to;
// string handle;
// string imageURI;
// address followModule;
// bytes followModuleData;
// string followNFTURI;

import { CreateProfileDataStruct } from '../../../typechain-types/MockProfileCreationProxy';

import { PostDataStruct } from '../../../typechain-types/ILensHub';

const useLensHub = () => {
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
      addressOrName: "0xd7B3481De00995046C7850bCe9a5196B7605c367",
      contractInterface: LENS_HUB_ABI,
      signerOrProvider: signer
    });

    useEffect(() => {
      // this is incorrectly `null` even after `signer` is available
      console.log(contract.signer);
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

  // profileId: BigNumberish;
  // contentURI: string;
  // collectModule: string;
  // collectModuleData: BytesLike;
  // referenceModule: string;
  // referenceModuleData: BytesLike;

  async function post({ profileId, contentURI, collectModule, collectModuleData, referenceModule, referenceModuleData }: PostDataStruct) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      const result = await contract.functions.post({ profileId, contentURI, collectModule, collectModuleData, referenceModule, referenceModuleData });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function createProfile({ to, handle, imageURI, followModule, followModuleData, followNFTURI }: CreateProfileDataStruct) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      const result = await contract.functions.createProfile({to, handle, imageURI, followModule, followModuleData, followNFTURI});
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return { createProfile, post };
};

export default useLensHub;