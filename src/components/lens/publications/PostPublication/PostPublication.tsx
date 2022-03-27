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
  Select
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
  //@ts-ignore
  import { CID } from 'cids';
// import { NFTStorage, File, Blob } from 'nft.storage'
  import mime from 'mime'
  import fs from 'fs'
  import path from 'path'
  import axios from 'axios';
  import dynamic from "next/dynamic";
  // import Picker from 'emoji-picker-react';
  import TxStatus from './TxStatus';
  import SelectModule , { getCollectModule } from './SelectModule';
  import ImageUploading from 'react-images-uploading';
  import { FiImage, FiX, FiNavigation, FiSmile } from 'react-icons/fi';
  //@ts-ignore
  import ShareLocation from './ShareLocation';
  import geohash from 'ngeohash';
  import { ReactionBarSelector } from '@charkour/react-reactions';

  import { shorten } from '../../../../utils/shorten';
  const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
  );
  import  { commands, ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';

  const NFT_STORAGE_KEY = ''


  const PostPublication = () => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 6;

    const onChange = (imageList:any, addUpdateIndex:any) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

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

    const [multipleFilesUrl, setMultipleFilesUrl] = useState('')

    const [isLoading, setIsLoading] = useState(false);

    const [geoLocationX, setGeoLocationX] = useState();

    // useEffect(() => {
    //     console.log(txData)
    // }, [txData])

    const [collectModule, setCollectModule] = useState("emptyCollectModule")
    const [referenceModule, setReferenceModule] = useState("emptyCollectModule")

    const [settings, setSettings] = useState({
      collectLimit: "100000",
      amount: {
          currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
          value: "0.1"
      },
      recipient: "",
      referralFee: 10.5
  })

    const createContentURI = async (metadata: Metadata) => {
        // create the metadata object we'll be storing
        //   const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

        const response = await axios.get("https://picsum.photos/seed/picsum/200/300",  { responseType: 'arraybuffer' })
        const buffer = Buffer.from(response.data, "utf-8")

        const imageFile = new File([ buffer ], 'nft.png', { type: 'image/png' })
        const media: { item: string; type: any; }[] = []
        const paths: any[] = []
          if(ipfs) {
            console.log("images")
            console.log(images)


            await Promise.all(images.map(async (img:any, index:any) => {
              const image = await ipfs.add(img.file)
              media.push({ item: `ipfs://${image.path}`, type: img.file.type })
              paths.push(image.path)
              return true;
          }));


            let mainImage = paths[0] ? `ipfs://${paths[0]}` : ""
    
           const jsonObj = JSON.stringify({...metadata, image: mainImage, media: media});
            // console.log(jsonObj)
           const res = await ipfs.add(jsonObj)
          //  console.log(res)
           setContentURICID(res.path)
           const pinset = await ipfs.pin.add(res.path)

           paths.map((path) => {
             ipfs.pin.add(path)
           })
           setImages([])
           console.log(pinset)
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
              //@ts-ignore
                profileId: state.lens.id ? state.lens.id : "0x23",
                contentURI: `ipfs://${contentURICID}`,
                collectModule: getCollectModule(collectModule, settings),
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
                  //@ts-ignore
                  contentURI: typedData?.value?.contentURI,
                  //@ts-ignore
                  collectModule: typedData?.value?.collectModule,
                  //@ts-ignore
                  collectModuleData: typedData?.value?.collectModuleData,
                  //@ts-ignore
                  referenceModule: typedData?.value?.referenceModule,
                  //@ts-ignore
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


        // const [fileUrl, setFileUrl] = useState('')
        // const [chosenEmoji, setChosenEmoji] = useState(null);
        // const onEmojiClick = (event:any, emojiObject:any) => {
        //   setChosenEmoji(emojiObject);
        // };

        const [feeling, setFeeling] = useState()
        const [showReactionbar, setShowreactionbar] = useState(false)

    const handleLocation = () => {
      navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state == 'granted') {
          navigator.geolocation.getCurrentPosition(function(position) {
            const hash = geohash.encode(position.coords.latitude, position.coords.longitude)
            //@ts-ignore
              setGeoLocationX(hash)
              console.log(hash)
          });
        } else if (result.state == 'prompt') {
        } else if (result.state == 'denied') {
        }
      });
    }
    return (

      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
        style={{minWidth: "40vw"}}
        _hover={{ shadow: "xl"  }}
        _focus={{ boxShadow: "outline" }}
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
     

        </HStack>

        <Stack margin={2} >
          <SelectModule collectModule={collectModule} setCollectModule={setCollectModule} referenceModule={referenceModule} setReferenceModule={setReferenceModule} settings={settings} setSettings={setSettings}/>
        </Stack>

      <div style={{display: "flex", flexDirection: "row"}}>
        <Stack margin={2}>

        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div>
              <Button
                style={{backgroundColor: "#70DB2C", color: "white", height: "24px", width: "16px"}}
                onClick={onImageUpload}
                {...dragProps}
                leftIcon={<FiImage />}
              />
              &nbsp;
              <div style={{display: "flex"}}>
              {imageList.map((image, index) => (
                <div style={{marginTop: "10px", marginLeft: "10px"}} key={index}>
   
                  <img src={image['data_url']} alt="" width="100" />
                  <Button
                    style={{backgroundColor: "white", color: "#8BD94E", height: "24px", width: "16px", fontWeight: 1000, fontSize: "24px"}}
                    leftIcon={<FiX />} onClick={() => onImageRemove(index)}></Button>
                </div>
              ))}
              </div>
            </div>
          )}
          </ImageUploading>
        </Stack>


        <Stack margin={4}>
        <Button
          onClick={async () => {
            // setAllowlocation(true);
            setShowreactionbar(!showReactionbar);
          }}
          style={{backgroundColor: "#70DB2C", color: "white", height: "24px", width: "16px"}}
          leftIcon={<FiSmile />}
              ></Button>
        </Stack>

          {showReactionbar && 
          <div style={{display: 'flex', flexDirection: 'column'}}>
          <ReactionBarSelector 
          onSelect={(label) => {
            setShowreactionbar(false)
            //@ts-ignore
            setFeeling(label)
          }}
        reactions={[
          {label: "happy", node: <div>😄</div>},
          {label: "cool", node: <div>😎</div>},
          {label: "party", node: <div>🥳</div>},
          {label: "love", node: <div>😍</div>},
        ]}
        /> 

          <ReactionBarSelector 
          onSelect={(label) => {
            setShowreactionbar(false)
            //@ts-ignore
            setFeeling(label)
          }}
        reactions={[
          {label: "sad", node: <div>🥲</div>},
          {label: "crazy", node: <div>🤪</div>},
          {label: "rich", node: <div>🤑</div>},
          {label: "alien", node: <div>👽</div>},
        ]}
        /> 

          <ReactionBarSelector 
          onSelect={(label) => {
            setShowreactionbar(false)
            //@ts-ignore
            setFeeling(label)
          }}
        reactions={[
          {label: "evil", node: <div>😈</div>},
          {label: "bored", node: <div>🥱</div>},
          {label: "disappointed", node: <div>😓</div>},
          {label: "sh*t", node: <div>💩</div>},
        ]}
        /> 

          <ReactionBarSelector 
          onSelect={(label) => {
            setShowreactionbar(false)
            //@ts-ignore
            setFeeling(label)
          }}
        reactions={[
          {label: "happy", node: <div>🤡</div>},
          {label: "happy", node: <div>🐓</div>},
          {label: "happy", node: <div>😡</div>},
          {label: "happy", node: <div>👋</div>}
        ]}
        /> 
          </div>}

        {feeling && <Text>{feeling}</Text>}
        {feeling && <Text onClick={() => {
          //@ts-ignore
          setFeeling()}}style={{color: "red", fontWeight: 1000, cursor: "pointer"}}>&nbsp;X </Text>}

        <Stack margin={4}>
        <Button
          onClick={async () => {
            // setAllowlocation(true);
            handleLocation();
          }}
          style={{backgroundColor: "#70DB2C", color: "white", height: "24px", width: "16px"}}
          leftIcon={<FiNavigation />}
              >
           
         </Button>     
        </Stack>


        {geoLocationX && <Text style={{color: "green", fontWeight: 700}}>Location </Text>}
        {geoLocationX && <Text onClick={() => {
          //@ts-ignore
          setGeoLocationX()}}style={{color: "red", fontWeight: 1000, cursor: "pointer"}}>&nbsp;X </Text>}

        


        </div>
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
                    name: "Post from Lenstify",
                    attributes: [
                      ...(geoLocationX ? [{traitType: "geolocation", value: geoLocationX } ] : []),
                      ...(feeling ? [{traitType: "feeling", value: feeling } ] : []),
                     ],
                    appId: "LENSTIFY"
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

