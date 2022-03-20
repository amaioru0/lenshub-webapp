import React, { useEffect, useState } from 'react';
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
  import GET_PUBLICATIONS from '../../../../lib/graphql/publications/get-publications';

  import {useSelector, useDispatch} from 'react-redux'
  import allActions from '../../../../store/actions';
  import Mirror from '../Mirror/Mirror';
  
const GetPublications = () => {
    
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const { loading, error, data} = useQuery(GET_PUBLICATIONS, {
    variables: {
        request: {
          profileId: state.lens.selectedProfile,
          publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
          limit: 10
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
        <Heading as={'h2'}>Your publications</Heading>
        </Box>

        <Box>
        <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        {
          //@ts-ignore
        data.publications.items.map((post, index) => {
          return(
            <GridItem key={index} >
            <Mirror post={post} />
            </GridItem>
          )
        })}

      </Grid>
        </Box>
        </>
    )
}

export default GetPublications;