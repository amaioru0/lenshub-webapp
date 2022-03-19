import React, { useEffect, useState } from 'react';
import { explore } from '../../../lib/lens/explore/explore-publications';
import Loader from '../../../components/Loader/Loader';
import Post from '../../lens/Post/Post';
import {
    Container,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    Heading,
  } from '@chakra-ui/react';

const ExplorePosts = () => {
    const [exploreData, setExploreData] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchExplore = async () => {
          setLoading(true)
          const exploreDataRes = await explore();
          // console.log(exploreDataRes)
          setExploreData(exploreDataRes)
          setLoading(false)
        } 
        fetchExplore(); 
      },[])

    if(loading) return <Loader />
    
    return(
        <>
        <Box marginBottom={"30px"} >
        <Heading as={'h2'}>Explore Posts</Heading>
        </Box>

        <Box>
        {
        //@ts-ignore
      exploreData.explorePublications && exploreData.explorePublications.items && <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        {
          //@ts-ignore
        exploreData.explorePublications.items.map((post, index) => {
          return(
            <GridItem key={index} >
            <Post post={post} />
            </GridItem>
          )
        })}

      </Grid>}
        </Box>
        </>
    )
}

export default ExplorePosts;