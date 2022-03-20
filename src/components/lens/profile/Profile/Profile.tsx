import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

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


const Profile = (profile:any) => {
  return (
      <Box
        w="xs"
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        {profile.profile.picture && <Image
          w="full"
          h={56}
          fit="cover"
          src={profile.profile.picture}
          alt="Profile Picture"
        />}

        <Box py={5} textAlign="center">
          <Link
            display="block"
            fontSize="2xl"
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
          >
            {profile.profile.handle}
          </Link>
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.700", "gray.200")}
          >
            Profile ID: {profile.profile.id}
          </chakra.span>
        </Box>
      </Box>
  );
};

export default Profile;