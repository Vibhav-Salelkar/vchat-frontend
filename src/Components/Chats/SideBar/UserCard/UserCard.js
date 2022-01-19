import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserCard = ({ user, handleCreateChat }) => {

    return (
    <Box
      cursor={"pointer"}
      backgroundColor="#f0f0f0"
      onClick={handleCreateChat}
      _hover={{
        background: "#BAABDA",
        color: "#333",
      }}
      m={'1rem 0'}
      py={3}
      px={4}
      color={"#333"}
      d="flex"
      alignItems={"center"}
      w="100%"
      border={'1px'}
      borderColor={'#ccc'}
      borderRadius={"lg"}
    >
      <Avatar
        name={user.name}
        src={user.avatar}
        size="sm"
        bg={'#ff3f6c'}
        color="#333"
        curser="pointer"
      />
      <Box ml="1.1rem">
          <Text>{user.name}</Text>
          <Text fontSize={'0.6rem'} fontWeight={'bold'}>{user.email}</Text>
      </Box>
    </Box>
  );
};

export default UserCard;
