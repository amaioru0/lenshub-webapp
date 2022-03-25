import React, { useState, useEffect, useRef } from 'react';
import { useTransaction, useAccount, useContract, useProvider, useSigner } from 'wagmi'
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../../../store/actions';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';

import useLensHub from '../../../../lib/wagmi/hooks/useLensHub';
import useMockProfile from '../../../../lib/wagmi/hooks/useMockProfile';

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
  useColorModeValue,
  chakra,
  IconButton,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Stack
} from '@chakra-ui/react';
import ImageUploading from 'react-images-uploading';
import { FiImage, FiX } from 'react-icons/fi';

import Loader from '../../../Loader/Loader';

import Profile from '../Profile/Profile';
import { useIpfs } from '@onichandame/react-ipfs-hook'


const CreateProfile = () => {
    const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
        fetchEns: true,
      })
      const dispatch = useDispatch()
      const state = useSelector(state => state)
      const [done, setDone] = useState(false)
      const provider = useProvider()
      const signer = useSigner()
      const { createProfile } = useMockProfile();

      useEffect(() => {
        console.log(signer[0].data)
      }, [signer])

      const { ipfs, error } = useIpfs()
      
      useEffect(() => {
        // if (ipfs && ipfs.id) ipfs.id().then(val => setId(val.id))
        console.log(ipfs)
      }, [ipfs])

      const [ followNFTURICID, setFollowNFTURICID ] = useState("")
      const [formData, setFormData] = useState({})


      const [images, setImages] = React.useState([]);
      const maxNumber = 1;
      const [clicked, setClicked] = useState(false);

      const onChange = (imageList:any, addUpdateIndex:any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
      };

      const createFollowNFTURI = async () => {
        const media:any[] = []
        const paths:any[] = []
        if(ipfs) {

          await Promise.all(images.map(async (img:any, index:any) => {
            const image = await ipfs.add(img.file)
            media.push({ item: `ipfs://${image.path}`, type: img.file.type })
            paths.push(image.path)
            setFormData({...formData, image: `ipfs://${image.path}`})
            return true;
        }));


        let mainImage = paths[0] ? `ipfs://${paths[0]}` : ""
      // create the metadata object we'll be storing
        const uriData = {
          "description": formData.description,
          "external_url": formData.external_url,
          "image": mainImage, 
          "name": formData.name,
          "attributes": [], 
        }

        const jsonObj = JSON.stringify(uriData);
        console.log(jsonObj)
         const res = await ipfs.add(jsonObj)
         setFollowNFTURICID(res.path)
        return res.path;
        }
      }

      useEffect(() => {
        console.log(followNFTURICID)
        if(clicked) {
          // console.log(formData)
          createProfile({ to: accountData?.address, handle: formData.handle, imageURI: formData.image, followModule: "0x0000000000000000000000000000000000000000", followModuleData: "0x0000000000000000000000000000000000000000", followNFTURI: `ipfs://${followNFTURICID}` })
          setDone(true)
        }
      }, [followNFTURICID])

    return(
      <Container 
      shadow="lg"
      rounded="lg"
      bg={useColorModeValue("white", "gray.800")}
      maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box
            bg="#8BD84E"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}>
            {!done && <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>

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
      {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
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


                        <FormControl id="name">
                          <FormLabel>Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <Input 
                            onChange={(e) => { setFormData({...formData, name: e.target.value})}}
                            type="text" size="md" />
                          </InputGroup>
                        </FormControl>

                        <FormControl id="handle">
                          <FormLabel>Handle</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <Input 
                            onChange={(e) => { 
                              setFormData({...formData, handle: e.target.value})
                              console.log(formData)
                            }}
                            type="text" size="md" />
                          </InputGroup>
                        </FormControl>


                        <FormControl id="external_url">
                          <FormLabel>external_url</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <Input 
                            onChange={(e) => { setFormData({...formData, external_url: e.target.value})}}
                            type="text" size="md" />
                          </InputGroup>
                        </FormControl>

 

                        <FormControl id="description">
                          <FormLabel>description</FormLabel>
                          <Textarea
                            onChange={(e) => { 
                                setFormData({...formData, description: e.target.value})
                                // console.log(formData)
                            }}
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: 'gray.300',
                            }}
                          />
                        </FormControl>
                        <FormControl id="submit" float="right">
                          <Button
                            variant="solid"
                            bg="#8BD84E"
                            color="white"
                            onClick={() => {
                                setClicked(true)
                                createFollowNFTURI()
                            }}
                            _hover={{}}>
                            Create profile
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>}

            {done && 
            <Text>Profile created 🚀</Text>
            }
          </Box>
        </Flex>

      </Container>
    )
}

// address to;
// string handle;
// string imageURI;
// address followModule;
// bytes followModuleData;
// string followNFTURI;


export default CreateProfile;

