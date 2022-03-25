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
import CREATE_COLLECT_TYPED_DATA from '../../../../lib/graphql/module/collect';

import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../../../store/actions';
import { useAccount } from 'wagmi'

import useLensHub from "../../../../lib/wagmi/hooks/useLensHub";
import Davatar from '@davatar/react'

import GET_PUBLICATION from '../../../../lib/graphql/publications/get-publication';
import { Query } from '@apollo/react-components';
import { useRouter } from 'next/router';
import { profile } from "console";
import ReactHtmlParser from 'react-html-parser';

const Post = ({post}:{post:any}) => {
  const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
    fetchEns: true,
  })
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const { mirror, collect } = useLensHub()
  const [clickedMirror, setClickedMirror] = useState(false);
  const [clickedCollect, setClickedCollect] = useState(false);

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

//   / collector: address,
// // profileId: typedData.value.profileId,
// // pubId: typedData.value.pubId,
// // data: typedData.value.data,
  const [createCollectTypedData, { loading:loadingCollect, error:errorCollect, data:dataCollect }] = useMutation(CREATE_COLLECT_TYPED_DATA, {
    variables: {
      request: {
        publicationId: post.id
      }
  }
  })

  useEffect(() => {
    if(!loadingCollect && !errorCollect && clickedCollect) {
      collect(dataCollect.createCollectTypedData.typedData.value)
    } else if(error) {
      console.log(error)
    }
  }, [dataCollect])
  
  const router = useRouter()

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
            {post.createdAt && <Moment fromNow>{post.createdAt}</Moment>}
          </chakra.span>
        </Flex>

        <Box mt={2}>

        {post.metadata.name && <chakra.h1
        color={useColorModeValue("gray.700", "white")}
        fontWeight="300"
        fontSize="1xl"
        >{post.metadata.name}</chakra.h1>}

          <div>
          {post.metadata.content && <div>{ ReactHtmlParser(post.metadata.content) }</div>}
          {/* {post.metadata.content && <p>{post.metadata.content}</p>} */}
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
  
            
    <div style={{display: "flex", minWidth: "100%", borderTop: "1px solid #DEEBE2", alignContent: "flex-end", alignItems: "flex-end"}}>


        <Query query={HAS_MIRRORED} variables={{request : { profilesRequest: [
          {
            profileId: state.lens.selectedProfile,
            publicationIds: [post.id]
          }
          ]}}}>
          {({ data }: { data:any }) => {
            if(!data) return null;
            return(
              data && data.hasMirrored && (
                <>
                    <Box style={{}}>
                    <Button 
                    disabled={data.hasMirrored[0].results[0].mirrored}
                    style={{marginTop: "5px", height: "24px", fontSize: "12px"}}
                    variant='outline'
                    colorScheme='teal'
                    onClick={() => {
                      setClickedMirror(true);
                      createMirrorTypedData();
                    }}
                    >({post.stats.totalAmountOfMirrors}) {data.hasMirrored[0].results[0].mirrored ? <>Mirrored</>:<>Mirror</> }</Button>
                  </Box>
                </>
              )
            )
          }
        
          }
        </Query>


        <Query query={HAS_COLLECTED} variables={{request : { collectRequests: [
          {
            walletAddress: accountData?.address ? `${accountData?.address}` : "",
            publicationIds: [post.id]
          }
          ]}}}>
          {({ data }: { data:any }) => {
            if(!data) return null;
            return(
                <>
                  <Box style={{marginLeft: "15px"}}>
                  <Button
                  disabled={data.hasCollected[0].results[0].collected}
                  style={{marginTop: "5px", height: "24px", fontSize: "12px"}}
                  variant='outline'
                  colorScheme='teal'
                  onClick={() => {
                    // const [first, ...rest] = post.id.split('-');
                    // const profileId = first;
                    // const pubId = rest[0];
                    // console.log(profileId)
                    // console.log(pubId)
                    // collect({
                    //   profileId: parseInt(profileId),
                    //   pubId: parseInt(pubId),
                    //   data: "0x0000000000000000000000000000000000000000"
                    // })
                    setClickedCollect(true);
                    createCollectTypedData()
                  }}
                  >({post.stats.totalAmountOfCollects}) {data.hasCollected[0].results[0].collecte ? <>Collected</> : <>Collect</>}</Button>
                </Box>
                </>
            )
          }
        
          }
        </Query>

    <Box>
    <Link href={`/post/${post.id}`}>
        <a>
          <Button
          variant='outline'
          colorScheme='teal'
          style={{marginLeft: "15px", height: "24px", marginTop: "5px", fontSize: "12px" }}
          >{post.stats.totalAmountOfComments} comments</Button>
        </a>
      </Link>
    </Box>

            </div>

          </Flex>
        </Flex>

      </Box>
  );
};

export default Post;