import React, { useState, useEffect, useRef } from 'react';

import { useTransaction, useAccount } from 'wagmi'
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../../../store/actions';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { BigNumber } from '@ethersproject/bignumber'

import {
    Button,
    ButtonGroup,
    Container,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    Heading,
    Stack
  } from '@chakra-ui/react';
import Loader from '../../../Loader/Loader';

import Profile from '../Profile/ProfileWidget';

import GET_PROFILES, { ProfilesRequest} from '../../../../lib/graphql/profile/get-profiles';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useRouter } from 'next/router';
import Link from 'next/link';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const SelectProfile =   () => {
    const [{ data: accountData, error: accountError, loading: accountLoading }] = useAccount({
        fetchEns: true,
      })
      const dispatch = useDispatch()
      const state = useSelector(state => state)

    const { loading:loadingProfiles, error:errorProfiles, data:dataProfiles} = useQuery(GET_PROFILES, {
    variables: {
        request: {
            ownedBy: accountData?.address
        },
    }
    });

    const router = useRouter();



    const [cardIndex, setCardIndex] = useState(0)

    if(loadingProfiles) return <Loader />

    if(errorProfiles) return <h1>error</h1>
      
    return(
     <Box>
    
    <SwipeableViews
    style={{maxWidth: "320px"}}
    index={cardIndex}
    onSwitching={(index:any, type:any) => {
        if(Number.isInteger(index)) {
        // dispatch(allActions.lensActions.selectProfile(dataProfiles.profiles.items[index].profile));
        }
    }}>
    {dataProfiles.profiles.items.map((profile:any, index:any) => {
        return(
            <Profile key={index} profile={profile}/>
        )
    })}

    </SwipeableViews>

    <div style={{marginTop: "16px"}}>
    <span style={{display: "table", margin: "0 auto"}}>Selected profile: {
          //@ts-ignore
    state.lens.selectedProfile}</span>
    </div>

    <div style={{marginTop: "16px"}}>
    <span style={{display: "table", margin: "0 auto"}}>
    
    <Grid templateColumns='repeat(4, 1fr)' gap={2}>
    {dataProfiles.profiles.items.map((profile:any, index:any) => {
        return(
        <GridItem key={index}>
        <Button
        variant={"outline"}
        key={index}
        borderColor={"#6FDB2C"}
        backgroundColor={"#6FDB2C"}
        size="sm"
        onClick={() => {
            console.log(dataProfiles.profiles.items[index])    
        // dispatch(allActions.lensActions.selectProfile(parseInt(dataProfiles.profiles.items[index].id.replace("0x", ""))))
        dispatch(allActions.lensActions.selectProfile(dataProfiles.profiles.items[index].id))

        setCardIndex(index)
        }}
        >
        {profile.id.replace("0x", "")}
        </Button>
        </GridItem>
        )
    })}
    </Grid>
    </span>
    </div>


     </Box>
    )
}

export default SelectProfile;

