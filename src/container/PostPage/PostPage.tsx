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
    Textarea
  } from '@chakra-ui/react';
import Post from '../../components/lens/publications/Post/Post';
import Loader from '../../components/Loader/Loader';
import useLensHub from '../../lib/wagmi/hooks/useLensHub';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useConnect, useAccount, defaultChains, defaultL2Chains, useSignMessage } from 'wagmi'
import GET_PUBLICATION from '../../lib/graphql/publications/get-publication';
import GET_PUBLICATIONS from '../../lib/graphql/publications/get-publications';
import Comment from '../../components/lens/publications/Comment/Comment';
import CREATE_COMMENT_TYPED_DATA from '../../lib/graphql/publications/comment';
import {useSelector, useDispatch} from 'react-redux'
import { useIpfs } from '@onichandame/react-ipfs-hook'
import { CID } from 'cids';
import { Metadata, MetadataMedia, MetadataVersions, MetadataDisplayType, MetadataAttribute } from '../../components/lens/publications//PostPublication/MetadataStandard';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PostPage = (postId:any) => {
    const [{ data: connectData, error: connectError, loading: connectLoading }, connect] = useConnect()
    const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
      fetchEns: true,
    })
    const state = useSelector(state => state)

    const publicationId =  postId.post ?  postId.post : ""

    const {loading: commentsLoading, error: commentsError, data:commentsData } = useQuery(GET_PUBLICATIONS, {
        variables: {
            request: {
                commentsOf: publicationId
            }
        }
    })
    const { ipfs } = useIpfs()
    const [ contentURICID, setContentURICID ] = useState("")
    const [replyClicked, setReplyClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const createContentURI = async (metadata: Metadata) => {
        // create the metadata object we'll be storing
        //   const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

        const response = await axios.get("https://picsum.photos/seed/picsum/200/300",  { responseType: 'arraybuffer' })
        const buffer = Buffer.from(response.data, "utf-8")

        const imageFile = new File([ buffer ], 'nft.png', { type: 'image/png' })

          if(ipfs) {
           const image = await ipfs.add(imageFile)
           console.log(image)
    
           const jsonObj = JSON.stringify({...metadata, image: `ipfs://${image.path}`});

           const res = await ipfs.add(jsonObj)
           console.log(res)
           setContentURICID(res.path)
           const pinset = await ipfs.pin.add(res.path)
           const pinset2 = await ipfs.pin.add(image.path)

           console.log(pinset)
           console.log(pinset2)
            return res.path;
          }
        }

    useEffect(() => {
        console.log(contentURICID)
        createCommentTypedData();
    }, [contentURICID])

    const [createCommentTypedData, {loading: commentTypedDataLoading, error: commentTypedDataError, data:commentTypedData }] = useMutation(CREATE_COMMENT_TYPED_DATA, {
        variables: {
            request: {
                profileId: state.lens.selectedProfile,
                publicationId: publicationId,
                contentURI: contentURICID,
                collectModule: {
                    revertCollectModule: true
                  },
                  referenceModule: {
                    followerOnlyReferenceModule: false
                  }
            }   
        }
    })

    useEffect(() => {
        const finallyComment = async () => {
            if(commentTypedData?.createCommentTypedData) {
                if(replyClicked) {
                    await comment(commentTypedData.createCommentTypedData.typedData.value)
                    setIsLoading(false)
                    setPostContent("")
                }
            }
        }
        finallyComment();
    }, [commentTypedData])



    const [postContent, setPostContent] = useState("");

    const handleInputChange = (e:any) => {
        setPostContent(e.target.value);
    }


    const {loading, error, data } = useQuery(GET_PUBLICATION, { 
        variables: {
            request: {
                publicationId
            }
        }
     })

     const { comment } = useLensHub();

     if(loading) return <Loader />
     if(error) return <p>error</p>

    return(
        <>
        <Post post={data.publication} />

        {commentsData && commentsData.publications && commentsData.publications.items.map((comment:any, index:any) => {
            return(
                <Comment comment={comment}/>
            )
        })}

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
   <Flex
        direction='column'
        border={1}
        boxSizing='content-box'
      >

        <HStack margin={2} p={2}>
          {/* <Avatar src={} /> */}
          <Textarea
          style={{color: "Black"}}
            placeholder={`Reply to @${data.publication.profile.handle}`}
            resize='none'
            onChange={handleInputChange}
            value={postContent}
          ></Textarea>


        </HStack>

        <Stack margin={2} >
        {/* <FileUpload setUrl={setFileUrl} /> */}

        </Stack>
        <Stack margin={2}>

          <Button
          onClick={() => {
            setIsLoading(true)
            createContentURI({
                version: MetadataVersions.one,
                metadata_id: uuidv4(),
                description: "",
                content: postContent,
                external_url: "",
                name: "post",
                attributes: [],
                image: "",
                media: [],
                appId: "TROVE"
                // imageMimeType: "",
                // media: [],
                // animation_url: "",
                // appId: ""
            })
            setReplyClicked(true)
          }}
          rounded="full"
          style={{backgroundColor: "#70DB2C", color: "white"}}
            variant='solid'
            alignSelf='flex-end'
            isLoading={isLoading}
          >
            Reply
          </Button>
        </Stack>
      </Flex>
    </Box>
        </>
    )
}

export default PostPage;