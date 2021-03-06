import React from "react";
import Head from "next/head";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken } from "./accessToken";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import cookie from "cookie";
import { request, gql } from 'graphql-request'

import introspectionQueryResultData from './fragmentTypes.json';

const isServer = () => typeof window === "undefined";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
  });


  const REFRESH_AUTHENTICATION = gql`
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: any, { ssr = true } = {}) {
  const WithApollo = ({
    apolloClient,
    serverAccessToken,
    apolloState,
    ...pageProps
  }: any) => {
    if (!isServer() && !getAccessToken()) {
      setAccessToken(serverAccessToken);
    }
    const client = apolloClient || initApolloClient(apolloState);
    return(
      <PageComponent {...pageProps} apolloClient={client} />
    )
  };

  if (process.env.NODE_ENV !== "production") {
    // Find correct display name
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    // Warn if old way of installing apollo is used
    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const {
        AppTree,
        ctx: { req, res }
      } = ctx;

      let serverAccessToken = "";

      // if (isServer()) {
      //   console.log(req.headers)
      //   let headerCookie = req.headers.cookie;

      //   if (typeof headerCookie !== 'string') {
      //     headerCookie = '';
      //   }

      //   const cookies = cookie.parse(headerCookie);
      //   if (cookies.jid) {
      //     console.log("we have cookie jid on server")
      //     const response = await fetch("http://localhost:4000/refresh_token", {
      //       method: "POST",
      //       credentials: "include",
      //       headers: {
      //         cookie: "jid=" + cookies.jid
      //       }
      //     });
      //     const data = await response.json();
      //     serverAccessToken = data.accessToken;
      //   }
      // }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = (ctx.ctx.apolloClient = initApolloClient(
        {},
        serverAccessToken
      ));

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      // Only on the server
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && res.finished) {
          return {};
        }

        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
                apolloClient={apolloClient}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        // Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        serverAccessToken
      };
    };
  }

  return WithApollo;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(initState: any, serverAccessToken?: string) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return createApolloClient(initState, serverAccessToken);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    // setAccessToken(cookie.parse(document.cookie).test);
    apolloClient = createApolloClient(initState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
function createApolloClient(initialState = {}, serverAccessToken?: string) {
  const httpLink = new HttpLink({
    uri: "https://api-mumbai.lens.dev",
    // credentials: "include",
    fetch
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();
      const refresthToken = getRefreshToken();
      if (!token) {
        return true;
      }

      try {
        //@ts-ignore
        const { exp } = jwtDecode(token);
        console.log(exp)
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      const getTokenX = async () => {
        // console.log("fetch access token")
        const refreshToken = getRefreshToken()
        // console.log(refreshToken)
        const res = await request('https://api-mumbai.lens.dev/', REFRESH_AUTHENTICATION, { request: { refreshToken: refreshToken } })
        setAccessToken(res.refresh.accessToken)
        // setRefreshToken(res.refresh.refreshToken)
        console.log(res)
        return res;
      }
      return getTokenX()
    },
    handleFetch: accessToken => {
      console.log("handle fetch")
      // console.log(accessToken)
    },
    handleError: err => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    }
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    return {
      headers: {
        ...headers,
        'x-access-token': token ? `Bearer ${token}` : ""
      }
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors);
    console.log(networkError);
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      //@ts-ignore
      refreshLink, authLink, errorLink, httpLink]),
    // cache: new InMemoryCache().restore(initialState)
    cache: new InMemoryCache({fragmentMatcher})
  });
}