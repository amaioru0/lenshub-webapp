import React, { useEffect } from 'react';
import Post from '../Post/Post';
import {
  Container,
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  Heading,
  Select
} from '@chakra-ui/react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const PostsList = ({ posts, onLoadMore }: { posts:any, onLoadMore:any }) => {

  const scrollRef = useBottomScrollListener(() => {
    console.log("handle scroll")
    onLoadMore()
  });
  return (
  <div>
    <Grid templateColumns='repeat(1, 1fr)' gap={6} >
      {posts.map((post:any, index:any) => (
        <GridItem key={index} >
          <Post post={post} key={index} />
        </GridItem>
      ))}
  </Grid>
    <button 
    onClick={() => {
      onLoadMore()
    }}>load more</button>

    <div 
    //@ts-ignore
    ref={scrollRef}>
    b
    </div>
  </div>
)
}

export default PostsList;