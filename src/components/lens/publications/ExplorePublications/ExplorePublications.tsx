import React, { useEffect, useState } from 'react';
// import { explore } from '../../../lib/lens/explore/explore-publications';
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
    Select,
    useColorModeValue
  } from '@chakra-ui/react';
  import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
  import EXPLORE_PUBLICATIONS from '../../../../lib/graphql/explore-publications';;
import PostsList from './PostsList'
import { Query } from '@apollo/react-components';
import Toolbar from './Toolbar';
import { relative } from 'path';

const ExplorePublications = () => {

  const [sortCriteria, setSortCriteria] = useState("TOP_COMMENTED")
    
    return(
      <>
    <Toolbar>
    <Box
        mx="auto"
        px={18}
        py={2}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        style={{maxWidth: "220px", marginBottom: "20px", position: "relative", left: "-180px"}}
      >
      <Select 
        style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A"}}
        variant='outline'
        colorScheme='teal'
      value={sortCriteria} onChange={(e:any) => {
        setSortCriteria(e.target.value)
      }}>
        <option value='TOP_COMMENTED'>Most commented</option>
        <option value='TOP_COLLECTED'>Most collected</option>
      </Select>
    </Box>
    </Toolbar>
<Query query={EXPLORE_PUBLICATIONS} variables={{request: {
        sortCriteria: sortCriteria,
        limit: 10,  
      }}}>
    {({ data, fetchMore }: { data:any, fetchMore:any }) => {
      if(!data) return null;
      console.log("explore data")
      console.log(data)
      return(
        data && (
          <PostsList
              next={data.explorePublications.pageInfo.next}
              posts={data.explorePublications.items || []}
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    request: {
                      cursor: data.explorePublications.pageInfo.next,
                      sortCriteria: sortCriteria,
                      limit: 10,  
                    }
                  },
                  updateQuery: (prev:any, { fetchMoreResult }:{ fetchMoreResult:any }) => {
                    console.log("update query")
                    console.log(fetchMoreResult)
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      explorePublications: { pageInfo: fetchMoreResult.explorePublications.pageInfo, items: [...prev.explorePublications.items, ...fetchMoreResult.explorePublications.items], __typename: "ExplorePublicationResult"}
                    });
                  }
                })
              }
            />
        )
      )
    }
  
    }
  </Query>
    </>
      //   <>
      //   <Box marginBottom={"30px"} >
      //   <Heading as={'h2'}>Explore </Heading>
      //   </Box>

      //   <Box>
      //   <Grid templateColumns='repeat(1, 1fr)' gap={6}>
      //   {
      //     //@ts-ignore
      //   data.explorePublications.items.map((post, index) => {
      //     return(
      //       <GridItem key={index} >
      //       <Post post={post} />
      //       </GridItem>
      //     )
      //   })}

      // </Grid>
      //   </Box>
      //   </>
    )
}

export default ExplorePublications;