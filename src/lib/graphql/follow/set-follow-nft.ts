import { gql } from '@apollo/client/core';


const CREATE_SET_FOLLOW_NFT_URI_TYPED_DATA = gql`
  mutation($request: CreateSetFollowNFTUriRequest!) { 
    createSetFollowNFTUriTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetFollowNFTURIWithSig {
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
        profileId
        deadline
        followNFTURI
      }
     }
   }
 }
`;

export default CREATE_SET_FOLLOW_NFT_URI_TYPED_DATA;