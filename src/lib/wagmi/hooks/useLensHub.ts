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

    useEffect(() => {
      console.log(contract.signer);
    }, [contract]);
  


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

  async function collect({ profileId, pubId, data, overrides } : { profileId: BigNumberish, pubId: BigNumberish, data: BytesLike, overrides: Overrides & { from?: string | Promise<string> }}) {
    try {
      const result = await contract.functions.collect(profileId, pubId, data, overrides);
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
      const result = await contract.functions.comment(profileId, contentURI, profileIdPointed, pubIdPointed, collectModule, collectModuleData, referenceModuleData, referenceModule);
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


  async function follow({ profileIds, datas, overrides } : { profileIds: BigNumberish[], datas: BytesLike[], overrides: CallOverrides }) {
    try {

      const result = await contract.functions.follow(profileIds, datas, overrides);
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
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCollectNFT({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getContentURI({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDispatcher({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getFollowModule({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getFollowNFT({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
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
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getProfile({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getProfileIdByHandle({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getPub({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getPubCount({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function getPubPointer({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
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

  async function setFollowModule({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function setFollowNFTURI({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function setProfileImageURI({  } : { }) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      // const result = await contract.functions.collect({profileId, pubId, data, overrides});
      // console.log(result);
      // return result;
    } catch (error) {
      console.log(error);
    }
  }


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


  // profileId: BigNumberish;
  // profileIdPointed: BigNumberish;
  // pubIdPointed: BigNumberish;
  // referenceModule: string;
  // referenceModuleData: BytesLike;

  async function mirror({ profileId, profileIdPointed, pubIdPointed, referenceModule, referenceModuleData }: MirrorDataStruct) {
    try {
      // setCreateProfileData({to, handle, imageURI, followModule, followModuleData, followNFTURI})
      const result = await contract.functions.mirror(profileId, profileIdPointed, pubIdPointed, referenceModule, referenceModuleData);
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

  return { createProfile, post, mirror, collect, comment, follow };
};

export default useLensHub;