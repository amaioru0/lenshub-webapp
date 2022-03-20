import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import Post from '../publications/Post/Post';
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
  import GET_TIMELINE from '../../../lib/graphql/timeline/user-timeline';;
  import {useSelector, useDispatch} from 'react-redux'
  import allActions from '../../../store/actions';

const ExplorePublications = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

  const { loading, error, data} = useQuery(GET_TIMELINE, {
    variables: {
      request: {
          //@ts-ignore
        profileId: `0x${state.lens.selectedProfile}`,
        limit: 10,
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
        <Heading as={'h2'}>Timeline</Heading>
        </Box>

        <Box>
        <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        {/* {
          //@ts-ignore
        data.explorePublications.items.map((post, index) => {
          return(
            <GridItem key={index} >
            <Post post={post} />
            </GridItem>
          )
        })} */}

      </Grid>
        </Box>
        </>
    )
}

export default ExplorePublications;