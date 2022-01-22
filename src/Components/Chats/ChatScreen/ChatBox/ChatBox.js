import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { ChatState } from '../../../../Store/ChatProvider';
import {ArrowBackIcon} from "@chakra-ui/icons";
import AccountDerails from '../../Navbar/AccountDetails/AccountDetails';

const ChatBox = ({reFetch, setReFetch}) => {
  const {user, setCreatedChat, createdChat} = ChatState();

  const getSender = (user, users) => {
    if (users) {
      return users[0]._id === user._id ? users[1].name : users[0].name;
    } else {
      return;
    }
  };

  const getDetails = (user, users) => {
    if (users) {
      return users[0]._id === user._id ? users[1] : users[0];
    } else {
      return;
    }
  };

  return (
    <>
      {
        createdChat ? (
          <>
          <Text
            fontSize={{base: '1.5rem', md: '1.7rem'}}
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
            px={2}
            pb={3}
          >
            <IconButton
              display={{base: 'flex', md: 'none'}}
              mr={3}
              icon={<ArrowBackIcon/>}
              onClick={()=>setCreatedChat('')}
            />
            {!createdChat.isGroup ? (
              <>
              {
                getSender(user, createdChat.users)
              }
                <AccountDerails user={getDetails(user, createdChat.users)}/>
              
              </>
            ): (
              <>
                {createdChat.chatName.toUpperCase()}
              </>
            )}
          </Text>
          <Box
            width='100%'
            height='100%'
            borderRadius='10px'
            overflowY='hidden'
            padding={3}
            backgroundColor='#f0f0f0'
            display='flex'
            justifyContent='flex-end'
            flexDirection='column'
        >

          </Box>
          </>
        ): (
          <Box
            display={'flex'}
            h='100%'
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text fontSize="1.2rem" p={3}>Select a Conversation</Text>
          </Box>
        )
      }
    </>
  );
};

export default ChatBox;
