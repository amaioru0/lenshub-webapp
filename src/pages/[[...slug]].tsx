import React, { useEffect, useState } from 'react';
import { Button, Link, Container } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { useTransaction, useAccount } from 'wagmi'
import { BigNumber } from '@ethersproject/bignumber'

// import Post from '../components/lens/publications/Post/Post';
// import ExplorePublications from '../components/lens/publications/ExplorePublications/ExplorePublications';
// import UserTimeline from '../components/lens/timeline/UserTimeline';

// import Profile from '../components/lens/profile/Profile/Profile';

// import SelectProfile from '../components/lens/profile/SelectProfile/SelectProfile';
// import CreateProfile from '../components/lens/profile/CreateProfile/CreateProfile';

import { Grid, GridItem } from '@chakra-ui/react'
import {useSelector, useDispatch} from 'react-redux'

import LensHub from '../container/LensHub/LensHub';

const Index: NextPage = () => {
  
  const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
    fetchEns: true,
  })
  
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  // const reduxLocation = useSelector(state => state.router.location)


  useEffect(() => {
    console.log("here comes the state")
    console.log(state)
  }, [])
  // const handleClick = () => {
  //   sendTransaction({ to: "0x0FfCfcC9EB64597c1522b5e4507020Ccc29054e5", value: utils.parseEther("0.01") })
  // }
  return (
    <Container>
      <Head>
        <title>Trove Web</title>
        <meta name="description" content="Trove Web home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <LensHub />
  </Container> 
  )
}

export default Index;
