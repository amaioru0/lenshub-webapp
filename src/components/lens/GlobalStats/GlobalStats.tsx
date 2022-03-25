import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
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
import gql from 'graphql-tag';


const GLOBAL_PROTOCOL_STATS = gql`
query GlobalProtocolStats {
    globalProtocolStats(request: null) {
      totalProfiles
      totalBurntProfiles
      totalPosts
      totalMirrors
      totalComments
      totalCollects
      totalFollows
      totalRevenue {
        asset {
          name
          symbol
          decimals
          address
        }
        value
      }
    }
  }
`

const GlobalStats = () => {
    const {loading, error, data} = useQuery(GLOBAL_PROTOCOL_STATS)

    if(loading) return <Loader />
    if(error) return null

    return(
        <Grid style={{marginTop: "60px", border: "3px solid #9DD764", padding: "30px", borderRadius: "12px"}} templateColumns='repeat(2, 1fr)' gap={6}>
            {/* {JSON.stringify(data)} */}
            <GridItem>
                <Text style={{color: "#9DD764", fontWeight: "600", fontSize: "italic"}}>{data.globalProtocolStats.totalProfiles}</Text> profiles
            </GridItem>

            <GridItem>
            <Text style={{color: "#9DD764", fontWeight: "600", fontSize: "italic"}}> {data.globalProtocolStats.totalBurntProfiles}</Text> burned 
            </GridItem>

            <GridItem>
            <Text style={{color: "#9DD764", fontWeight: "600", fontSize: "italic"}}>{data.globalProtocolStats.totalPosts}</Text> posts
            </GridItem>

            <GridItem>
            <Text style={{color: "#9DD764", fontWeight: "600", fontSize: "italic"}}> {data.globalProtocolStats.totalMirrors}</Text> mirrored
            </GridItem>

            <GridItem>
            <Text style={{color: "#9DD764", fontWeight: "600", fontSize: "italic"}}> {data.globalProtocolStats.totalComments}</Text> comments
            </GridItem>

            <GridItem>
            <Text style={{color: "#9DD764", fontWeight: "600", fontSize: "italic"}}>{data.globalProtocolStats.totalCollects}</Text> collects
            </GridItem>


            <GridItem>
            <Text style={{color: "#9DD764", fontWeight: "600", fontSize: "italic"}}>{data.globalProtocolStats.totalFollows}</Text> follows
            </GridItem>
        </Grid>
    )
}

export default GlobalStats;