import React, { useEffect, useState } from 'react';
import { useConnect, useAccount, defaultChains, defaultL2Chains } from 'wagmi'
import Loader from '../../../Loader/Loader';
import provider from '../../../../lib/provider';
import {
    Container,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    Heading,
  } from '@chakra-ui/react';

import { stringToColor, hexToRgb } from '../../../../utils/stringToColor';
import { useQuery, useLazyQuery} from '@apollo/react-hooks';
import { Button, ButtonGroup } from '@chakra-ui/react'
import NFT from '../Nft/Nft';
import { NftProvider, useNft } from "use-nft"
import ethers from "ethers"
import { Provider } from 'wagmi'
import GET_USERS_NFTS from '../../../../lib/graphql/nfts/get-users-nfts';


const Wallet = () => {

  const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
    fetchEns: true,
  })

    const { loading:myNFTsLoading, error:myNFTsError, data:myNFTs } = useQuery(GET_USERS_NFTS, {
    variables: { 
        request: {
            ownerAddress: accountData?.address,
            // contractAddress,
            chainIds: 80001,
            limit: 50,
            }
        }
    });

    const fetcher = ["ethers", { ethers, provider:  provider }]


    useEffect(() => {
        console.log("nfts")
        console.log(myNFTs)
    }, [myNFTs])

    if(myNFTsLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
        <NftProvider 
        //@ts-ignore
        fetcher={fetcher}>
       <Box marginBottom={"30px"} >
        <Heading as={'h2'}>Wallet </Heading>
        </Box>

    <Grid templateColumns='repeat(2, 1fr)' gap={16}>

         {!myNFTsLoading && myNFTs?.nfts?.items?.map((nft:any, index:any) => {
                const hex = stringToColor(`${nft.name}pl`);
                const rgba = hexToRgb(hex);
            return (
                <GridItem key={index} w='200px' h='200px' style={{borderRadius: "16px"}}>
                <NFT hex={hex} rgba={rgba} address={nft.contractAddress} id={nft.tokenId} hit={nft} />
                </GridItem>
            )
        })} 
    </Grid>
        </NftProvider>
        </>
    )
}

export default Wallet;
