/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link'
import { useEffect, useState } from 'react';
import Image from 'next/image'

import { Box, Flex, HStack, Stack, Text, } from '@chakra-ui/layout'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Button,
  Link,
  useColorModeValue,
  ChakraProvider
} from '@chakra-ui/react'
import Davatar from '@davatar/react'
import {
  InformationCircleIcon,
  LoginIcon,
  MenuIcon,
  XIcon
} from '@heroicons/react/outline'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'
import { shorten } from '../../utils/shorten'
import { NavButton } from './NavButton'
import { NavDrawerItem, NavItem } from './NavItem'
import { useConnect, useAccount, defaultChains, defaultL2Chains, useSignMessage } from 'wagmi'

import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import GET_CHALLENGE from '../../lib/graphql/challenge';
import AUTHENTICATE from '../../lib/graphql/authenticate';
import { getAccessToken, setAccessToken, logOut } from '../../lib/accessToken';
import { useRouter } from 'next/router';
// @ts-ignore
import { SocialIcon } from 'react-social-icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import EthSignIn from './eth-sign-in.svg'
import { ReactSVG } from 'react-svg'


export const Header = () => {
  const [{ data: connectData, error: connectError, loading: connectLoading }, connect] = useConnect()
  const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
    fetchEns: true,
  })

  const [getChallenge, { loading:challengeLoading, data:challengeData }] = useLazyQuery(GET_CHALLENGE, {
    variables: {
      request: {
        address: accountData ? accountData.address : "",
     },
    }
  });

  const [{ data: signature, error: sigError, loading: SigLoading }, signMessage] = useSignMessage()
  const [clicked, setClicked] = useState(false);

  const [authenticate, { loading:authLoading, data:authData }] = useMutation(AUTHENTICATE, {
    variables: {
      request: {
        address: accountData ? accountData.address : "",
        signature: signature ? signature : "",
      },
    }
  });

// check if user signed in
  const router = useRouter();

const [isSignedIn, setIsSignedIn] = useState(false);

