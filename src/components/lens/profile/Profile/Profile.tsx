import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  Heading,
  Avatar,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  color,
} from "@chakra-ui/react";

// import {
//   ProfileImg
// } from './Profile.style';

// bio: null
// coverPicture: null
// depatcher: null
// followModule: null
// handle: "1647627445094"
// id: "0x23"
// location: null
// name: null
// ownedBy: "0x7084C8A2943df2115C4Ca9b70ce6b963A5993906"
// picture: null
// stats: {totalFollowers: 0, totalFollowing: 0, totalPosts: 0, totalComments: 0, totalMirrors: 0, …}
// twitterUrl: null
// website: null
import CREATE_FOLLOW_TYPED_DATA from '../../../../lib/graphql/follow/follow';
import DOES_FOLLOW from '../../../../lib/graphql/follow/does-follow';
import UNFOLLOW from '../../../../lib/graphql/follow/unfollow';
import APPROVE_FOLLOW from '../../../../lib/graphql/follow/approve-follow';
import GET_FOLLOWING from '../../../../lib/graphql/follow/following';
import GET_FOLLOWERS from '../../../../lib/graphql/follow/followers';

import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import useLensHub from "../../../../lib/wagmi/hooks/useLensHub";
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../../../store/actions';
import { useAccount } from 'wagmi'

const Profile = (profile:any, version:any) => {
  const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
    fetchEns: true,
  })
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const { mirror, follow } = useLensHub()
  const { loading: doesFollowLoading, error: doesFollowError, data:doesFollow} = useQuery(DOES_FOLLOW, {
    variables: {
      request: {
        followInfos: [{
          followerAddress: accountData?.address,
          profileId: profile.profile.id
        }]
      }
    }
  })
  return (
    // {"id":"0x13","name":"Yoginth","bio":"요기 • Creator of @lensterxyz 🌿 • Developer at @CRED_club • Ecosystem dev at @ENS_DAO 🤝 • FDD at @GitcoinDAO 🛡️ • Bullish on Ξ • BTS Fanboi ⟬⟭ • he/him 🌳","location":"India","website":"https://yogi.codes","twitterUrl":"https://twitter.com/yogicodes","picture":{"original":{"url":"https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U","width":null,"height":null,"mimeType":null,"__typename":"Media"},"small":null,"medium":null,"__typename":"MediaSet"},"handle":"yoginth","coverPicture":{"original":{"url":"https://ipfs.infura.io/ipfs/QmR7vBHZm78hsymxYFkQBV4UC42Y4iGyHgyFwisMu9S66B","width":null,"height":null,"mimeType":null,"__typename":"Media"},"small":null,"medium":null,"__typename":"MediaSet"},"ownedBy":"0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3","depatcher":null,"stats":{"totalFollowers":13,"totalFollowing":18,"totalPosts":65,"totalComments":34,"totalMirrors":3,"totalPublications":102,"totalCollects":25,"__typename":"ProfileStats"},"followModule":null,"__typename":"Profile"}

      <Center py={6}>
        {/* {JSON.stringify(profile.profile)} */}
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={profile.profile.picture?.original.url}
          mb={4}
          pos={'relative'}
          _after={{
            content: `"${profile.profile.id}"`,
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
          @{profile.profile.handle}
        </Heading>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Text
          fontWeight={'400'}
          color="grey"
          fontSize="12px"
          >
              {profile.profile.bio}
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
          follow({profileIds: [profile.profile.id], datas: ["0x0000000000000000000000000000000000000000"] })
        }}
       >
       {doesFollow.doesFollow[0].follows ? <>Following</>:<>Follow</>}
       </Button>}
        </Stack>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <li>
            <ul>
             <div style={{display: "flex,", alignContent: "center", justifyContent: "center", flexDirection: "column"}}> <Text style={{color: "#8BD94E"}}>Followers<Text style={{fontWeight: 600}}>{profile.profile.stats.totalFollowers}</Text> </Text></div>
            </ul>
          </li>
        {/* stats:
totalCollects: 0
totalComments: 0
totalFollowers: 3
totalFollowing: 0
totalMirrors: 0
totalPosts: 0
totalPublications: 0 */}
        </Stack>
        {/* {JSON.stringify(profile.profile)} */}
      </Box>
    </Center>
  );
};

export default Profile;