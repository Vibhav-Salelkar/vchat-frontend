import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import {EditIcon} from "@chakra-ui/icons";
import { ChatState } from '../../../../Store/ChatProvider';
import SelectedUser from '../../UsersScreen/GroupModal/SelectedUser/SelectedUser';
import UserCard from '../../SideBar/UserCard/UserCard';


const EditGroup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createdChat, setCreatedChat, user} = ChatState(); 
  const [editdGroupName, setEditedGroupName] = useState();
  const [search, setSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const handleRename = async () => {
    if(!editdGroupName) {
      return
    }
    try {
      setLoading(true);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }  
  }

  const handleSearch = () => {

  }

  const handleGroup = () => {

  }

  const handleDelete = (user) => {
  
  }

  const handleRemove = () => {

  }

  return (
    <>
    <IconButton display={{base: 'flex'}} icon={<EditIcon/>} onClick={onOpen}/>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"1rem"} d="flex" justifyContent={"center"}>
          Edit {createdChat.chatName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          d="flex"
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Box mb={3} mt={3}>
              <FormControl display="flex" mb={2}>
                  <Input placeholder="Edit Group Name" mb={3} onChange={(e) => setEditedGroupName(e.target.value)}>
                  </Input>
                  <Button loading={loading} ml='0.5rem' onClick={handleRename}>
                    Update
                  </Button>
              </FormControl>
              {
                createdChat.users?.map(user => {
                  return <SelectedUser key={user._id} user={user} handleComponentClick={()=>handleDelete(user)}/>
                })
              }
              <FormControl mt={2}>
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
            <Button onClick={handleRemove} backgroundColor={'red.300'}
              _hover={{backgroundColor:'red.700', color: '#fff'}}
            >
              Leave Group
            </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  );
};

export default EditGroup;
