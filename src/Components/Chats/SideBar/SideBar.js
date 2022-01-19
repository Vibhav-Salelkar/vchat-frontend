import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  toast,
  useDisclosure,
} from "@chakra-ui/react";
import { findUser } from "../../../api";
import UserCard from "./UserCard/UserCard";

const SideBar = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async () => {
    if (!search) {
        return
    }
    try{
        setLoading(true)
        const {data} = await findUser(search);
        console.log(data.user);
        setLoading(false);
        setSearchData(data.user);
    }catch(error) {
        setLoading(false);
        toast({
            title: 'Error',
            description: error.response.data.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: "top-right"
        })
    }
  };

  const handleCreateChat =() => {
      
  }

  return (
    <>
      {
        <Button variant={"ghost"} onClick={onOpen}>
          {children}
        </Button>
      }
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Chat</DrawerHeader>
          <DrawerBody>
            <Box d="flex">
              <Input onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." />
              <Button ml="0.4rem" onClick={handleSearch}>
                Search
              </Button>
            </Box>
            {
            loading ? <Box d="flex" justifyContent={'center'} mt="5rem" width={'100%'}><Spinner/></Box> : 
            (
                searchData?.map(user => {
                    return <UserCard handleCreateChat={handleCreateChat}/>
                })
            ) 
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBar;
