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
// import useLensHub from '../../lib/wagmi/hooks/useLensHub';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useConnect, useAccount, defaultChains, defaultL2Chains, useSignMessage } from 'wagmi'
import {useSelector, useDispatch} from 'react-redux'

const UserPage = ({handle}:{handle:any}) => {
    const [{ data: connectData, error: connectError, loading: connectLoading }, connect] = useConnect()
    const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
      fetchEns: true,
    })
    const state = useSelector(state => state)

    return(
        <Container>
                {handle}
        </Container>
    )
}

export default UserPage;