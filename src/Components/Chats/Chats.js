import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import * as api from "../../api/index"; 
import { ChatState } from '../../Store/ChatProvider';
import ChatScreen from './ChatScreen/ChatScreen';
import SideBar from './SideBar/SideBar';
import UsersScreen from './UsersScreen/UsersScreen';
import './Chats.css';
import Navbar from './Navbar/Navbar';

const Chats = () => {
    const { user } = ChatState();

    return (
        <div className='Chats'>
            {user && <Navbar/>}
            <Box 
                d='flex'
                padding={'10px'}
                justifyContent={'space-between'}
                height={'95%'}
            >
                {user && <ChatScreen/>}
                {user && <UsersScreen/>}
            </Box>
        </div>
    )
}

export default Chats
