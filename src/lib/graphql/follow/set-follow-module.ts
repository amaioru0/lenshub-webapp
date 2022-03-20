import { gql } from '@apollo/client/core';

const CREATE_SET_FOLLOW_MODULE_TYPED_DATA = gql`
  mutation($request: CreateSetFollowModuleRequest!) { 
    createSetFollowModuleTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetFollowModuleWithSig {
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
        followModule
        followModuleData
      }
     }
   }
 }
`;

export default CREATE_SET_FOLLOW_MODULE_TYPED_DATA;