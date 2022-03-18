import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiProvider } from 'wagmi'
// import { WalletProvider } from '../context/wallet-provider'
import { Page } from '../components/Page'
import { theme } from '../styles/theme'
import { AuthProvider } from '../lib/auth.js'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider autoConnect>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ChakraProvider>
      </AuthProvider>
    </WagmiProvider>
  )
}

export default MyApp
