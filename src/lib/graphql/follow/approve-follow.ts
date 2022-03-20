import { gql } from '@apollo/client/core';


const APPROVE_FOLLOW = gql`
  mutation($request: ApproveFollowsRequest!) { 
   approveFollow(request: $request)
 }
`;

export default APPROVE_FOLLOW;