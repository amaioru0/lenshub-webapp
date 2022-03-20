import React, { useEffect } from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ipfsToImg } from '../../../../utils/ipfsImg';

import Moment from 'react-moment';

const Post = ({post}:{post:any}) => {

  useEffect(() => {
    if(post.__typename === "Post"){
      console.log(post)
    }
  }, [])

  if(post.__typename !== "Post") return <></>

  return (
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {post.createdAt && <Moment>{post.createdAt}</Moment>}
          </chakra.span>

          {/* <Link
            px={3}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{ bg: "gray.500" }}
          >
            Design  
          </Link> */}
        </Flex>

        <Box mt={2}>

            {post.metadata.name && <chakra.h1
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            fontSize="2xl"
            >{post.metadata.name}</chakra.h1>}

          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {post.metadata.content && post.metadata.content}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          {/* <Link
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
          >
            Read more
          </Link> */}

          <Flex alignItems="center">
            {post.metadata.media[0] && <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{ base: "none", sm: "block" }}
              src={post.metadata.media[0] ? ipfsToImg(post.metadata.media[0].original.url) : ""}
              alt="avatar"
            />}
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              {post.profile.handle}
            </Link>
          </Flex>
        </Flex>
      </Box>
  );
};

export default Post;