import { gql } from '@apollo/client/core';

const CREATE_UNFOLLOW_TYPED_DATA = gql`
  mutation($request: UnfollowRequest!) { 
    createUnfollowTypedData(request: $request) {
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
          BurnWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
 }
`;

export default CREATE_UNFOLLOW_TYPED_DATA;