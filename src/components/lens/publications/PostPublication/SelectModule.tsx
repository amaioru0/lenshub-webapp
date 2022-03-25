import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
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
    chakra,
    useColorModeValue,
    Stack,
    Textarea,
    Link,
    useDisclosure,
    Select,
    Input,
    InputGroup,
    InputLeftAddon
  } from '@chakra-ui/react';
import {
    FEE_COLLECT_MODULE, LIMITED_FEE_COLLECT_MODULE, TIMED_FEE_COLLECT_MODULE, LIMITED_TIMED_FEE_COLLECT_MODULE, REVERT_COLLECT_MODULE, EMPTY_COLLECT_MODULE, FEE_FOLLOW_MODULE, APPROVAL_FOLLOW_MODULE, FOLLOWER_ONLY_REFERENCE_MODULE
  } from '../../../../lib/config';


export const getCollectModule = (module:any, settings:any) => {
    switch(module) {
      case 'emptyCollectModule':
        return {
          emptyCollectModule: true
        }
        case 'feeCollectModule':
          return {
            feeCollectModule: {
                "amount": {
                    "currency": settings.amount.currency,
                    "value": `${settings.amount.value}`
                  },
                  "recipient": settings.recipient,
                  "referralFee": settings.referralFee
              }
          }
          case 'revertCollectModule':
            return {
                revertCollectModule: true
            }
          case 'limitedTimedFeeCollectModule':
            return {
                limitedTimedFeeCollectModule: {
                  "collectLimit": settings.collectLimit,
                  "amount": {
                      "currency": settings.amount.currency,
                      "value": `${settings.amount.value}`
                    },
                    "recipient": settings.recipient,
                    "referralFee": settings.referralFee
                }
            }
            case 'timedFeeCollectModule':
                return {
                    timedFeeCollectModule: {
                      "collectLimit": settings.collectLimit,
                      "amount": {
                          "currency": settings.amount.currency,
                          "value": `${settings.amount.value}`
                        },
                        "recipient": settings.recipient,
                        "referralFee": settings.referralFee
                    }
                }
            case 'limitedFeeCollectModule':
                return {
                    limitedFeeCollectModule: {
                      "collectLimit": settings.collectLimit,
                      "amount": {
                          "currency": settings.amount.currency,
                          "value": `${settings.amount.value}`
                        },
                        "recipient": settings.recipient,
                        "referralFee": settings.referralFee
                    }
                }
    
                
      default:
        return {
          emptyCollectModule: true
        }
    }
  }

  const Settings = ({collectModule, settings, setSettings}: {collectModule:any, settings:any, setSettings: Function}) => {
      return(
          <>
        {(collectModule === "feeCollectModule"  || "limitedTimedFeeCollectModule" || "timedFeeCollectModule") && 
        <>

       {collectModule ==="limitedTimedFeeCollectModule" || "timedFeeCollectModule" && <InputGroup>
            <InputLeftAddon
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
            children='CollectLimit' />
            <Input
            onChange={(e) => {
                setSettings({...settings, collectLimit: e.target.value})
            }}
            value={settings.collectLimit}
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
            />
        </InputGroup>}

        <InputGroup>
            <InputLeftAddon
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
            children='Currency' />
            <Select
            onChange={(e) => {
                setSettings({...settings, amount: { ...settings.amount, currency: e.target.value }})
            }}
            value={settings.amount.currency}
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
            >
            <option value="0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889">WMATIC (0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889)</option>
            <option value="0x3C68CE8504087f89c640D02d133646d98e64ddd9">WETH (0x3C68CE8504087f89c640D02d133646d98e64ddd9)</option>
            <option value="0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e">USDC (0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e)</option>
            <option value="0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F">DAI (0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F)</option>
            </Select>
        </InputGroup>

        <InputGroup>
            <InputLeftAddon
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
            children='Value' />
            <Input
            value={settings.amount.value}
            onChange={(e) => {
                setSettings({...settings, amount: { ...settings.amount, value: e.target.value }})
            }}
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
        />
        </InputGroup>

        <InputGroup>
            <InputLeftAddon
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
            children='Recipient' />
            <Input
            value={settings.recipient}
            onChange={(e) => {
                setSettings({...settings, recipient: e.target.value})
            }}
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
        />
        </InputGroup>

        <InputGroup>
            <InputLeftAddon
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
            children='referralFee' />
            <Input
            value={settings.referralFee}
          onChange={(e) => {
            setSettings({...settings, referralFee: e.target.value})
        }}
            style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
        />
        </InputGroup>
        </>
        }

      
          </>
      )
  }

  const SelectModule = ({collectModule, setCollectModule, referenceModule, setReferenceModule, settings, setSettings}: {collectModule:any, setCollectModule:Function, referenceModule:any, setReferenceModule:Function, settings:any, setSettings:Function}) => {
      

    return(
        <>
        {/* {JSON.stringify(settings)} */}
          {collectModule === "emptyCollectModule" && <Text>{EMPTY_COLLECT_MODULE}</Text>}
          {collectModule === "limitedTimedFeeCollectModule" && <Text>{LIMITED_TIMED_FEE_COLLECT_MODULE}</Text>}
          {collectModule === "limitedFeeCollectModule" && <Text>{LIMITED_FEE_COLLECT_MODULE}</Text>}
          {collectModule === "timedFeeCollectModule" && <Text>{TIMED_FEE_COLLECT_MODULE}</Text>}
          {collectModule === "feeCollectModule" && <Text>{FEE_COLLECT_MODULE}</Text>}
          {collectModule === "revertCollectModule" && <Text>{REVERT_COLLECT_MODULE}</Text>}
        
          <Select 
        style={{marginTop: "5px", height: "24px", fontSize: "12px", color: "#43787A", maxWidth: "130px"}}
        variant='outline'
           value={collectModule} onChange={(e)=> {
            setCollectModule(e.target.value)
          }}>
          <option value='emptyCollectModule'>emptyCollectModule</option>
          <option value='limitedTimedFeeCollectModule'>limitedTimedFeeCollectModule</option>
          <option value='timedFeeCollectModule'>timedFeeCollectModule</option>
          <option value='feeCollectModule'>feeCollectModule</option>
          <option value='limitedFeeCollectModule'>limitedFeeCollectModule</option> 
          <option value='revertCollectModule'>revertCollectModule</option>
        </Select> 

        {(collectModule === "limitedTimedFeeCollectModule") && <Settings collectModule={collectModule} settings={settings} setSettings={setSettings} />}
        {(collectModule === "timedFeeCollectModule") && <Settings collectModule={collectModule} settings={settings} setSettings={setSettings} />}
        {(collectModule === "feeCollectModule") && <Settings collectModule={collectModule} settings={settings} setSettings={setSettings} />}
        {(collectModule === "limitedFeeCollectModule") && <Settings collectModule={collectModule} settings={settings} setSettings={setSettings} />}

        </>
      )
  }

  export default SelectModule;