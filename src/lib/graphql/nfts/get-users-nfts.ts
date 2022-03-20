import { gql } from '@apollo/client/core';

const GET_USERS_NFTS = gql`
  query($request: NFTsRequest!) {
    nfts(request: $request) {
      items {
        contractName
        contractAddress
        symbol
        tokenId
        owners {
          amount
          address
        }
        name
        description
        contentURI
        originalContent {
          uri
          metaType
        }
        chainId
        collectionName
        ercType
      }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`;

export default GET_USERS_NFTS;

// request: {
//   ownerAddress,
//   contractAddress,
//   chainIds,
//   limit: 10,
// },