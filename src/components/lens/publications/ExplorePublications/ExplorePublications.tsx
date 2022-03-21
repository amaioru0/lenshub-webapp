import React, { useEffect, useState } from 'react';
import { explore } from '../../../../lib/lens/explore/explore-publications';
import Loader from '../../../Loader/Loader';
import Post from '../Post/Post';
import {
    Container,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    Heading,
  } from '@chakra-ui/react';

  import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
  import EXPLORE_PUBLICATIONS from '../../../../lib/graphql/explore-publications';;


const ExplorePublications = () => {
  const { loading, error, data} = useQuery(EXPLORE_PUBLICATIONS, {
    variables: {
      request: {
        sortCriteria: "TOP_COMMENTED",
        limit: 50
      },
    }
  });

  useEffect(() => {
    console.log("here")
    console.log(data)
  }, [data])


    if(loading) return <Loader />

    if(error) return <h1>error</h1>
    
    return(
        <>
        <Box marginBottom={"30px"} >
        <Heading as={'h2'}>Explore </Heading>
        </Box>

        <Box>
        <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        {
          //@ts-ignore
        data.explorePublications.items.map((post, index) => {
          return(
            <GridItem key={index} >
            <Post post={post} />
            </GridItem>
          )
        })}

      </Grid>
        </Box>
        </>
    )
}

export default ExplorePublications;