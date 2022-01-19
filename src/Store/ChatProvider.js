import {createContext, useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(()=> {
        const userProfile = JSON.parse(localStorage.getItem('profile'));

        setUser(userProfile);

        if(!userProfile){
            history.push('/')
        }
    },[history])

    return <ChatContext.Provider value={{user,setUser}}>{children}</ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;









