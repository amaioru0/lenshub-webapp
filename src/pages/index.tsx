import React, { useEffect, useState } from 'react';
import { Button, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useTransaction, useAccount } from 'wagmi'
import { BigNumber } from '@ethersproject/bignumber'

import { useAuth } from '../lib/auth.js'

import { recommendedProfiles } from '../lib/lens/profile/recommended-profiles';
import { getProfiles } from '../lib/lens/profile/get-profiles';

import Post from '../components/lens/Post/Post';
import ExplorePosts from '../components/lens/ExplorePost/ExplorePost';

import Profile from '../components/lens/Profile/Profile';

import { Grid, GridItem } from '@chakra-ui/react'

const Home: NextPage = () => {
  
  const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
    fetchEns: true,
  })

  const [recomendedProfiles, setRecomendedProfiles] = useState({})
  
  useEffect(() => {
    const fetch = async () => {
      const recomendedProfilesRes = await recommendedProfiles(accountData ? accountData?.address : "");
      console.log(recomendedProfilesRes)
      setRecomendedProfiles(recomendedProfilesRes)

      const myProfiles = await getProfiles(accountData ? accountData?.address : "")
      console.log(myProfiles)
    }
    fetch();
  },[])

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
      <ExplorePosts />
      </div>

      </main>
    </div>
  )
}

export default Home
