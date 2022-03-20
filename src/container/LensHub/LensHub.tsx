import React, { useState, useEffect, useRef } from 'react';

import { useTransaction, useAccount } from 'wagmi'
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
  } from '@chakra-ui/react';
import Loader from '../../components/Loader/Loader';

import Profile from '../../components/lens/profile/Profile/Profile';

import Post from '../../components/lens/publications/Post/Post';
import ExplorePublications from '../../components/lens/publications/ExplorePublications/ExplorePublications';
import UserTimeline from '../../components/lens/timeline/UserTimeline';


import SelectProfile from '../../components/lens/profile/SelectProfile/SelectProfile';
import CreateProfile from '../../components/lens/profile/CreateProfile/CreateProfile';
// import useAuth from '../../lib/useAuth';
import { getAccessToken, setAccessToken } from '../../lib/accessToken';

import {
    ContainerWrapper
} from '../container.style';

const LensHub = () => {
    const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
        fetchEns: true,
      })
      const dispatch = useDispatch()
      const state = useSelector(state => state)

    // const { loading:loadingProfiles, error:errorProfiles, data:dataProfiles} = useQuery(GET_PROFILES, {
    // variables: {
    //     request: {
    //         ownedBy: accountData?.address
    //     },
    // }
    // });

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
     <ContainerWrapper>
         {isSignedIn && <h1>signed in</h1>}
    <Flex
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
    <Box bg={"#FF579F"}>
        <Box
          maxW="7xl"
          w={{ md: "3xl", lg: "4xl" }}
          mx="auto"
          py={{ base: 12, lg: 16 }}
          px={{ base: 4, lg: 8 }}
          display={{ lg: "flex" }}
          alignItems={{ lg: "center" }}
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
            {isSignedIn && <chakra.span style={{marginBottom: "10px"}} display="block">New profile?</chakra.span>}

            <chakra.div
              display="block"
              color={useColorModeValue("brand.600", "gray.500")}
            >
               <CreateProfile />

            </chakra.div>
          </chakra.h2>

        { isSignedIn && < div style={{marginBottom: "20px", marginTop: "40px"}}>
        <SelectProfile />
      </div>}

        </Box>
      </Box>
      
    </Flex>


      { isSignedIn && <div style={{marginBottom: "20px", marginTop: "40px"}}>
      <UserTimeline />
      </div>}

      <div style={{marginBottom: "20px", marginTop: "40px"}}>
      <ExplorePublications />
      </div>
     </ContainerWrapper>
    )
}

export default LensHub;

