import React, { useState, useEffect, useRef, ReactNode, ReactText } from 'react';
import {
    Button,
    ButtonGroup,
    Container,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    Heading,
    chakra,
    useColorModeValue,
    Stack,
    Link,
    useDisclosure,
    HStack,
    Textarea,
    Image,
    Icon
  } from '@chakra-ui/react';
import Post from '../../components/lens/publications/Post/Post';
import Loader from '../../components/Loader/Loader';
// import useLensHub from '../../lib/wagmi/hooks/useLensHub';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useConnect, useAccount, defaultChains, defaultL2Chains, useSignMessage } from 'wagmi'
import {useSelector, useDispatch} from 'react-redux'
import GlobalStats from '../../components/lens/GlobalStats/GlobalStats';

const HomePage = ({children} : {children: any}) => {
  // const bg = useColorModeValue("white", "gray.800");
    return(
        <>
        <Box
        mx="auto"
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}

        justifyContent="center"
          alignItems="center"
          transition="3s ease"
          borderRightColor={useColorModeValue('gray.200', 'gray.700')}
          style={{ padding: "100px"}}
          >

          <chakra.h1
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            letterSpacing="tight"
            lineHeight="short"
            fontWeight="extrabold"
            color={useColorModeValue("gray.900", "white")}
          >
              Welcome to  <chakra.h1 style={{color: "#8BD94E"}}>LensHub 🌱</chakra.h1> 

          </chakra.h1>

        {children}
        <chakra.p
          mt={{ base: 3, sm: 5, md: 5 }}
          fontSize={{ sm: "lg", md: "xl" }}
          maxW={{ sm: "xl" }}
          mx={{ sm: "auto", lg: 0 }}
          color="gray.500"
        >
          <GlobalStats />
        </chakra.p>

            </Box>


        </>
    )
}

export default HomePage;