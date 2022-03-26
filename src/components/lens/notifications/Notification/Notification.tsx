import GET_NOTIFICATIONS from '../../../../lib/graphql/notifications/users-notifications';
import { useQuery } from '@apollo/react-hooks';
import {useSelector, useDispatch} from 'react-redux'
// import allActions from '../../../store/actions';
import {
    Box, Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Stack, Text, useColorMode,
    useColorModeValue
  } from "@chakra-ui/react";
  import { BellIcon } from "@chakra-ui/icons";
  import Moment from 'react-moment';
  import { shorten } from '../../../../utils/shorten'
import Link from 'next/link';

const Notifications = () => {
    const state = useSelector(state => state)


    const {loading, error, data} = useQuery(GET_NOTIFICATIONS, {
        variables: {
            request: {
                profileId: state.lens.selectedProfile,
                limit: 30
            }
        }
    })

  let menuBg = useColorModeValue("white", "navy.800");
    if(data) {
        console.log(data)
    }
    return( 
        <>
      <Menu>
        <MenuButton>
          <BellIcon color={"#8BD84E"} w='30px' h='30px' />
        </MenuButton>
        <MenuList p='16px 8px' bg={menuBg}>

          <Flex flexDirection='column'>
              {data && data.notifications.items.map((notification:any, indeX:any) => {
                  return(
                    <MenuItem borderRadius='8px' mb='10px'>
                    <Flex flexDirection="column">
     
                        {notification.__typename === "NewFollowerNotification" && 
                        <Text fontWeight="bold" fontSize="14px" as="span">
                        New follower
                        </Text>}

                        {notification.__typename === "NewCollectNotification" &&
                        <Link href={`/post/${notification.collectedPublication.id}`}>
                        <Text fontWeight="bold" fontSize="14px" as="span">
                        New collect

                        <Text fontWeight="light">{notification.collectedPublication.id} collected by {notification.collectedPublication.collectedBy && shorten(notification.collectedPublication.collectedBy.address)}</Text>
                        </Text></Link>}


                        
                        <Flex alignItems="center">
                        <Text fontSize="9px" lineHeight="100%" color={"grey"} fontStyle="italic">
                        <Moment fromNow>{notification.createdAt}</Moment>
                        </Text>
                        </Flex>
                    </Flex>
        
                    </MenuItem>
                  )
              })}
          </Flex>
        </MenuList>
      </Menu>  
        </>
    )
}

export default Notifications;