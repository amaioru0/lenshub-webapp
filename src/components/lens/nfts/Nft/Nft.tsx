import React, { useEffect } from 'react';
import { useConnect, useAccount, defaultChains, defaultL2Chains } from 'wagmi'
import Loader from '../../..//Loader/Loader'
import { useNft } from "use-nft"
import {
    Container,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    Heading,
  } from '@chakra-ui/react';

const NFT = ({address, id, hit, hex, rgba}:{address:any, id:any, hit:any, hex:String, rgba:any}) => {
    const { loading, error, nft } = useNft(
        address,
        id
      )

      useEffect(() => {
        console.log(nft)
      }, [nft])
      

      useEffect(() => {
        console.log(error)
      }, [error])

      if (loading) return <Loader />

      if (error) return <div></div>


    return(
    <>
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={`${hex}`}
        maxW="2xl"
        style={{minWidth: 200, minHeight: 200}}
      >
       <Text>{nft.name}</Text> 
        <img src={nft.image} alt="" />
        {/* <p>{JSON.stringify(nft)}</p> */}
        </Box>
    </>
    )
}

export default NFT;
