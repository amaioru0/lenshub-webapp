import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiProvider } from 'wagmi'
// import { WalletProvider } from '../context/wallet-provider'
import { Page } from '../components/Page'
import { theme } from '../styles/theme'
// import { AuthProvider } from '../lib/auth.js'

import { ApolloProvider } from "@apollo/react-hooks";
import { withApollo } from "../lib/apollo";
import { wrapper } from '../store';

function MyApp({ Component, pageProps, apolloClient }: any) {
  // if(!client) {
  //   return(
  //     <div>loading../</div>
  //   )
  // }
  return (
    <WagmiProvider autoConnect>
      {/* <AuthProvider> */}
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ChakraProvider>
      </ApolloProvider>
      {/* </AuthProvider> */}
    </WagmiProvider>
  )
}

export default withApollo(wrapper.withRedux(MyApp));
