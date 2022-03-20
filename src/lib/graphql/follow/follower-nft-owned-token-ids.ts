import { gql } from '@apollo/client/core';
i

const GET_FOLLOWER_NFT_TOKEN_IDS = gql`
  query($request: FollowerNftOwnedTokenIdsRequest!) {
    followerNftOwnedTokenIds(request: $request) { 
        followerNftAddress
        tokensIds
	  }
  }
`;

export default GET_FOLLOWER_NFT_TOKEN_IDS