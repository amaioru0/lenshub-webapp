import React, { useState, useEffect, useRef, ReactNode, ReactText } from 'react';
import { IconType } from 'react-icons';
import {useSelector, useDispatch} from 'react-redux'
// import allActions from '../../store/actions';
// import { useLazyQuery, useQuery, useMutation } from '@apollo/client';

import useLensHub from '../../lib/wagmi/hooks/useLensHub';
// import { BigNumber } from '@ethersproject/bignumber'

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
    useDisclosure,
    Input
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
    FiTrello,
    FiBox
  } from 'react-icons/fi';
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'
  import dynamic from 'next/dynamic'

import Loader from '../../components/Loader/Loader';

// import Profile from '../../components/lens/profile/Profile/Profile';

// import Post from '../../components/lens/publications/Post/Post';

const ExplorePublications = dynamic(() => import('../../components/lens/publications/ExplorePublications/ExplorePublications'))
const UserTimeline = dynamic(() => import('../../components/lens/timeline/UserTimeline'))
const GetPublications = dynamic(() => import('../../components/lens/publications/GetPublications/GetPublications'))

const SelectProfile = dynamic(() => import('../../components/lens/profile/SelectProfile/SelectProfile'))
const CreateProfile = dynamic(() => import('../../components/lens/profile/CreateProfile/CreateProfile'))
const PostPublication = dynamic(() => import('../../components/lens/publications/PostPublication/PostPublication'))
const Wallet = dynamic(() => import('../../components/lens/nfts/Wallet/Wallet'))
const RecommendedProfiles = dynamic(() => import('../../components/lens/profile/RecommendedProfiles/RecommendedProfiles'))
const Search = dynamic(() => import('../../components/lens/search/Search'))
const PostPage = dynamic(() => import('../PostPage/PostPage'));
const UserPage = dynamic(() => import('../UserPage/UserPage'));
const HomePage = dynamic(() => import('../HomePage/HomePage'));


// import useAuth from '../../lib/useAuth';
import { getAccessToken, setAccessToken } from '../../lib/accessToken';

import {
    ContainerWrapper
} from '../container.style';
import {
    HubWrapper,
    Top,
    Btm,
    ResponsiveWidget
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
    
    const { createProfile, post, mirror, collect, comment, follow } = useLensHub();
    const [query, setQuery] = useState("lens");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()
    const getInitialQuery = () => {
      if(router.query.slug) {
        if(router.query.slug[0][0]) {
          return router.query.slug[0].toLocaleLowerCase()
        } else if (router.query.slug[0]) {
          return router.query.slug[0].toLocaleLowerCase()
        } else {
          return "";
        }
      } else 
      return ""
    }

    const [currentRoute, setCurrentRoute] = useState(getInitialQuery());


    const [modalIsOpen, setIsOpen] = React.useState(true);
    let subtitle:any;

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    }
  
    function closeModal() {
      setIsOpen(false);
    }
      const dispatch = useDispatch()
      const state = useSelector(state => state)


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

    const handleMenuClick = (linkName:any) => {
        setCurrentRoute(linkName)
        router.push(`/${linkName}`)
    }


    return(
    <Box minH="100vh" >
    <Layout>
    <ResponsiveWidget>
    <Widget>
    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Input
        style={{marginTop: "5px", height: "40px", fontSize: "12px", color: "#8BD94E", maxWidth: "160px"}}
          mt={0}
          size="lg"
          type="text"
          value={query}
          onChange={(e) => {
            if(currentRoute === "search") {
              if(e.target.value === "") {
                setQuery("search..")
                return;
              }
              setQuery(e.target.value)
            } else {
              setCurrentRoute("search")
              if(currentRoute === "search") {
                if(e.target.value === "") {
                  setQuery("search...")
                  return;
                }
              setQuery(e.target.value)
            }
          }
          }}
        />
      </div>
      
    {isSignedIn && <SelectProfile />}


    <>
    {/* {JSON.stringify(router.query)} */}
    {LinkItems.map((link) => {
      if(link.name === "wallet") {
          if(isSignedIn) return(
          <NavItem key={link.name} icon={link.icon}
          onClick={() => {
            handleMenuClick(link.name)
          }}
          >
              {link.name} 
          </NavItem>
          )
          if(!isSignedIn) return <></>
      }
      if(link.name === "") return (
        <NavItem key={link.name} icon={link.icon}
        onClick={() => {
          handleMenuClick(link.name)
        }}
        >
            Home
        </NavItem>
      )
    return(
    <NavItem key={link.name} icon={link.icon}
    onClick={() => {
      handleMenuClick(link.name)
    }}
    >
        {link.name}
    </NavItem>
    )
    })}
    </>
    </Widget>
    </ResponsiveWidget> 

    </Layout>

    
    <ContainerWrapper>

    <HubWrapper>


    {currentRoute === '' && <div>
        
        <Top>
        {/* {isSignedIn && <SelectProfile />} */}
        <Box
        mx="auto"
        py={{ base: 12, lg: 16 }}
        width="100%"
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
        </chakra.h2>

        {!isSignedIn && currentRoute === "" && <HomePage>
        {/* {!isSignedIn && !accountData?.address && <div>connect</div>} */}
        </HomePage>}

        <chakra.div
            display="block"
            color={useColorModeValue("brand.600", "gray.500")}
        >

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
      

      
    <div style={{marginBottom: "10px", marginTop: "30px"}}>
      {currentRoute === "" && isSignedIn && <GetPublications />}
      {currentRoute === '' && isSignedIn && <UserTimeline />}
      {currentRoute === 'explore' && <ExplorePublications />}
      {currentRoute === 'profiles' && isSignedIn && accountData?.address && <CreateProfile />}
      {currentRoute === 'profiles' && <RecommendedProfiles />}      
      {currentRoute === 'search' && <Search query={query} setQuery={setQuery}/>}  
      {currentRoute === 'post' && <PostPage post={router.query.slug[1]}/>}  
      {currentRoute === 'user' && <UserPage handle={router.query.slug[1]}/>}  

      
     </div>

    {currentRoute === 'wallet' && isSignedIn && accountData?.address &&
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
  { name: '', icon: FiHome },
  { name: 'explore', icon: FiCompass },
  { name: 'profiles', icon: FiTrello },
  { name: 'wallet', icon: FiBox },
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
