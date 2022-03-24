import { gql } from '@apollo/client/core';

const CLAIM_HANDLE = gql`
  mutation($request: ClaimHandleRequest!) { 
    claim(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

// variables: {
//   request: {
//     id: handleId,
//   },

export default CLAIM_HANDLE;