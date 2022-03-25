import React, { useEffect, useState } from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  Button
} from "@chakra-ui/react";
import { ipfsToImg } from '../../../../utils/ipfsImg';

import Moment from 'react-moment';
import CREATE_MIRROR_TYPED_DATA from '../../../../lib/graphql/publications/mirror';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../../../store/actions';
import { useAccount } from 'wagmi'

import useLensHub from "../../../../lib/wagmi/hooks/useLensHub";
import ReactHtmlParser from 'react-html-parser';

const Mirror = ({post}:{post:any}) => {
  const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
    fetchEns: true,
  })
  const dispatch = useDispatch()
  const state = useSelector(state => state)

//   const { mirror } = useLensHub()
//   const [clickedMirror, setClickedMirror] = useState(false);

//   const [createMirrorTypedData, { loading, error, data }] = useMutation(CREATE_MIRROR_TYPED_DATA, {
//     variables: {
//   request: {
//     profileId: `${state.lens.selectedProfile}`,
//     // remember it has to be indexed and follow metadata standards to be traceable!
//     publicationId: post.id,
//     referenceModule: {
//       followerOnlyReferenceModule: true,
//     }
//    }
//   }
//   })

//   useEffect(() => {
//     if(!loading && !error && clickedMirror) {
//       mirror(data.createMirrorTypedData.typedData.value)
//     } else if(error) {
//       console.log(error)
//     }
//   }, [data])

  useEffect(() => {
    if(post.__typename === "Mirror"){ 
      console.log(post)
    }
  }, [])

  if(post.__typename !== "Mirror") return <></>

  return (
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        style={{color: "black"}}
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


          <div>
          {post.metadata.content && <div>{ ReactHtmlParser(post.metadata.content) }</div>}
          </div>

          {post.metadata.media.map((img:any, index:any) =>{
            return(
              <Link target="_blank" href={post.metadata.media[index] ? post.metadata.media[index].original.url.startsWith("ipfs") ? ipfsToImg(post.metadata.media[0].original.url) : post.metadata.media[0].original.url : ""}>
              <Image
                maxWidth={"200px"}
                fit="cover"
                display={{ base: "none", sm: "block" }}
                src={post.metadata.media[index] ? post.metadata.media[index].original.url.startsWith("ipfs") ? ipfsToImg(post.metadata.media[0].original.url) : post.metadata.media[0].original.url : ""}
                alt="media"
              />
              </Link>
            )
          })}

        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>


          <Flex alignItems="center">
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              {post.profile.handle}
            </Link>

            {/* <Box style={{marginLeft: "15px"}}>
              <Button 
              onClick={() => {
                setClickedMirror(true);
                createMirrorTypedData();
              }}
              colorScheme={"green"}>Mirror</Button>
            </Box> */}

          </Flex>
          <span style={{color: "black", fontWeight: "800", fontStyle: "italic"}}>Mirror</span>

        </Flex>
      </Box>
  );
};

export default Mirror;