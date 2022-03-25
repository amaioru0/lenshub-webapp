import React, { useState, useEffect, useRef } from 'react';

import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import HAS_TX_BEEN_INDEXED from '../../../../lib/graphql/indexer/has-transaction-been-indexed';
import Loader from '../../../Loader/Loader';
import {
    Text,
  } from '@chakra-ui/react';


  const TxStatus = ({txHash, pollInterval, setPollInterval}: {txHash:any, pollInterval: any, setPollInterval: any}) => {

    const {loading: txLoading, error: txError, data: txData} = useQuery(HAS_TX_BEEN_INDEXED, {
        variables: {
            request: {
                txHash: txHash
            }
        },
        pollInterval,
        onCompleted(data) {
            if (data.hasTxHashBeenIndexed && data.hasTxHashBeenIndexed.indexed) {
                setPollInterval(0)
            }
          }

    })
    useEffect(() => {
        if(txData){
        if (txData.hasTxHashBeenIndexed && txData.hasTxHashBeenIndexed.indexed) {
            setPollInterval(0)
        }
    }
    }, [txData])

    return( 
        <>
        {!txData?.hasTxHashBeenIndexed?.indexed &&
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
        <Loader  />
        <a href={`https://mumbai.polygonscan.com/tx/${txHash}`} target="_blank" rel="noreferrer">
        TX
        </a>
        </div>}

        {txData?.hasTxHashBeenIndexed?.indexed && <Text style={{fontWeight: 800, color: "green"}}>DONE</Text>}
        </>
    )
}

export default TxStatus;