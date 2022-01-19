import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import * as api from "../../api/index"; 
import { ChatState } from '../../Store/ChatProvider';
import ChatScreen from './ChatScreen/ChatScreen';
import SideBar from './SideBar/SideBar';
import UsersScreen from './UsersScreen/UsersScreen';
import './Chats.css';

const Chats = () => {
    const { user } = ChatState();
   
    return (
        <div className='Chats'>
            {user && (
                <>
                <SideBar/>
                <Box 
                    d='flex'
                    padding={'10px'}
                    justifyContent={'space-between'}
                    height={'95%'}
                >
                    <UsersScreen/>
                    <ChatScreen/>
                </Box>
                </>
            )}
        </div>
    )
}

export default Chats
