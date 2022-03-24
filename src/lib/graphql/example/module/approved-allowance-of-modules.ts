import { gql } from '@apollo/client/core';

const ALLOWANCE = gql`
  query($request: ApprovedModuleAllowanceAmountRequest!) {
    approvedModuleAllowanceAmount(request: $request) {
      currency
      module
      contractAddress
      allowance
    }
  }
`;

// currencies: ['0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'],
// collectModules: [
//   'LimitedFeeCollectModule',
//   'FeeCollectModule',
//   'LimitedTimedFeeCollectModule',
//   'TimedFeeCollectModule',
//   'EmptyCollectModule',
//   'RevertCollectModule',
// ],
// followModules: ['FeeFollowModule'],
// referenceModules: ['FollowerOnlyReferenceModule'],
// });
