import React from 'react'
import {ChatState} from '../../../Store/ChatProvider';
import { Box } from '@chakra-ui/react';
import ChatBox from './ChatBox/ChatBox';

const ChatScreen = ({reFetch, setReFetch}) => {
    const {createdChat} = ChatState();
    return (
        <Box
            display={{base: createdChat?'flex':'none', md:'flex'}}
            borderRadius={'10px'}
            flexDirection='column'
            width={{base: '100%', md:'65%'}}
            p={3}
            mr={2}
            height={'95%'}
            backgroundColor={'#fff'}
        >
            <ChatBox reFetch={reFetch} setReFetch={setReFetch}/>
        </Box>
    )
}

export default ChatScreen
