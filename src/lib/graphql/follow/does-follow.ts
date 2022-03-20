import { gql } from '@apollo/client/core';

const DOES_FOLLOW = gql`
  query($request: DoesFollowRequest!) {
    doesFollow(request: $request) { 
			followerAddress
    	profileId
    	follows
		}
  }
`;

export default DOES_FOLLOW;