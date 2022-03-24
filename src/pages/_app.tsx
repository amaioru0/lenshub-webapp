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
import { IpfsProvider } from '@onichandame/react-ipfs-hook'
// import provider from '../lib/provider';
import { providers } from 'ethers';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const provider = new providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/mreBORU2DbTDLNPVt88CNrFYNzwvEOUV')

function MyApp({ Component, pageProps, apolloClient }: any) {
  // if(!client) {
  //   return(
  //     <div>loading../</div>
  //   )
  // }
  return (
    <WagmiProvider provider={provider} autoConnect>
      {/* <AuthProvider> */}
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
        <IpfsProvider
          opts={{ host: `localhost`, port: 5001, protocol: `http` }}
          livelinessProbe={true}
          probeInterval={5000}
        >
          <Page>
            <Component {...pageProps} />
          </Page>
          </IpfsProvider>
        </ChakraProvider>
      </ApolloProvider>
      {/* </AuthProvider> */}
    </WagmiProvider>
  )
}

export default withApollo(wrapper.withRedux(MyApp));
