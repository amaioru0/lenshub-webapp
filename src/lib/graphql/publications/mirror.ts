import { gql } from '@apollo/client/core';

const CREATE_MIRROR_TYPED_DATA = gql`
  mutation($request: CreateMirrorRequest!) { 
    createMirrorTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          MirrorWithSig {
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
        referenceModule
        referenceModuleData
      }
     }
   }
 }
`;

export default CREATE_MIRROR_TYPED_DATA;

  // const createMirrorRequest = { request: {
  //   profileId,
  //   // remember it has to be indexed and follow metadata standards to be traceable!
  //   publicationId: '0x032f1a-0x02',
  //   referenceModule: {
  //     followerOnlyReferenceModule: true,
  //   }
  //  }
  // };