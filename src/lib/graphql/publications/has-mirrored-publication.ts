import { gql } from '@apollo/client/core';


const HAS_MIRRORED = gql`
  query($request: HasMirroredRequest!) {
    hasMirrored(request: $request) {
      profileId
      results {
        mirrored
        publicationId
      }
    }
  }
`;

export default HAS_MIRRORED;

// const result = await hasMirroredRequest([
//   {
//     profileId: '0x032f1a',
//     publicationIds: ['0x032f1a-0x02'],
//   },
//   {
//     profileId: '0x05',
//     publicationIds: ['0x032e32-0x01'],
//   },
// ]);