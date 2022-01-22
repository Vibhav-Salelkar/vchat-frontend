import { Box, Button, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getChats } from "../../../api";
import { ChatState } from "../../../Store/ChatProvider";
import { SmallAddIcon } from "@chakra-ui/icons";
import GroupModal from "./GroupModal/GroupModal";

const UsersScreen = ({ user }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { setCreatedChat, createdChat, chats, setChats } = ChatState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const { data } = await getChats();
      setLoading(false);
      setChats(data.chats);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const getSender = (user, users) => {
    if (users) {
      return users[0]._id === user._id ? users[1].name : users[0].name;
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <Box
      d={{ base: createdChat ? "none" : "flex", md: "flex" }}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      borderWidth={"1px"}
      height={"95%"}
      width={{ base: "100%", md: "35%" }}
      borderRadius={"10px"}
      backgroundColor={"#fff"}
    >
      <Box
        d="flex"
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
      >
        <Box fontSize="1.1rem">
          <Text d="inline-block" color="#ff3f6c">
            C
          </Text>
          hats
        </Box>
        <GroupModal>
          <Button d="flex" fontSize="0.8rem" rightIcon={<SmallAddIcon />}>
            Create Group
          </Button>
        </GroupModal>
      </Box>
      <Box
        d="flex"
        width={"100%"}
        height={"100%"}
        borderRadius={"10px"}
        overflowY={"hidden"}
        flexDirection="column"
        p={3}
        backgroundColor="#f8f8f8"
      >
        {chats.length > 0 ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat) => {
              return (
                <Box
                  px={3}
                  py={2}
                  borderRadius={"5px"}
                  key={chat._id}
                  cursor={"pointer"}
                  backgroundColor={createdChat === chat ? "#38b3ac" : "#e8e8e8"}
                  color={createdChat === chat ? "white" : "#000"}
                  onClick={() => setCreatedChat(chat)}
                >
                  <Text>
                    {!chat.isGroup
                      ? getSender(user, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <Spinner />
        )}
      </Box>
    </Box>
  );
};

export default UsersScreen;
