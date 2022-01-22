import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { createGroup, findUser } from "../../../../api";
import { ChatState } from "../../../../Store/ChatProvider";
import UserCard from "../../SideBar/UserCard/UserCard";
import SelectedUser from "./SelectedUser/SelectedUser";

const GroupModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState('');
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const {user, chats, setChats} = ChatState();

  const handleSearch =async (searchQuery) => {
    setSearch(searchQuery);
    if(!searchQuery){
        return 
    }
    try {
        setLoading(true)
        const {data} = await findUser(searchQuery);
        setLoading(false);
        setSearchResult(data.user);
    } catch (error) {
        console.log(error);
        setLoading(false);
        toast({
            title: 'Error',
               status: 'error',
            duration: 4000,
            isClosable: true,
            position: "top-right"
        })
    }
  }

  const handleGroup = (user) => {
    if(selectedUsers.includes(user)){
        console.log('yes');
        toast({
            title: 'User already added',
            status: 'warning',
            duration: 4000,
            isClosable: true,
            position: "top-right"
        }) 
        return
    }
    setSelectedUsers([...selectedUsers, user])
  }

  const handleDelete = (user) => {
    let copy = [...selectedUsers];
    copy = copy?.filter(u => {
        return u._id !== user._id;
    })
    setSelectedUsers(copy)
  }

  const handleSubmit = async () => {
    if(!groupName || selectedUsers.length <= 0) {
        toast({
            title: 'Please fill required data',
            status: 'warning',
            duration: 4000,
            isClosable: true,
            position: "top-right"
        }) 
        return 
    }
    let groupData = {
        name: groupName,
        users: JSON.stringify(selectedUsers.map(user=>user._id))
    }
    try {
        setLoading(true)
        const {data} = await createGroup(groupData);
        setChats([data.foundGroupChat, ...chats])
        onClose();
        toast({
            title: 'Group Successfully created',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: "top-right"
        }) 
    } catch (error) {
        console.log(error);
        setLoading(false)
        toast({
            title: 'Error! make sure atleast 2 users are selected',
            status: 'warning',
            duration: 4000,
            isClosable: true,
            position: "top-right"
        }) 
    }
  }

  return (
    <>
      {children ? <span onClick={onOpen}>{children}</span> : null}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"1rem"} d="flex" justifyContent={"center"}>
            Create New Group
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Box mb={3} mt={3}>
                <FormControl>
                    <Input placeholder="Enter Group Name" mb={3} onChange={(e) => setGroupName(e.target.value)}>
                    </Input>
                </FormControl>
                <Box display={'flex'} width={'350px'} flexWrap={'wrap'}>
                    {
                        selectedUsers?.map(user => {
                            return <SelectedUser key={user._id} user={user} handleComponentClick={()=>handleDelete(user)}/>
                        })
                    }
                </Box>
                <FormControl>
                    <Input placeholder="Add Users To Group" mb={1} onChange={(e)=> handleSearch(e.target.value)}>
                    </Input>
                </FormControl>
                {loading? <Spinner/> : (
                    searchResult?.slice(0,5).map(user => {
                        return <UserCard key={user._id} user={user} handleComponentClick={()=> handleGroup(user)}/>
                    })
                )}
            </Box>
          </ModalBody>
          <ModalFooter d='flex' justifyContent={'center'} alignItems={'center'} mb={3}>
              <Button onClick={handleSubmit} backgroundColor={'green.300'}
                _hover={{backgroundColor:'green.700', color: '#fff'}}
              >
                Create Group
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
