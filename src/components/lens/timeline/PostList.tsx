import React, { useEffect } from 'react';
import Post from '../../../components/lens/publications/Post/Post';
import Mirror from '../../../components/lens/publications/Mirror/Mirror';
// import Profile from '../../../components/lens/publications/Profile/Profile';

import {
  Container,
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  Heading,
  Select,
  Button
} from '@chakra-ui/react';
import useInView from "react-cool-inview";

const PostsList = ({ posts, onLoadMore, next }: { posts:any, onLoadMore:any, next:any }) => {

  const { observe } = useInView({
    threshold: 0.5,
    onEnter: () => {
      onLoadMore()
    }
  })

  return (
  <div>
    <Grid templateColumns='repeat(1, 1fr)' gap={6} >
      {posts.map((post:any, index:any) => {
        return(
          <>
          {post.__typename === "Post" &&  
          <GridItem key={index} >
          <Post post={post} key={index} />
          </GridItem>
          }
          {post.__typename === "Mirror" &&
          <GridItem key={index} >
          <Mirror post={post} key={index} />
          </GridItem>
          }
          </>
        )
      })}
  </Grid>
  <div style={{marginTop: "48px", display: "Flex", alignItems: "center", justifyContent: "center"}}>
    {next && <Button 
    colorScheme={"whatsapp"}
    //@ts-ignore
    ref={observe}
    onClick={() => {
      onLoadMore()
    }}>load more</Button>}
</div>
  </div>
)
}

export default PostsList;