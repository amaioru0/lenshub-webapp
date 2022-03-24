import { gql } from '@apollo/client/core';

const MODULE_APPROVAL_DATA = gql`
  query($request: GenerateModuleCurrencyApprovalDataRequest!) {
    generateModuleCurrencyApprovalData(request: $request) {
      to
   	  from
      data
    }
  }
`;

// currency: currencies.enabledModuleCurrencies.map((c: any) => c.address)[0],
// value: '10',
// collectModule: 'FeeCollectModule',