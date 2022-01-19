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
  Text,
  toast,
  useDisclosure,
} from "@chakra-ui/react";
import { createChat, findUser } from "../../../api";
import UserCard from "./UserCard/UserCard";

const SideBar = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [createdChat, setCreatedChat] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async () => {
    if (!search) {
        setSearchData([])
        return
    }
    try{
        setLoading(true)
        const {data} = await findUser(search);
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

  const handleCreateChat = async (userId) => {
      try {
        setLoading(true)
        const {data} = await createChat({userId})
        setLoading(false);
        setCreatedChat(data);
        onClose();
      } catch (error) {
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
          <DrawerHeader><Text d="inline-block" color="#ff3f6c">Search</Text> Chat</DrawerHeader>
          <DrawerBody>
            <Box d="flex">
              <Input onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." />
              <Button bg="#ff3f6c" color="#fff"_hover={{bg:"#f3332c"}} ml="0.4rem" onClick={handleSearch}>
                Search
              </Button>
            </Box>
            {
            loading ? <Box d="flex" justifyContent={'center'} mt="5rem" width={'100%'}><Spinner/></Box> : 
            (
                searchData?.map(user => {
                    return <UserCard key={user._id} user={user} handleCreateChat={()=>handleCreateChat(user._id)}/>
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
