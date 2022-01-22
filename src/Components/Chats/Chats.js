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
    let user = JSON.parse(localStorage.getItem('profile')).result;    
    const [reFetch , setReFecth] = useState(false)

    return (
        <div className='Chats'>
            {user && <Navbar user={user}/>}
            <Box 
                d='flex'
                padding={'10px'}
                justifyContent={'space-between'}
                height={'95%'}
            >
                {user && <ChatScreen reFetch={reFetch} setReFecth={setReFecth}/>}
                {user && <UsersScreen reFetch={reFetch} user={user}/>}
            </Box>
        </div>
    )
}

export default Chats
