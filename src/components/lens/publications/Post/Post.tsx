import React, { useEffect, useState } from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  Button,
  Divider,
  flexbox
} from "@chakra-ui/react";
import { ipfsToImg } from '../../../../utils/ipfsImg';
import HAS_COLLECTED from '../../../../lib/graphql/publications/has-collected-publication'
import HAS_MIRRORED from '../../../../lib/graphql/publications/has-mirrored-publication'
import Moment from 'react-moment';
import CREATE_MIRROR_TYPED_DATA from '../../../../lib/graphql/publications/mirror';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../../../store/actions';
import { useAccount } from 'wagmi'

import useLensHub from "../../../../lib/wagmi/hooks/useLensHub";
import Davatar from '@davatar/react'

import GET_PUBLICATION from '../../../../lib/graphql/publications/get-publication';
import { Query } from '@apollo/react-components';

const Post = ({post}:{post:any}) => {
  const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
    fetchEns: true,
  })
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const { mirror, collect } = useLensHub()
  const [clickedMirror, setClickedMirror] = useState(false);

  const [createMirrorTypedData, { loading, error, data }] = useMutation(CREATE_MIRROR_TYPED_DATA, {
    variables: {
  request: {
    profileId: `${state.lens.selectedProfile}`,
    // remember it has to be indexed and follow metadata standards to be traceable!
    publicationId: post.id,
    referenceModule: {
      followerOnlyReferenceModule: true,
    }
   }
  }
  })

  // const {loading:publicationLoading, error:publicationError, data:publicationData} = useQuery(GET_PUBLICATION, {
  //   variables: {
  //       request: {
  //   publicationId: post.id,
  // },
  //   }
  // })

  // useEffect(() => {
  //   console.log(publicationData)
  // }, [publicationData])

  useEffect(() => {
    if(!loading && !error && clickedMirror) {
      mirror(data.createMirrorTypedData.typedData.value)
    } else if(error) {
      console.log(error)
    }
  }, [data])

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


          <div style={{flexDirection: "row", display: "flex"}}>
            <Davatar size={28} address={post.profile.ownedBy} />
            <chakra.h1 style={{fontSize: "18px", fontWeight: "700",marginLeft: "10px", color: "#171923"}}>@{post.profile.handle}</chakra.h1>
          </div>
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
        fontWeight="300"
        fontSize="1xl"
        >{post.metadata.name}</chakra.h1>}

          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {post.metadata.content && post.metadata.content}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>

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
  
            
            <div style={{display: "flex", minWidth: "400px", borderTop: "1px solid #DEEBE2"}}>
            <Box style={{marginLeft: "15px"}}>
              <Button 
              style={{marginTop: "5px", backgroundColor: "#DEEBE2", height: "24px"}}
              onClick={() => {
                setClickedMirror(true);
                createMirrorTypedData();
              }}
              colorScheme={"green"}>Mirror</Button>
            </Box>

  <Query query={HAS_COLLECTED} variables={{request : { collectRequests: [
    {
      walletAddress: accountData?.address ? accountData?.address : "",
      publicationIds: [post.id]
    }
    ]}}}>
    {({ data }: { data:any }) => {
      if(!data) return null;
      return(
        data && data.hasCollected && (
          <>
          {data.hasCollected[0] && 
            <Box style={{marginLeft: "15px"}}>
            <Button 
            style={{marginTop: "5px", backgroundColor: "#DEEBE2", height: "24px"}}
            onClick={() => {
              const [first, ...rest] = post.id.split('-');
              const profileId = first;
              const pubId = rest[0];
              console.log(pubId)
              collect({
                profileId,
                pubId,
                data: "0x0000000000000000000000000000000000000000",
                overrides: {}
              })
            }}
            colorScheme={"green"}>Collect</Button>
          </Box>
          }
          </>
        )
      )
    }
  
    }
  </Query>

            </div>

          </Flex>
        </Flex>
      </Box>
  );
};

export default Post;