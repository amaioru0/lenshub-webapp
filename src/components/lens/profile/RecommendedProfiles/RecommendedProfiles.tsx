
import React, { useEffect, useState } from 'react';
import Loader from '../../../Loader/Loader';
import Profile from '../Profile/Profile';
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

  import {useSelector, useDispatch} from 'react-redux'
  import allActions from '../../../../store/actions';
//   import Mirror from '../Mirror/Mirror';
  import RECOMMENDED_PROFILES from '../../../../lib/graphql/profile/recommended-profiles'

const RecommendedProfiles = () => {
    
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const { loading, error, data} = useQuery(RECOMMENDED_PROFILES)


  useEffect(() => {
    console.log("data recommended profiles")
    console.log(data)
  }, [data])


    if(loading) return <Loader />

    if(error) return <h1>error</h1>
    
    return(
        <>
        <Box marginBottom={"30px"} >
        <Heading as={'h2'}>Recommended Profiles</Heading>
        </Box>

        <Box>
        <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        {
          //@ts-ignore
        data.recommendedProfiles.map((profile, index) => {
          return(
            <GridItem key={index} >
                <Profile profile={profile} />
            </GridItem>
          )
        })}

      </Grid>
        </Box>
        </>
    )
}

export default RecommendedProfiles;