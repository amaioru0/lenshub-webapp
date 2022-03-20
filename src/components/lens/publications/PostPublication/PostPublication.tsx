import {
    Textarea,
    Flex,
    Stack,
    Avatar,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    HStack,
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

    const createContentURI = async () => {
        // create the metadata object we'll be storing
          const uriData = {
            "description": postContent, 
            "external_url": "https://minthunt.io", 
            "image": "ipfs://bafkreia3rtwd6rsddu5igu7no3oaxdz5i3rknvnmiz5zr5j7dt5atv5sry", 
            "name": "test",
            "attributes": [], 
          }
          const jsonObj = JSON.stringify(uriData);
  
          if(ipfs) {
           const res = await ipfs.add(jsonObj)
           setContentURICID(res.path)
          return res.path;
          }
        }

    useEffect(() => {
        createPostDataType();
    }, [contentURICID])

    const [createPostDataType, { loading, error, data }] = useMutation(CREATE_POST_TYPED_DATA, {
        variables: {
            request: {
                profileId: "0x23",
                contentURI: `ipfs://bafkreia3rtwd6rsddu5igu7no3oaxdz5i3rknvnmiz5zr5j7dt5atv5sry`,
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
            if(clicked) {
                post({
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
            }
        }, [typedData])

    return (
      <Flex
        direction='column'
        border={1}
        // borderColor={colors.border}
        borderStyle='solid'
        boxSizing='content-box'
      >
        <HStack margin={2} p={2}>
          {/* <Avatar src={} /> */}
          <Textarea
          style={{background: "white", color: "black"}}
            placeholder="What's happening?"
            resize='none'
            onChange={handleInputChange}
            value={postContent}
          ></Textarea>
        </HStack>

        <Stack margin={2}>

          <Button
            colorScheme='pink'
            variant='solid'
            alignSelf='flex-end'
            onClick={async () => {
                setClicked(true);
                 createContentURI()
            }}
          >
            Post
          </Button>
        </Stack>
      </Flex>
    );
  }

  export default PostPublication; 

