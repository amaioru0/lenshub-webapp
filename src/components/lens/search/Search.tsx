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


const Search = () => {
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
  const [query, setQuery] = useState("lens");
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
        <Box px={4} py={32} mx="auto">
        <SimpleGrid
          as="form"
          w={{ base: "full", md: 7 / 12 }}
          columns={{ base: 1, lg: 6 }}
          spacing={3}
          pt={1}
          mx="auto"
          mb={8}
        >
          <GridItem as="label" colSpan={{ base: "auto", lg: 4 }}>
            <VisuallyHidden>{query}</VisuallyHidden>
            <Input
              mt={0}
              size="lg"
              type="text"
              value={query}
              onChange={(e) => {
                  setQuery(e.target.value)
              }}
            />
          </GridItem>

          {loading && <Loader />}

{data?.search?.items?.map((profile:any, index:any) => {
  return(
    <GridItem as="label" colSpan={{ base: "auto", lg: 4 }}>
    <Profile profile={profile} />
    </GridItem>
  )
})}

        </SimpleGrid>
    </Box>
    </Flex>
    )
};

export default Search;