import { gql } from '@apollo/client/core';

const CREATE_POST_TYPED_DATA = gql`
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleData
        referenceModule
        referenceModuleData
      }
    }
  }
}
`;

//TODO typings
// const createPostTypedData = (createPostTypedDataRequest: any) => {
//   return apolloClient.mutate({
//     mutation: gql(CREATE_POST_TYPED_DATA),
//     variables: {
//       request: createPostTypedDataRequest,
//     },
//   });
// };

// export const createPost = async () => {
//   const profileId = PROFILE_ID;
//   if (!profileId) {
//     throw new Error('Must define PROFILE_ID in the .env to run this');
//   }

  // const address = getAddressFromSigner();
  // console.log('create post: address', address);

  // await login(address);

  // const currencies = await enabledCurrencies();

  // const ipfsResult = await uploadIpfs();
  // console.log('create post: ipfs result', ipfsResult);



//   const result = await createPostTypedData(createPostRequest);
//   console.log('create post: createPostTypedData', result);

//   const typedData = result.data.createPostTypedData.typedData;
//   console.log('create post: typedData', typedData);

//   const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
//   console.log('create post: signature', signature);

//   const { v, r, s } = splitSignature(signature);

//   const tx = await lensHub.postWithSig({
//     profileId: typedData.value.profileId,
//     contentURI: typedData.value.contentURI,
//     collectModule: typedData.value.collectModule,
//     collectModuleData: typedData.value.collectModuleData,
//     referenceModule: typedData.value.referenceModule,
//     referenceModuleData: typedData.value.referenceModuleData,
//     sig: {
//       v,
//       r,
//       s,
//       deadline: typedData.value.deadline,
//     },
//   });
//   console.log('create post: tx hash', tx.hash);
// };



export default CREATE_POST_TYPED_DATA;