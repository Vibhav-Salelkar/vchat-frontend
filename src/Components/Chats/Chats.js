import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import * as api from "../../api/index"; 
import { ChatState } from '../../Store/ChatProvider';
import ChatScreen from './ChatScreen/ChatScreen';
import SideBar from './SideBar/SideBar';
import UsersScreen from './UsersScreen/UsersScreen';

const Chats = () => {
    const [chats, setChats] = useState([])
    const { user } = ChatState();
   
    return (
        <div>
            {user && (
                <>
                <SideBar/>
                <Box>
                    <UsersScreen/>
                    <ChatScreen/>
                </Box>
                </>
            )}
        </div>
    )
}

export default Chats
