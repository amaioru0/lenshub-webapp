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
  } from '@chakra-ui/react';
import Loader from '../../../Loader/Loader';

import Profile from '../Profile/Profile';

import GET_PROFILES, { ProfilesRequest} from '../../../../lib/graphql/profile/get-profiles';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const styles = {
    slide: {
      padding: 15,
      minHeight: 100,
      color: '#fff',
    },
    slide1: {
      background: '#FEA900',
    },
    slide2: {
      background: '#B3DC4A',
    },
    slide3: {
      background: '#6AC0FF',
    },
  };
  
const SelectProfile = () => {
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

    useEffect(() => {
    console.log("here")
    console.log(dataProfiles)
    console.log(state)
    }, [dataProfiles])


    const [cardIndex, setCardIndex] = useState(0)

    if(loadingProfiles) return <Loader />

    if(errorProfiles) return <h1>error</h1>
      
    return(
     <>
    <SwipeableViews
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
    <span style={{display: "table", margin: "0 auto"}}>Selected profile: {state.lens.selectedProfile}</span>
    </div>

    <div style={{marginTop: "16px"}}>
    <span style={{display: "table", margin: "0 auto"}}>
    <ButtonGroup variant='outline' spacing='6'>

    {dataProfiles.profiles.items.map((profile:any, index:any) => {
        return(
        <Button
        key={index}
        borderColor={"#eb4034"}
        backgroundColor={"#eb4034"}
        onClick={() => {
            console.log(dataProfiles.profiles.items[index])    
        // dispatch(allActions.lensActions.selectProfile(parseInt(dataProfiles.profiles.items[index].id.replace("0x", ""))))
        dispatch(allActions.lensActions.selectProfile(dataProfiles.profiles.items[index].id))

        setCardIndex(index)
        }}
        >
        {profile.id.replace("0x", "")}
        </Button>
        )
    })}
    </ButtonGroup>
    </span>
    </div>


     </>
    )
}

export default SelectProfile;

