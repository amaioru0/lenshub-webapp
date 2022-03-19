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
  } from '@chakra-ui/react';
import Loader from '../../../Loader/Loader';

import Profile from '../Profile/Profile';
import { useIpfs } from '@onichandame/react-ipfs-hook'


const CreateProfile = () => {
    const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
        fetchEns: true,
      })
      const dispatch = useDispatch()
      const state = useSelector(state => state)

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


      const createFollowNFTURI = async () => {
      // create the metadata object we'll be storing
        const uriData = {
          "description": "Test Profile", 
          "external_url": "https://minthunt.io", 
          "image": "ipfs://bafkreia3rtwd6rsddu5igu7no3oaxdz5i3rknvnmiz5zr5j7dt5atv5sry", 
          "name": "TestProfile44",
          "attributes": [], 
        }
        const jsonObj = JSON.stringify(uriData);

        if(ipfs) {
         const res = await ipfs.add(jsonObj)
         setFollowNFTURICID(res.path)
        return res.path;
        }
      }

      useEffect(() => {
        console.log(followNFTURICID)
        createProfile({ to: "0x7084C8A2943df2115C4Ca9b70ce6b963A5993906", handle: "TestProfile44", imageURI: "ipfs://bafkreia3rtwd6rsddu5igu7no3oaxdz5i3rknvnmiz5zr5j7dt5atv5sry", followModule: "", followModuleData: [], followNFTURI: `ipfs://${followNFTURICID}` })
      }, [followNFTURICID])

    return(
     <>
      <Button onClick={async () => {
        await createFollowNFTURI();
      }}>Create Profile</Button>
     </>
    )
}

// address to;
// string handle;
// string imageURI;
// address followModule;
// bytes followModuleData;
// string followNFTURI;


export default CreateProfile;

