import { gql } from '@apollo/client/core';


const CREATE_COLLECT_TYPED_DATA = gql`
  mutation($request: CreateCollectRequest!) { 
    createCollectTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
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
        pubId
        data
      }
     }
   }
 }
`;

// collector: address,
// profileId: typedData.value.profileId,
// pubId: typedData.value.pubId,
// data: typedData.value.data,