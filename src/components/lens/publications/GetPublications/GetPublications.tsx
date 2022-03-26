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
    useColorModeValue,
    Wrap,
    WrapItem
  } from '@chakra-ui/react';

  import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
  import GET_PUBLICATIONS from '../../../../lib/graphql/publications/get-publications';

  import {useSelector, useDispatch} from 'react-redux'
  import allActions from '../../../../store/actions';
    import Mirror from '../Mirror/Mirror';
  import Comment from '../Comment/Comment';

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



    if(loading) return <Loader />

    if(error) return <h1>error</h1>
    
    return(
        <>
      <Container 
      // shadow="lg"
      rounded="lg"
      // bg={useColorModeValue("white", "gray.800")}
      maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box
          style={{minWidth: "400px"}}
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}>


        <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        {
          //@ts-ignore
        data.publications.items.map((post, index) => {
          return(
            <GridItem key={index} >
            {post.__typename === "Mirror" && <Mirror post={post} />}
            {post.__typename === "Post" && <Post post={post} />}
            {post.__typename === "Comment" && <Comment comment={post} />}
            </GridItem>
          )
        })}

      </Grid>

        </Box>
        </Flex>
        </Container>
        </>
    )
}

export default GetPublications;