import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../../../Store/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AccountDerails from "../../Navbar/AccountDetails/AccountDetails";
import EditGroup from "../EditGroup/EditGroup";
import { sendMessageApi } from "../../../../api";

const ChatBox = ({ reFetch, setReFetch }) => {
  const { user, setCreatedChat, createdChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);

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

  const handleMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage('');
        const {data} = await sendMessageApi({
          content: newMessage,
          chatId: createdChat._id
        });
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
                <EditGroup reFetch={reFetch} setReFetch={setReFetch} />
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
            {loading ? <Spinner /> : <div></div>}
            <FormControl onKeyDown={sendMessage} isRequired mt={4}>
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
