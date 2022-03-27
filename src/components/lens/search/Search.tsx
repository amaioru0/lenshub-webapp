import React, { useState, useEffect } from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  Button,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import SEARCH from '../../../lib/graphql/search/search-profiles-or-publications';
const env = process.env.NODE_ENV;
import Profile from '../../lens/profile/Profile/Profile';
import Loader from '../../Loader/Loader';
import { useRouter } from 'next/router'
import Post from '../publications/Post/Post'
import Comment from '../publications/Comment/Comment';
import Mirror from '../publications/Mirror/Mirror';

const Search = ({query, setQuery}: {query:any, setQuery:any}) => {
  const router = useRouter()
  // const getInitialQuery = () => {
  //   if(router.query.slug) {
  //     if(router.query.slug[0[0]]) {
  //       return router.query.slug[0[0]]
  //     } else {
  //       return "lens"
  //     }
  //   }
  // }
  const [type, setType] = useState("PROFILE");

  const {loading, error, data, refetch} = useQuery(SEARCH, {
    variables: { request: {
      query: query,
      type: type,
      limit: 10
    }
  }
  })

  useEffect(() => {
    refetch();
  }, [query])

  useEffect(() => {
    console.log(data)
  }, [data])

    return(
        <Flex alignItems="center">
        <Box px={4} py={5} mx="auto">
        <SimpleGrid
          mx="auto"
        >

          {loading && <Loader />}

      {data?.search?.items?.map((post:any, index:any) => {
        return(
          <GridItem key={index} as="label" colSpan={{ base: "auto", lg: 4 }}>
                  {post.__typename === "Profile" && <Profile profile={post} />}
                  {post.__typename === "Mirror" && <Mirror post={post} />}
                  {post.__typename === "Post" && <Post post={post} />}
                  {post.__typename === "Comment" && <Comment comment={post} />}
          </GridItem>
        )
      })}

        </SimpleGrid>
    </Box>
    </Flex>
    )
};

export default Search;