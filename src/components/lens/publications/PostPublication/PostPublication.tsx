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
  Textarea,
  Link,
  useDisclosure
} from '@chakra-ui/react';
import {
  IconButton,
  Avatar,
  CloseButton,
  HStack,
  VStack,
  Icon,
  Drawer,
  DrawerContent,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
  import React, { useState, useEffect, useRef } from 'react';

  import { useTransaction, useAccount } from 'wagmi'
  import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
  import { ChangeEvent, useReducer } from 'react';
  import useLensHub from '../../../../lib/wagmi/hooks/useLensHub';
  import {useSelector, useDispatch} from 'react-redux'
  import allActions from '../../../../store/actions';
  import { useIpfs } from '@onichandame/react-ipfs-hook'

  import CREATE_POST_TYPED_DATA from '../../../../lib/graphql/publications/post';
  import { Metadata, MetadataMedia, MetadataVersions, MetadataDisplayType, MetadataAttribute } from './MetadataStandard';
  import { v4 as uuidv4 } from 'uuid';
  import { CID } from 'cids';
// import { NFTStorage, File, Blob } from 'nft.storage'
  import mime from 'mime'
  import fs from 'fs'
  import path from 'path'
  import axios from 'axios';
  import dynamic from "next/dynamic";
  import { FileUpload } from 'react-ipfs-uploader'
  // import Picker from 'emoji-picker-react';
  import TxStatus from './TxStatus';

  const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
  );

  const NFT_STORAGE_KEY = ''

  const PostPublication = () => {

    const [postContent, setPostContent] = useState("");
    const { post } = useLensHub();
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const handleInputChange = (e:any) => {
        setPostContent(e.target.value);
    }
    const { ipfs } = useIpfs()
    const [ contentURICID, setContentURICID ] = useState("")
    const [typedData, setTypedData] = useState();
    const [clicked, setClicked] = useState(false);
    // const [chosenEmoji, setChosenEmoji] = useState(null);

    // const onEmojiClick = (event:any, emojiObject) => {
    //   setChosenEmoji(emojiObject);
    // };

    const [txHash, setTxHash] = useState("");
    const [pollInterval, setPollInterval] = useState(500)


    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     console.log(txData)
    // }, [txData])


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
        createPostDataType();
    }, [contentURICID])

    const [createPostDataType, { loading, error, data }] = useMutation(CREATE_POST_TYPED_DATA, {
        variables: {
            request: {
                profileId: state.lens.id ? state.lens.id : "0x23",
                contentURI: `ipfs://${contentURICID}`,
                collectModule: {
                // feeCollectModule: {
                //   amount: {
                //     currency: currencies.enabledModuleCurrencies.map(
                //       (c: any) => c.address
                //     )[0],
                //     value: '0.000001',
                //   },
                //   recipient: address,
                //   referralFee: 10.5,
                // },
                revertCollectModule: true,
                },
                referenceModule: {
                followerOnlyReferenceModule: false,
                },
              }
            }
        })

        useEffect(() => {
            if(!loading && clicked) {
                setTypedData(data.createPostTypedData.typedData)
            }
        }, [data])

        useEffect(() => {
            console.log(typedData)
            const goClick = async () => {
                const tx = await post({
                    //@ts-ignore
                  // profileId: 23,
                  // contentURI: `ipfs://bafkreia3rtwd6rsddu5igu7no3oaxdz5i3rknvnmiz5zr5j7dt5atv5sry`,
                  // collectModule: "0xb96e42b5579e76197B4d2EA710fF50e037881253",
                  // collectModuleData: "0x0000000000000000000000000000000000000000",
                  // referenceModule: "0x8cc1F4C7D3aFf9053eA2d840EAd31f5B68541A38",
                  // referenceModuleData: "0x0000000000000000000000000000000000000000"
                  profileId: typedData.value.profileId,
                  contentURI: typedData?.value?.contentURI,
                  collectModule: typedData?.value?.collectModule,
                  collectModuleData: typedData?.value?.collectModuleData,
                  referenceModule: typedData?.value?.referenceModule,
                  referenceModuleData: typedData?.value.referenceModuleData,
                 })
                 console.log(tx)
                 if(tx?.hash) {
                 setTxHash(tx.hash)
                 setPollInterval(500)
                 }
                setIsLoading(false)
                setPostContent("")
            }
            if(clicked) {
                goClick()
            }
        }, [typedData])


        const [fileUrl, setFileUrl] = useState('')
        const [chosenEmoji, setChosenEmoji] = useState(null);
        const onEmojiClick = (event:any, emojiObject:any) => {
          setChosenEmoji(emojiObject);
        };
    return (
      <Box
      rounded="lg"
      shadow="lg"
      bg={useColorModeValue("white", "gray.800")}
      maxW="2xl"
        transition="3s ease"
        style={{color: "black", maxHeight: "500px", border: "0px", outline: "none"}}
        >

        {txHash && <TxStatus txHash={txHash} pollInterval={pollInterval} setPollInterval={setPollInterval} />}

      <Flex
        direction='column'
        border={1}
        boxSizing='content-box'
      >

        <HStack margin={2} p={2}>
          {/* <Avatar src={} /> */}
          <Textarea
            placeholder="What's happening?"
            resize='none'
            onChange={handleInputChange}
            value={postContent}
          ></Textarea>
      {/* <MDEditor 
          style={{background: "white", color: "black"}}
      value={postContent} onChange={handleInputChange} /> */}

        </HStack>

        <Stack margin={2} >
        {/* <FileUpload setUrl={setFileUrl} /> */}

        </Stack>
        <Stack margin={2}>

          <Button
          rounded="full"
          style={{backgroundColor: "#70DB2C", color: "white"}}
            variant='solid'
            alignSelf='flex-end'
            isLoading={isLoading}
            onClick={async () => {
              setIsLoading(true)
                setClicked(true);
                createContentURI({
                    version: MetadataVersions.one,
                    metadata_id: uuidv4(),
                    description: postContent,
                    content: postContent,
                    external_url: null,
                    name: "Post from LensHub WebApp",
                    attributes: [],
                    media: [],
                    appId: "TROVE"
                    // imageMimeType: "",
                    // media: [],
                    // animation_url: "",
                    // appId: ""
                })
            }}
          >
            Post
          </Button>
        </Stack>
      </Flex>
      </Box>
    );
  }

  export default PostPublication;

