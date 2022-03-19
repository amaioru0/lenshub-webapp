import React, { useState, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}


export const createApolloClient = () => {
  const link = new HttpLink({
    uri: 'https://api-mumbai.lens.dev',
    // headers: getAuthHeaders(),
  })

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })
}

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null)

  const isSignedIn = () => {
    
    if (authToken) {
      return true
    } else {
      return false
    }
  }

  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`,
    }
  }

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'https://api-mumbai.lens.dev',
      headers: getAuthHeaders(),
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
  }


  const generateChallenge = async (address) => {
    console.log("requesting challenge for")
    console.log(address)
    const client = createApolloClient()
    const GET_CHALLENGE = gql`
    query($request: ChallengeRequest!) {
      challenge(request: $request) { text }
    }
    `
    const result = await client.query({
      query: GET_CHALLENGE,
      variables: {
        request: {
           address: address,
        },
      },
    })
    console.log(result)
    return result;
  }

  const signIn = async (address, signature) => {
    console.log(address, signature)
    const client = createApolloClient()
    const AUTHENTICATION = gql`
    mutation($request: SignedAuthChallenge!) { 
      authenticate(request: $request) {
        accessToken
        refreshToken
      }
   }
    `
    const result = await client.mutate({
      mutation: AUTHENTICATION,
      variables: {
        request: {
          address,
          signature,
        },
      },
    })

    console.log(result)

    if (result?.data?.authenticate?.accessToken) {
      setAuthToken(result.data.authenticate.accessToken)
    }
  }

  const signOut = () => {
    setAuthToken(null)
  }

  return {
    generateChallenge,
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
  }
}
