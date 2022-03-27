import React, { useState, useEffect, useRef } from 'react';
import { useTransaction, useAccount, useContract, useProvider, useSigner } from 'wagmi'
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../../../store/actions';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';

import useLensHub from '../../../../lib/wagmi/hooks/useLensHub';

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
  } from '@chakra-ui/react';

  import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import Loader from '../../../Loader/Loader';

import Profile from '../Profile/Profile';
import { useIpfs } from '@onichandame/react-ipfs-hook'
import GET_PROFILES from '../../../../lib/graphql/profile/get-profiles';
import UPDATE_PROFILE from '../../../../lib/graphql/profile/update-profile';

const EditProfile = () => {
    const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
        fetchEns: true,
      })
      const dispatch = useDispatch()
      const state = useSelector(state => state)

      const provider = useProvider()
      const signer = useSigner()

      const {loading, error, data} = useQuery(GET_PROFILES, {
          variables: {
              request: {
          //@ts-ignore
                profileIds: [state.lens.selectedProfile],
                limit: 10
              }
          }
      })

      const [formData, setFormData] = useState({})

      const [updateProfile, { loading:loadingUpdate, error:errorUpdate, data:dataUpdate }] = useMutation(UPDATE_PROFILE, {
          variables: {
              request: {
          //@ts-ignore
                profileId: state.lens.selectedProfile,
          //@ts-ignore
                name: formData.name ? formData.name : "",
          //@ts-ignore
                bio: formData.bio ? formData.bio : "",
          //@ts-ignore
                location: formData.location ? formData.location : "",
          //@ts-ignore
                website: formData.website ? formData.website : "",
              }
          }
      })


    useEffect(() => {
        if(data) {
            if(data.profiles) {
                setFormData(data.profiles.items[0])
            }
        }
    }, [data])

    if(loading) return <Loader />

    if(error) return null;

    return(
      <Container 
      shadow="lg"
      rounded="lg"
      bg={"white"}
      maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box
            bg="#8BD84E"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}>
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>

                      <FormControl id="handle">
                          <FormLabel>Handle</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <Input 
                            disabled={true}
                            value={data.profiles.items[0].handle}
                            type="text" size="md" />
                          </InputGroup>
                        </FormControl>

                        <FormControl id="id">
                          <FormLabel>id</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <Input 
                            disabled={true}
                            value={data.profiles.items[0].id}
                            type="text" size="md" />
                          </InputGroup>
                        </FormControl>


                        <FormControl id="name">
                          <FormLabel>Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <Input 
                            onChange={(e) => { setFormData({...formData, name: e.target.value})}}
                            placeholder={data.profiles.items[0].name}
                            type="text" size="md" />
                          </InputGroup>
                        </FormControl>


                        <FormControl id="location">
                          <FormLabel>Location</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <Input 
                            onChange={(e) => { setFormData({...formData, location: e.target.value})}}
                            placeholder={data.profiles.items[0].location}
                            type="text" size="md" />
                          </InputGroup>
                        </FormControl>

                        <FormControl id="website">
                          <FormLabel>Website</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <Input 
                            onChange={(e) => { setFormData({...formData, website: e.target.value})
                        }}
                            placeholder={data.profiles.items[0].website}
                            type="text" size="md" />
                          </InputGroup>
                        </FormControl>

                        <FormControl id="bio">
                          <FormLabel>Bio</FormLabel>
                          <Textarea
                            onChange={(e) => { 
                                setFormData({...formData, bio: e.target.value})
                                console.log(formData)
                            }}
                            placeholder={data.profiles.items[0].bio}
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
                                updateProfile()
                            }}
                            _hover={{}}>
                            Update Profile
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>

      </Container>
    )
}


export default EditProfile;

