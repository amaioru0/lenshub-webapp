import React, { useEffect, useState } from 'react';
import { Button, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useTransaction, useAccount } from 'wagmi'
import { BigNumber } from '@ethersproject/bignumber'

import Post from '../components/lens/Post/Post';
import Profile from '../components/lens/Profile/Profile';

import { Grid, GridItem } from '@chakra-ui/react'

const Home: NextPage = () => {
  
  const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
    fetchEns: true,
  })



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
          You best call today
        </h2>
      </div>

      <div style={{marginBottom: "20px", marginTop: "40px"}}>
          
      </div>

      </main>
    </div>
  )
}

export default Home
