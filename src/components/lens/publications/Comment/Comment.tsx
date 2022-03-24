import React, { useEffect, useState } from 'react';
// import { explore } from '../../../lib/lens/explore/explore-publications';
import Loader from '../../../Loader/Loader';
import {
    Container,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    Heading,
    Select,
    useColorModeValue,
    chakra
  } from '@chakra-ui/react';
  import Moment from 'react-moment';
  import Davatar from '@davatar/react'

  const Comment = (comment:any) => {
    useEffect(() => {
      console.log(comment)
    }, [comment])
    return(
      <Box
      mx="auto"
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg={useColorModeValue("white", "gray.800")}
      maxW="2xl"
      style={{marginTop: "30px  "}}
    >
    <Flex justifyContent="space-between" alignItems="center">


    <div style={{flexDirection: "row", display: "flex"}}>
      <Davatar size={28} address={comment.comment.profile.ownedBy} />
      <chakra.h1 style={{fontSize: "16px", fontWeight: "700",marginLeft: "10px", color: "#171923"}}>@{comment.comment.profile.handle}</chakra.h1>
    </div>
    <chakra.span
      fontSize="sm"
      color={useColorModeValue("gray.600", "gray.400")}
    >
      {comment.createdAt && <Moment>{comment.comment.createdAt}</Moment>}
    </chakra.span>
    </Flex>

    <Box mt={2}>

    {comment.comment.metadata.name && <chakra.h1
    color={useColorModeValue("gray.700", "white")}
    fontWeight="300"
    fontSize="1xl"
    >{comment.comment.metadata.name}</chakra.h1>}

    <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
      {comment.comment.metadata.content && comment.comment.metadata.content}
    </chakra.p>
    </Box>
      </Box>
    )
  }

  export default Comment;