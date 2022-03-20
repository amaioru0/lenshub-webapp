import { gql } from '@apollo/client/core';

const CREATE_COMMENT_TYPED_DATA = gql`
  mutation($request: CreatePublicCommentRequest!) { 
    createCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
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
        profileIdPointed
        pubIdPointed
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


export default CREATE_COMMENT_TYPED_DATA;

// const createCommentRequest = {
//   profileId,
//   // remember it has to be indexed and follow metadata standards to be traceable!
//   publicationId: `0x032f1a-0x02`,
//   contentURI: 'ipfs://' + ipfsResult.path,
//   collectModule: {
//     timedFeeCollectModule: {
//       amount: {
//         currency: currencies.enabledModuleCurrencies.map(
//           (c: any) => c.address
//         )[0],
//         value: '0.01',
//       },
//       recipient: address,
//       referralFee: 10.5,
//     },
//   },
//   referenceModule: {
//     followerOnlyReferenceModule: false,
//   },