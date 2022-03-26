import { FC, ReactNode } from 'react'
import { Header } from '../Header'
import Head from 'next/head'
// import { useWallet } from '../../context/wallet-provider'
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';
import LogoSVG from '../Header/logo.svg';
import { ReactSVG } from 'react-svg'


export const Page: FC = ({ children }) => {
  // const { activateBrowserWallet, account } = useWallet()

  //Uncomment this if you want the wallet to connect as soon as the website loads
  // useEffect(() => {
  //   try {
  //     activateBrowserWallet()
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [activateBrowserWallet])

  return (
    <>
      <Head>
        <title>Lenstify</title>
        <meta name="description" content="Lenstify - a Lens social media platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" backgroundColor="#EAEDF0">
        <Header />
        <main>{children}</main>
        <Footer />
      </Flex>
    </>
  )
}




const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      style={{marginTop: "80px"}}
      >
        
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>

        <ReactSVG 
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 200px')
        }}
        src={LogoSVG} /> 
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
       
        </Text>
      </Box>
    </Box>
  );
}
