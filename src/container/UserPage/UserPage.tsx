import React, { useState, useEffect, useRef, ReactNode, ReactText } from 'react';
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
    useColorModeValue,
    chakra,
    IconButton,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Stack,
    Avatar
  } from '@chakra-ui/react';
import Post from '../../components/lens/publications/Post/Post';
import Loader from '../../components/Loader/Loader';
// import useLensHub from '../../lib/wagmi/hooks/useLensHub';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useConnect, useAccount, defaultChains, defaultL2Chains, useSignMessage } from 'wagmi'
import {useSelector, useDispatch} from 'react-redux'
import GET_PROFILES from '../../lib/graphql/profile/get-profiles';
import Profile from '../../components/lens/profile/Profile/Profile';
import useLensHub from "../../lib/wagmi/hooks/useLensHub";
import DOES_FOLLOW from '../../lib/graphql/follow/does-follow';

const UserPage = ({handle}:{handle:any}) => {
    const [{ data: connectData, error: connectError, loading: connectLoading }, connect] = useConnect()
    const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
      fetchEns: true,
    })
    const state = useSelector(state => state)
    const router = useRouter()

    const {loading, error, data} = useQuery(GET_PROFILES, {
        variables: {
            request: {
                handles: [`${router.query.slug[1]}`]
            }
        }
    })

    let profile = {}
    if(data) {
        profile = data.profiles.items[0];
    }

    const { mirror, follow } = useLensHub()
    const { loading: doesFollowLoading, error: doesFollowError, data:doesFollow} = useQuery(DOES_FOLLOW, {
      variables: {
        request: {
          followInfos: [{
            followerAddress: accountData?.address,
            profileId: profile.id
          }]
        }
      }
    })



    useEffect(() => {
        console.log(data)
    }, [data])

    
    if(loading) return <Loader />
    if(error) return null;

    return(
        <Container 
        shadow="lg"
        rounded="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
        <Box
            bg="#8BD84E"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}> 

        {/* {JSON.stringify(profile)} */}
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        width={400}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={profile.picture?.original.url}
          mb={4}
          pos={'relative'}
          _after={{
            content: `"${profile.id}"`,
            w: 8,
            h: 4,
            bg: 'green.300',
            fontSize: 10,
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'} color="black">
          @{profile.handle}
        </Heading>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Text
          fontWeight={'400'}
          color="grey"
          fontSize="12px"
          >
              {profile.bio}
          </Text>
        </Stack>
      <Stack mt={8} direction={'row'} spacing={4}>
     { doesFollow && doesFollow.doesFollow && <Button variant={"outline"}
        rounded={'full'}
        _hover={{
          bg: '#6FDB2C',
        }}  
        _focus={{
          bg: 'blue.500',
        }}
        fontSize={'sm'}
        color="black"
        flex={"1"}
        onClick={() => {
          follow({profileIds: [profile.id], datas: ["0x0000000000000000000000000000000000000000"] })
        }}
       >
       {doesFollow.doesFollow[0].follows ? <>Following</>:<>Follow</>}
       </Button>}
        </Stack>

        <Stack align={'center'} justify={'center'} direction={'column'} mt={6}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
             <div style={{display: "flex,", alignContent: "center", justifyContent: "center", flexDirection: "column"}}> <Text style={{color: "#8BD94E"}}>Followers<Text style={{fontWeight: 600}}>{profile.stats.totalFollowers}</Text> </Text></div>

             <div style={{display: "flex,", alignContent: "center", justifyContent: "center", flexDirection: "column"}}> <Text style={{color: "#8BD94E"}}>Posts<Text style={{fontWeight: 600}}>{profile.stats.totalPosts}</Text> </Text></div>
             <div style={{display: "flex,", alignContent: "center", justifyContent: "center", flexDirection: "column"}}> <Text style={{color: "#8BD94E"}}>Posts<Text style={{fontWeight: 600}}>{profile.stats.totalPosts}</Text> </Text></div>
          </div>

          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{display: "flex,", alignContent: "center", justifyContent: "center", flexDirection: "column"}}> <Text style={{color: "#8BD94E"}}>Mirrors<Text style={{fontWeight: 600}}>{profile.stats.totalMirrors}</Text> </Text></div>
            <div style={{display: "flex,", alignContent: "center", justifyContent: "center", flexDirection: "column"}}> <Text style={{color: "#8BD94E"}}>Collects<Text style={{fontWeight: 600}}>{profile.stats.totalCollects}</Text> </Text></div>
          </div>
        {/* stats:
totalCollects: 0
totalComments: 0
totalFollowers: 3
totalFollowing: 0
totalMirrors: 0
totalPosts: 0
totalPublications: 0 */}
        </Stack>
      </Box>

        </Box>
        </Flex>
        </Container>
    )
}

export default UserPage;