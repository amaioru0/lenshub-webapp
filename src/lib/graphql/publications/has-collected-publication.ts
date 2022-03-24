import { gql } from '@apollo/client/core';


const HAS_COLLECTED = gql`
  query($request: HasCollectedRequest!) {
    hasCollected(request: $request) {
      walletAddress
      results {
        collected
        publicationId
        collectedTimes
      }
    }
  }
`;

export default HAS_COLLECTED;

//   {
//     walletAddress: '0x109eCbC12836F7Dd63255254fa973d21425819aE',
//     publicationIds: ['0x032f1a-0x02', '0x17-0x01'],
//   },