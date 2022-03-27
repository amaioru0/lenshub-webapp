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
  flexbox,
  Center
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
import geohash from 'ngeohash';
import DisplayGeolocation from "./DisplayGeolocation/DisplayGeolocation";
//@ts-ignore
import { Media, Player, controls } from 'react-media-player'
import { json } from "stream/consumers";
const {
  PlayPause,
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  MuteUnmute,
  Volume,
  Fullscreen,
} = controls

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
    //@ts-ignore
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
        bg={"white"}
        maxW="2xl"
        style={{minWidth: "40vw"}}
        _hover={{ shadow: "xl"  }}
        _focus={{ boxShadow: "outline" }}
      >

        <Flex justifyContent="space-between" alignItems="center">

        <Link href={`/user/${post.profile.handle}`}>
          <a style={{textDecoration: "none"}}>
          <div style={{flexDirection: "row", display: "flex"}}>
            <Davatar size={28} address={post.profile.ownedBy} />
           <chakra.h1 style={{fontSize: "18px", fontWeight: "700",marginLeft: "10px", color: "#171923"}}>@{post.profile.handle}</chakra.h1>
           </div>
           </a>
          </Link>
          <chakra.span
            fontSize="sm"
            color={"white"}
          >
            {post.createdAt && <Moment fromNow>{post.createdAt}</Moment>}
          </chakra.span>
        </Flex>

        <Box mt={2}>

        {post.metadata.name && <chakra.h1
        color={"white"}
        fontWeight="300"
        fontSize="1xl"
        >{post.metadata.name}</chakra.h1>}

          <div style={{marginTop: "10px", marginBottom: "10px"}}>
          {post.metadata.content && <div>{ ReactHtmlParser(post.metadata.content) }</div>}
          {/* {post.metadata.content && <p>{post.metadata.content}</p>} */}
          </div>


          <div>
            {post.metadata.attributes.map((attribute:any, index:any) => {
              if(attribute.traitType === "geolocation") {
                const latlon = geohash.decode(attribute.value);
                return(
                  <DisplayGeolocation latitude={latlon.latitude} longitude={latlon.longitude} />
                )
              } else if(attribute.traitType === "feeling") {
                return(
                  <div style={{color: "#627901", fontWeight: 500, fontStyle: "oblique", background: "#DDE6B7", padding: 10, maxWidth: "100px", borderRadius: "full"}}>
                  <>{attribute.value === "happy" && <h2>Feeling happy 😄</h2>}</>
                  <>{attribute.value === "cool" && <h2>Feeling cool 😎</h2>}</>
                  <>{attribute.value === "party" && <h2>Partying 🥳</h2>}</>
                  <>{attribute.value === "love" && <h2>is in love 😍</h2>}</>
                  <>{attribute.value === "sad" && <h2>Feeling sad 🥲</h2>}</>
                  <>{attribute.value === "rich" && <h2>Feeling rich 🤑</h2>}</>
                  <>{attribute.value === "alien" && <h2>👽</h2>}</>
                  <>{attribute.value === "evil" && <h2>Feeling evil 😈</h2>}</>
                  <>{attribute.value === "crazy" && <h2>Feeling crazy 🤪</h2>}</>
                  </div>


                )
            }
            })}
          </div>

          {post.metadata.media.map((img:any, index:any) =>{
            if(post.metadata.media[index].original.mimeType.startsWith("video")) {
              return(
                <Media>
                <div className="media">
                  <div className="media-player">
                    <Player src={ipfsToImg(post.metadata.media[index].original.url)} />
                  </div>
                  <div className="media-controls">
                  <div className="media-controls">
              <PlayPause />
              <CurrentTime />
              <Progress />
              <SeekBar />
              <Duration />
              <MuteUnmute />
              <Volume />
              <Fullscreen />
            </div>
                  </div>
                </div>
              </Media>
              )
            }
            return(
              <Link key={index} target="_blank" href={post.metadata.media[index] ? post.metadata.media[index].original.url.startsWith("ipfs") ? ipfsToImg(post.metadata.media[0].original.url) : post.metadata.media[0].original.url : ""}>
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
    //@ts-ignore
            profileId: state.lens.selectedProfile,
            publicationIds: [post.id]
          }
          ]}}}>
          {({ data }: { data:any }) => {
            return(
                <>
                    <Box style={{}}>
                    <Button 
    //@ts-ignore
                    disabled={data ? data.hasMirrored[0].results[0].mirrored && !state.lens.isSignedIn : !state.lens.isSignedIn}
                    style={{marginTop: "5px", height: "24px", fontSize: "12px"}}
                    variant='outline'
                    colorScheme='teal'
                    onClick={() => {
                      setClickedMirror(true);
                      createMirrorTypedData();
                    }}
                    >
                      {data ?
                      <>({post.stats.totalAmountOfMirrors}) {data.hasMirrored[0].results[0].mirrored ? <>Mirrored</>:<>Mirror</> }</>
                        :
                        <>({post.stats.totalAmountOfMirrors}) Mirrors</>
                      }
                    </Button>
                  </Box>
                </>
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
            // if(!data) return null;
            return(
                <>
              <Box style={{marginLeft: "15px"}}>

                <Button
    //@ts-ignore
                  disabled={data ? data.hasCollected[0].results[0].collected && !state.lens.isSignedIn : !state.lens.isSignedIn}
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
                  >
                    {data ?
                    <>({post.stats.totalAmountOfCollects}) {data.hasCollected[0].results[0].collected ? <>Collected</> : <>Collect</>}</>
                    :
                    <>({post.stats.totalAmountOfCollects}) Collect</>
                    }
                    </Button>
  
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