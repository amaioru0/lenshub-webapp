import React, {Component, useEffect} from 'react'
import { getAccessToken, setAccessToken } from './accessToken';
import { useRouter } from 'next/router'

const withAuth = ({children}:any) => {
    const router = useRouter()

    useEffect(() => {
        const token = getAccessToken();
        if(token !== "") {
        } else {
            router.push('/')
        }
    }, [])

    return(
        <>
        {children}
        </>
    )
}

export default withAuth;