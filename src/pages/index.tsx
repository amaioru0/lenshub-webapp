import React, { useEffect, useState } from 'react';
import { Button, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useTransaction, useAccount } from 'wagmi'
import { BigNumber } from '@ethersproject/bignumber'

import Post from '../components/lens/publications/Post/Post';
import ExplorePublications from '../components/lens/publications/ExplorePublications/ExplorePublications';

import Profile from '../components/lens/profile/Profile/Profile';

import { Grid, GridItem } from '@chakra-ui/react'
import {useSelector, useDispatch} from 'react-redux'

const Home: NextPage = () => {
  
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
    <div className={styles.container}>
      <Head>
        <title>Trove Web</title>
        <meta name="description" content="Trove Web home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div style={{marginBottom: "20px"}}>
      <h2 className={styles.title}>
          Welcome
        </h2>
      </div>



      <div style={{marginBottom: "20px", marginTop: "40px"}}>
      <ExplorePublications />
      </div>

      </main>
    </div>
  )
}

export default Home
