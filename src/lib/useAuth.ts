// import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { getAccessToken, setAccessToken } from './accessToken';

import { useRouter } from 'next/router'

const useAuth = () => {
    const router = useRouter()
    const [signedIn, setSignedIn ] = useState(false);

    useEffect(() => {
      const setAccessToken = async () => {  
      const token = await getAccessToken();
      if(token !== "") {
        setSignedIn(true)
      } 
      }
      setAccessToken();
    }, [])

  async function isSignedIn() {
    try {

    } catch (error) {
      console.log(error);
    }

    return signedIn;
  }

  return { isSignedIn };
};

export default useAuth;