import {createContext, useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user, setUser] = useState();
    const [createdChat, setCreatedChat] = useState();
    const [chats, setChats] = useState([]);
    const history = useHistory();

    useEffect(()=> {
        const userProfile = JSON.parse(localStorage.getItem('profile'));
        if(!userProfile){
            history.push('/')
        }
        setUser(userProfile?.result);
    },[history])

    return <ChatContext.Provider value={{user,setUser, createdChat, setCreatedChat, chats, setChats}}>{children}</ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;









