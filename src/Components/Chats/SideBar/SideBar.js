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
import React, { useState } from "react";
import { Search2Icon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../../Store/ChatProvider";

const SideBar = () => {
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const {user} = ChatState();
    console.log(user);
  return (
    <>
      <Box
        w="100%"
        p="6px 10px 6px 10px"
        bg={"white"}
        d="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
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
        <Text
          d="inline-block"
          fontSize="1.5rem"
          fontFamily={"Roboto Slab"}
          color="#ff3f6c"
        >
          V<span className="logo">Chat</span>
        </Text>
        <div>
          <Menu>
            <MenuButton pr={2}>
              <BellIcon m={1} fontSize={"xl"} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              
              rightIcon={<ChevronDownIcon />}
            >
                <Avatar name={user.result.name} src={user.result.avatar} size="sm" curser="pointer"/>
            </MenuButton>
            <MenuList fontSize={'0.8rem'}>
                <MenuItem>My Profile</MenuItem>
                <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideBar;
