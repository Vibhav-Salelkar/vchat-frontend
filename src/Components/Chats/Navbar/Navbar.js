import React from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Search2Icon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../../Store/ChatProvider";
import AccountDetails from "./AccountDetails/AccountDetails";

const Navbar = () => {
  const { user } = ChatState();

  return (
    <Box
      w="100%"
      p="10px"
      bg={"white"}
      d="flex"
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Menu>
        <MenuButton>
          <Avatar
            name={user.result.name}
            src={user.result.avatar}
            size="sm"
            curser="pointer"
          />
        </MenuButton>
        <MenuList fontSize={"0.8rem"}>
          <AccountDetails user={user}>
            <MenuItem>My Profile</MenuItem>
          </AccountDetails>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
      <Text
        d="inline-block"
        fontSize="1.5rem"
        fontFamily={"Roboto Slab"}
        color="#ff3f6c"
      >
        V<span className="logo">Chat</span>
      </Text>
      <div>
        <Button variant="ghost">
          <Search2Icon w={3} h={3} mt="0.1rem" />
          <Text
            display={{ base: "none", md: "block" }}
            ml="0.5rem"
            mt="0.1rem"
            fontSize={"0.85rem"}
          >
            Search
          </Text>
        </Button>
        <Menu>
          <MenuButton pr={2}>
            <BellIcon m={1} fontSize={"xl"} />
          </MenuButton>
        </Menu>
      </div>
    </Box>
  );
};

export default Navbar;