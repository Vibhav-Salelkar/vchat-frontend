import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserCard = ({ user, handleComponentClick }) => {

    return (
    <Box
      cursor={"pointer"}
      backgroundColor="#f0f0f0"
      onClick={handleComponentClick}
      _hover={{
        background: "#BAABDA",
        color: "#333",
      }}
      m={'0.6rem 0'}
      py={2}
      px={3}
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
          <Text fontSize={'0.85rem'} fontWeight={'600'}>{user.name}</Text>
          <Text fontSize={'0.6rem'} fontWeight={'400'}>{user.email}</Text>
      </Box>
    </Box>
  );
};

export default UserCard;
