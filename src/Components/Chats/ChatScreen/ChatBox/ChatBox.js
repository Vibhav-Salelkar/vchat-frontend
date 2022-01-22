import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../../../Store/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AccountDerails from "../../Navbar/AccountDetails/AccountDetails";
import EditGroup from "../EditGroup/EditGroup";
import { fetchAllMessages, sendMessageApi } from "../../../../api";
import './ChatBox.css';
import Messages from '../Messages/Messages';

import io, { Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const ChatBox = ({ reFetch, setReFetch }) => {
  const { setCreatedChat, createdChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  let user = JSON.parse(localStorage.getItem('profile')).result;

  const [socketConnected, setSocketConnected] = useState(false);

  const toast = useToast();

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

  const fetchMessages = async () => {
    if(!createdChat){
      return
    }

    try {
      setLoading(true);
      const {data} = await fetchAllMessages(createdChat._id)
      
      socket.emit('join chat', createdChat._id);
      
      setLoading(false);
      setMessages(data)
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast({
        title: "Error",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing',()=>setIsTyping(true))
    socket.on('stop typing',()=>setIsTyping(false))
  }, []);
  
  useEffect(() => {
    socket.on('message received',(newMessage) => {
      if(!selectedChatCompare || newMessage.chat._id!==selectedChatCompare._id){
        //notification
      }else {
        setMessages([...messages, newMessage])
      }
    })
  });
  

  useEffect(() => {
    fetchMessages(); 
    selectedChatCompare = createdChat;   
  }, [createdChat]);
  
  const handleMessage = (e) => {
    setNewMessage(e.target.value);

    if(!socketConnected) return

    if(!typing) {
      setTyping(true);
      socket.emit('typing',createdChat._id);
    }

    let typeTime = new Date().getTime();
    let timeLen = 3000;
    setTimeout(()=> {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - typeTime;

      if(timeDiff >=timeLen && typing) {
        socket.emit('stop typing', createdChat._id)
        setTyping(false);
      }
    },timeLen)
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit('stop typing',createdChat._id);
      try {
        setNewMessage('');
        const {data} = await sendMessageApi({
          content: newMessage,
          chatId: createdChat._id
        });

        socket.emit('new message', data);

        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };

  return (
    <>
      {createdChat ? (
        <>
          <Text
            fontSize={{ base: "1.5rem", md: "1.7rem" }}
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            px={2}
            pb={3}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              mr={3}
              icon={<ArrowBackIcon />}
              onClick={() => setCreatedChat("")}
            />
            {!createdChat.isGroup ? (
              <>
                {getSender(user, createdChat.users)}
                <AccountDerails user={getDetails(user, createdChat.users)} />
              </>
            ) : (
              <>
                {createdChat.chatName.toUpperCase()}
                <EditGroup fetchMessages={fetchMessages} reFetch={reFetch} setReFetch={setReFetch} />
              </>
            )}
          </Text>
          <Box
            width="100%"
            height="100%"
            borderRadius="10px"
            overflowY="hidden"
            padding={3}
            backgroundColor="#e8e8e8"
            display="flex"
            justifyContent="flex-end"
            flexDirection="column"
          >
            {
            loading ? <Spinner /> : <div className="messageScreen">
              <Messages user={user} messages={messages}/>
            </div>
            }
            <FormControl onKeyDown={sendMessage} isRequired mt={4}>
              {
              isTyping?
                <Box mb="0.15rem" fontWeight={400} color={'#6e6d6d'} fontSize={'0.8rem'}>Typing...</Box> : <></>           
              }
              <Input
                value={newMessage}
                backgroundColor={"#fff"}
                placeholder="message..."
                onChange={handleMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          h="100%"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize="1.2rem" p={3}>
            Select a Conversation
          </Text>
        </Box>
      )}
    </>
  );
};

export default ChatBox;
