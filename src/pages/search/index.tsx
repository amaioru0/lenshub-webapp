import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader'
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../../store/actions';
import SEARCH from '../../lib/graphql/search/search-profiles-or-publications';
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  Button,
  Stack,
  Icon,
} from "@chakra-ui/react";
const env = process.env.NODE_ENV;
import Profile from '../../components/lens/profile/Profile/Profile';

import Search from '../../components/lens/search/Search';

const SearchPage = () => {

  const [query, setQuery] = useState("josh");
  const [type, setType] = useState("PROFILE");

  const {loading, error, data, refetch} = useQuery(SEARCH, {
    variables: { request: {
      query: query,
      type: type,
      limit: 10
    }
  }
  })

  useEffect(() => {
    refetch();
  }, [query])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
    <Search query={query} setQuery={setQuery} type={type} setType={setType}/>

    {loading && <Loader />}

    {data?.search?.items?.map((profile:any, index:any) => {
      return(
        <Profile profile={profile} />
      )
    })}
    </>
  );
}

export default SearchPage;