import React, { useEffect, useState } from 'react';
import * as api from "../../api/index"; 

const Chats = () => {

    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const {data} = await api.fetchChats();

        setChats(data)
    }

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <div>
            {
                chats.map((chat)=> {
                    return (
                        <div key={chat._id}>
                            {chat.chatName}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Chats
