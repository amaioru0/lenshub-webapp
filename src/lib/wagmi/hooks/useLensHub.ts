// import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { LENS_HUB_ABI } from '../ABIs';
import { useContract, useSigner, useAccount } from 'wagmi'
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
  BigNumberish
} from "ethers";



import { CreateProfileDataStruct } from '../../../typechain-types/MockProfileCreationProxy';

import { PostDataStruct, MirrorDataStruct, SetFollowModuleWithSigDataStruct, CommentDataStruct } from '../../../typechain-types/ILensHub';

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

    // useEffect(() => {
    //   console.log(contract.signer);
    // }, [contract]);
  


  // LENS HUB FUNCTIONS


  // async function example({  } : { }) {
  //   try {
  //     // const result = await contract.functions.collect({profileId, pubId, data, overrides});
  //     // console.log(result);
  //     // return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function collect({ profileId, pubId, data } : { profileId: BigNumberish, pubId: BigNumberish, data: BytesLike}) {
    try {
      const result = await contract.functions.collect(profileId, pubId, data);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile({ profileId, pubId, data } : { profileId: BigNumberish, pubId: BigNumberish, data: BytesLike}) {
    try {
      const result = await contract.functions.collect(profileId, pubId, data);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  

  async function collectWithSig({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function comment({ profileId, contentURI, profileIdPointed, pubIdPointed, collectModule, collectModuleData, referenceModuleData, referenceModule } : CommentDataStruct) {
    try {
      const result = await contract.functions.comment({profileId, contentURI, profileIdPointed, pubIdPointed, collectModule, collectModuleData, referenceModuleData, referenceModule});
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  async function commentWithSig({  } : CommentDataStruct) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }


  async function follow({ profileIds, datas } : { profileIds: BigNumberish[], datas: BytesLike[] }) {
    try {

      const result = await contract.functions.follow(profileIds, datas);
      console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function followWithSig({  } : { }) {
    try {
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCollectModule({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getCollectNFT({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getContentURI({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getDispatcher({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getFollowModule({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getFollowNFT({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getFollowNFTURI({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getHandle({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getProfile({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getProfileIdByHandle({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getPub({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getPubCount({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getPubPointer({  } : { }) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async function getPubType({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getReferenceModule({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }


  

  async function mirrorWithSig({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function postWithSig({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function setDispatcher({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function setFollowModule({ profileId, followModule, followModuleData } : { profileId:BigNumberish, followModule:string, followModuleData:BytesLike}) {
    try {
      const results = await contract.function.setFollowModule(profileId, followModule, followModuleData)
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async function setFollowNFTURI({ profileId, followNFTURI } : { profileId: BigNumberish, followNFTURI: string }) {
    try {
      const results = await contract.function.setFollowNFTURI(profileId, followNFTURI)
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async function setProfileImageURI({ profileId, imageURI } : { profileId: BigNumberish, imageURI: string }) {
    try {  
      const results = await contract.function.setProfileImageURI(profileId, imageURI)
      return results;
    } catch (error) {
      console.log(error);
    }
  }


  async function post({ profileId, contentURI, collectModule, collectModuleData, referenceModule, referenceModuleData }: PostDataStruct) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      const result = await contract.functions.post({ profileId, contentURI, collectModule, collectModuleData, referenceModule, referenceModuleData });
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  // profileId: BigNumberish;
  // profileIdPointed: BigNumberish;
  // pubIdPointed: BigNumberish;
  // referenceModule: string;
  // referenceModuleData: BytesLike;

  async function mirror({ profileId, profileIdPointed, pubIdPointed, referenceModule, referenceModuleData }: MirrorDataStruct) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      const result = await contract.functions.mirror({profileId, profileIdPointed, pubIdPointed, referenceModule, referenceModuleData});
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

  return { createProfile, post, mirror, collect, comment, follow, setFollowModule, setFollowNFTURI, setProfileImageURI };
};

export default useLensHub;