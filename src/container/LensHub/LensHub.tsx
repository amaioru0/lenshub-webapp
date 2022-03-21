import React, { useState, useEffect, useRef, ReactNode, ReactText } from 'react';
import { IconType } from 'react-icons';
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../store/actions';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { BigNumber } from '@ethersproject/bignumber'

import {
    Button,
    ButtonGroup,
    Container,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    Heading,
    chakra,
    useColorModeValue,
    Stack,
    Link,
    useDisclosure
  } from '@chakra-ui/react';
  import {
    IconButton,
    Avatar,
    CloseButton,
    HStack,
    VStack,
    Icon,
    Drawer,
    DrawerContent,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
  } from '@chakra-ui/react';
  import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
  } from 'react-icons/fi';
import Loader from '../../components/Loader/Loader';

import Profile from '../../components/lens/profile/Profile/Profile';

import Post from '../../components/lens/publications/Post/Post';
import ExplorePublications from '../../components/lens/publications/ExplorePublications/ExplorePublications';
import UserTimeline from '../../components/lens/timeline/UserTimeline';
import GetPublications from '../../components/lens/publications/GetPublications/GetPublications'

import SelectProfile from '../../components/lens/profile/SelectProfile/SelectProfile';
import CreateProfile from '../../components/lens/profile/CreateProfile/CreateProfile';
import PostPublication from '../../components/lens/publications/PostPublication/PostPublication';
import Wallet from '../../components/lens/nfts/Wallet/Wallet';

// import useAuth from '../../lib/useAuth';
import { getAccessToken, setAccessToken } from '../../lib/accessToken';

import {
    ContainerWrapper
} from '../container.style';
import {
    HubWrapper,
    Top,
    Btm
} from './LensHub.style';
import { NavButton } from '../../components/Header/NavButton/index';
import { useConnect, useAccount, defaultChains, defaultL2Chains, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useRouter } from 'next/router';

const LensHub = () => {
    const [{ data: connectData, error: connectError, loading: connectLoading }, connect] = useConnect()
    const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
      fetchEns: true,
    })
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()
    const [currentRoute, setCurrentRoute] = useState(router.query.page ? router.query.page   : 'Home');

      const dispatch = useDispatch()
      const state = useSelector(state => state)

      useEffect(() => {
        console.log("state")
        console.log(state)
      }, [state])

    // const { loading:loadingProfiles, error:errorProfiles, data:dataProfiles} = useQuery(GET_PROFILES, {
    // variables: {
    //     request: {
    //         ownedBy: accountData?.address
    //     },
    // }
    // });
    const connector = new InjectedConnector({
        chains: [...defaultChains, ...defaultL2Chains],
      })

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
    

    // const { isSignedIn } = useAuth();
      
    return(
    <Box minH="100vh" >
    <Layout>
    <Widget>
    <>
    {isSignedIn && <SelectProfile />}
    {LinkItems.map((link) => (
    <NavItem key={link.name} icon={link.icon}
    onClick={() => setCurrentRoute(link.name)}
    >
        {link.name}
    </NavItem>
    ))}
    </>
    </Widget>


    </Layout>

    
    <ContainerWrapper>
    {isSignedIn && <h1>signed in</h1>}

    <HubWrapper>
    {currentRoute === 'Home' && <div>
        
        <Top>
        {/* {isSignedIn && <SelectProfile />} */}
        <Box
        mx="auto"
        py={{ base: 12, lg: 16 }}
        px={{ base: 4, lg: 8 }}
        display={{ lg: "flex" }}
        alignItems={{ lg: "center" }}
        flexDirection="row"
        justifyContent={{ lg: "space-between" }}
        >
        <chakra.h2
        fontSize={{ base: "3xl", sm: "4xl" }}
        fontWeight="extrabold"
        letterSpacing="tight"
        lineHeight="shorter"
        color={useColorModeValue("gray.900", "gray.100")}
        >
        {!isSignedIn && <chakra.span display="block">Ready to dive in?</chakra.span>}
        {!isSignedIn && !accountData?.address && <div>connect</div>}
        {isSignedIn && <chakra.span style={{marginBottom: "10px"}} display="block">New profile?</chakra.span>}
        </chakra.h2>

        <chakra.div
            display="block"
            color={useColorModeValue("brand.600", "gray.500")}
        >
            {isSignedIn && accountData?.address && <CreateProfile />}

            {!accountData?.address && 
            <>
            <NavButton ml="30px" onClick={() => connect(connector)}>
              Connect  
            </NavButton>
            </>
            }
        </chakra.div>
        </Box>
        </Top>


        <Btm>
        {isSignedIn && <PostPublication />}
        </Btm>
          </div>}

    {/* <Flex alignItems={"center"} flexDirection={"column"} >
        <div>
        <Flex alignItems={"center"} flexDirection={"row"} justifyContent={"space-around"}>


        </Flex>
        </div>

        <div>
        </div>
        </Flex> */}
      
    {/* { isSignedIn && <div style={{marginBottom: "20px", marginTop: "40px"}}>
      <GetPublications />
      </div>} */}
        
        
       {/* { isSignedIn && <div style={{marginBottom: "20px", marginTop: "40px"}}>
      <UserTimeline />
      </div>} */}


      
      <div style={{marginBottom: "10px", marginTop: "30px"}}>
      {currentRoute === "Home" && isSignedIn && <GetPublications />}
      {currentRoute === 'Home' && isSignedIn && <UserTimeline />}
     {currentRoute === 'Explore' && <ExplorePublications />}
     </div>

    {currentRoute === 'Wallet' && isSignedIn && accountData?.address &&
      <div>
        <Wallet />
      </div>
    }

      <div>

      </div>
      </HubWrapper>
     </ContainerWrapper>
     </Box>
    
    )
}

export default LensHub;

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Explore', icon: FiCompass },
  { name: 'Profiles', icon: FiStar },
  { name: 'Wallet', icon: FiSettings },
];


interface SidebarProps extends BoxProps {
  onClose: () => void;
}


const Widget = ({children}:{children:any}) => {
    return(
        <>
        <Box
        mx="auto"
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
          transition="3s ease"
          borderRight="1px"
          borderRightColor={useColorModeValue('gray.200', 'gray.700')}
          left={1}
          h="full"
          style={{color: "black", marginLeft: "60px", maxHeight: "500px", minWidth: "220px", marginTop: "10px", marginBottom: "10px"}}
          >
        {children}
        </Box>
        </>
    )
}

const Layout = ({children}:{children:any}) => {
  return (
    <Box
      pos="absolute"
      left={-16}
      h="full"
      style={{color: "black", marginLeft: "60px", maxHeight: "1000px", minWidth: "220px", display: "flex", flexDirection: "column"}}
      >
    {children}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="2"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#6FDB2C',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
