import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import Post from '../publications/Post/Post';
import {
    Container,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    Heading,
  } from '@chakra-ui/react';

import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import GET_TIMELINE from '../../../lib/graphql/timeline/user-timeline';;
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../../store/actions';
import { Query } from '@apollo/react-components';
import PostsList from './PostList'

const UserTimeline = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

  const { loading, error, data} = useQuery(GET_TIMELINE, {
    variables: {
      request: {
          //@ts-ignore
        profileId: `${state.lens.selectedProfile}`,
        limit: 10,
      },
    }
  });

    if(loading) return <Loader />

    if(error) return <h1>error</h1>
    
    return(
        <>

    <Query query={GET_TIMELINE} variables={{request: {
      //@ts-ignore
    profileId: `${state.lens.selectedProfile}`,
    limit: 10,
  }}}>
    {({ data, fetchMore }: { data:any, fetchMore:any }) => {
      if(!data) return null;
      console.log("explore data")
      console.log(data)
      return(
        data && (
          <PostsList
              next={data.timeline.pageInfo.next}
              posts={data.timeline.items || []}
              loading={loading}
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    request: {
                      cursor: data.timeline.pageInfo.next,
      //@ts-ignore
                      profileId: `${state.lens.selectedProfile}`,
                      limit: 10,
                    }
                  },
                  updateQuery: (prev:any, { fetchMoreResult }:{ fetchMoreResult:any }) => {
                    // console.log("update query")
                    // console.log(fetchMoreResult)
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      timeline: { pageInfo: fetchMoreResult.timeline.pageInfo, items: [...prev.timeline.items, ...fetchMoreResult.timeline.items], __typename: "PaginatedTimelineResult"}
                    });
                  }
                })
              }
            />
        )
      )
    }
  
    }
  </Query>
        </>
    )
}

export default UserTimeline;