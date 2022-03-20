import {
    Textarea,
    Flex,
    Stack,
    Avatar,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    HStack,
  } from '@chakra-ui/react';
  import React, { useState, useEffect, useRef } from 'react';

  import { useTransaction, useAccount } from 'wagmi'
  import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
  import { ChangeEvent, useReducer } from 'react';

  const PostPublication = () => {

    const [postContent, setPostContent] = useState("");

    return (
      <Flex
        direction='column'
        border={1}
        // borderColor={colors.border}
        borderStyle='solid'
        boxSizing='content-box'
      >
        <HStack margin={2} p={2}>
          {/* <Avatar src={} /> */}
          <Textarea
            placeholder="What's happening?"
            resize='none'
            // bg={colors.bg}
            // color={colors.text}
            // onChange={handleInputChange}
            value={postContent}
          ></Textarea>
        </HStack>
        <Stack margin={2}>
          <Box
            // color={
            //   state.charCount > 180
            //     ? colors.tweetCounterBad
            //     : colors.tweetCounterOk
            // }
            alignSelf='flex-end'
          >
            {/* {state.charCount} */}
          </Box>
          <Button
            colorScheme='pink'
            variant='solid'
            alignSelf='flex-end'
            // isDisabled={state.btnIsDisabled}
            // onClick={() => {
            //   submitTweet();
            //   if (closeModal) closeModal();
            // }}
          >
            Post
          </Button>
        </Stack>
      </Flex>
    );
  }

  export default PostPublication; 