useEffect(() => {
  const checkSignedIn = async () => {
    const token = getAccessToken();
    if(token !== "") {
      setIsSignedIn(true);
    }
    console.log(token);
  }
  checkSignedIn();
}, [getAccessToken()])



  // user clicks button to request challenge
  const loginBro = async (address:any) => {
    setClicked(true);
    await getChallenge()
  }

  // when challenge comes user signs message
  useEffect(() => {
    const askToSign = async () => {
      console.log(challengeData)
        const message = challengeData.challenge.text;
        await signMessage({ message })
        setClicked(false);
    }
    if(!challengeLoading && clicked) {
      askToSign();
    }
  }, [challengeData])

  // after user signed message we login
  useEffect(() => {
    const loginFinally = async () => {
      // const address = accountData && accountData.address ? accountData.address : ""
      await authenticate();
      router.reload()
    }
    if(!SigLoading && !sigError && clicked) {
      loginFinally();
    }
  }, [signature])

  // after auth set the token

  useEffect(() => {
    const setTokenAndDone = async () => {
      console.log(authData)
      setAccessToken(authData.authenticate.accessToken)
    }
    if(authData && authData.authenticate.accessToken) setTokenAndDone();
  }, [authData])

  // 
  const connector = new InjectedConnector({
    chains: [...defaultChains, ...defaultL2Chains],
  })

  const walletConnector = new WalletConnectConnector({
    options: {
      qrcode: true,
    },
  })

  const linkConnector = new WalletLinkConnector({
    options: {
      appName: 'Mirror.xyz',
      jsonRpcUrl: 'https://mainnet.infura.io/v3',
    },
  })

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  // const navItems = [
  //   {
  //     text: 'index',
  //     href: '/'
  //   },
  //   {
  //     text: 'index2',
  //     href: '/index2',
  //     icon: <InformationCircleIcon className="h-6 w-6" />
  //   },
  // ]

  return (
    <header>
      <Box
        shadow="base"
        bg={useColorModeValue("white", "gray.800")}
      >
      <Stack direction={['column', 'column', 'row']} px={2} py={4}>
        <HStack
          justifyContent={['space-between']}
          w={'full'}
          px={{ base: 0, lg: '2rem' }}
        >
          <Box fontWeight="bold" fontSize={[20, 20, 20]}>
            <NextLink href="/" passHref>
              <Link className="center flex gap-2">
                <span className="text-xl">
                {/* <Image
                src="/static/LensHub.png"
                width="350px"
                height="300px" 
              /> */} 
              <h2 style={{fontWeight: 800, color: "#70DB2C", fontSize: "26px"}}>Lenstify</h2>
                </span>
              </Link>
            </NextLink>
          </Box>

          <HStack>
            {/* <HStack
              px={[4, 4, 0]}
              display={['none', 'none', 'none', 'flex']}
              gap={{ lg: '0.4rem', xl: '1.5rem' }}
              mr={4}
            >
              {navItems.map((navItem, index) => (
                <NavItem key={index} href={navItem.href}>
                  <Text className="capitalize">{navItem.text}</Text>
                </NavItem>
              ))}
            </HStack> */}

            {/* Connect Wallet Button */}
            {!isSignedIn && accountData?.address && 
                <NavButton ml="10px" onClick={() => {
                  loginBro(accountData.address);
                }}>
                  <ReactSVG src={EthSignIn} /> &nbsp;Sign-in with Ethereum
                </NavButton>
            }

            {!isSignedIn && !accountData?.address && 
                <NavButton ml="10px" onClick={() => connect(connector)}>
                  Connect
                </NavButton>
            }

            {accountData && accountData.address && isSignedIn && <Menu>
              <MenuButton as={NavButton} ml="30px" >
                <Davatar size={25} address={accountData.address} />
                <Text style={{fontSize: "12px"}}>{shorten(accountData.address)}</Text>   
              </MenuButton>

              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Download</MenuItem>
              </MenuList>
            </Menu>}
   

            {isSignedIn &&
            <NavButton ml="10px" onClick={() => {
              logOut();
              router.reload()
            }}>
              Logout
            </NavButton>
            }

            {/* Drawer Toggle Button */}
            <Button
              backgroundColor="transparent"
              display={['flex', 'flex', 'flex', 'none']}
              color="white"
              _hover={{
                backgroundColor: '#121212'
              }}
              borderRadius="100%"
              onClick={onOpen}
            >
              {isOpen ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </Button>
          </HStack>
        </HStack>
      </Stack>
    </Box>

      {/* Mobile Navbar */}
      <Drawer
        placement={'top'}
        isFullHeight={true}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody background="#1F1B24" px={2}>
            {/* Top Wrapper */}
            <Box
              fontWeight="bold"
              display="flex"
              justifyContent="space-between"
              width="100%"
              paddingX="0.5rem"
              paddingTop="0.5rem"
              marginBottom="3rem"
              fontSize={[20, 20, 20]}
            >
              {/* Alien Logo */}
              <NextLink href="/">
                <Link className="center flex gap-2">
                  <span>👽</span>
                  <span className="text-xl">ilyxium</span>
                </Link>
              </NextLink>

              {/* Wallet and Close Button Wrapper */}
              <Flex gap="0.5rem">
                {/* Connect Wallet Button */}
                <NavButton ml="30px" onClick={() => connect(connector)}>
                  {accountData && accountData.address ? (
                    <>
                    {/* {isSignedIn() ? 
                    <>
                      <Box>
                        <Davatar size={25} address={accountData.address} />
                      </Box>
                      <Text>{shorten(accountData.address)}</Text>
                    </>
                    :
                    <>

                    </>
                    } */}
                    </>
                  ) : (
                    <>
                      <Text className="capitalize">{'connect'}</Text>
                      <LoginIcon className="w-5 h-5" />
                    </>
                  )}
                </NavButton>

                {/* Close Icon */}
                <Button
                  backgroundColor="transparent"
                  color="white"
                  paddingX={0}
                  _hover={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                  borderRadius="100%"
                  onClick={onToggle}
                >
                  <XIcon className="w-7 h-7" />
                </Button>
              </Flex>
            </Box>

            {/* Mapping through Links */}
            {/* {navItems.map((navItem, index) => (
              <NavDrawerItem onClick={onToggle} key={index} href={navItem.href}>
                <Flex alignItems="center" gap={2}>
                  <Text padding="0" fontSize={'2rem'}>
                    {navItem.text}
                  </Text>
                </Flex>
              </NavDrawerItem>
            ))} */}
            {/* Twitter and Language Menu Wrapper */}
            <Flex
              width="100%"
              justify="space-between"
              bottom="2rem"
              alignItems="center"
              left="0"
              paddingX="1.5rem"
              position="absolute"
            >

            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  )
}
