import { gql } from '@apollo/client/core';

const CREATE_FOLLOW_TYPED_DATA = gql`
  mutation($request: FollowRequest!) { 
    createFollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
 }
`;

// request: {
//   follow: {
//         profile: profileId,
//       }
// },

export default CREATE_FOLLOW_TYPED_DATA;