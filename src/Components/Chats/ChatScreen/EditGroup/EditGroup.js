import {
  Box,
  Button,
  FormControl,
  IconButton,
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
import { EditIcon } from "@chakra-ui/icons";
import { ChatState } from "../../../../Store/ChatProvider";
import SelectedUser from "../../UsersScreen/GroupModal/SelectedUser/SelectedUser";
import UserCard from "../../SideBar/UserCard/UserCard";
import { addInGroup, editGroup, findUser, removeFromGroup } from "../../../../api";

const EditGroup = ({ reFetch, setReFetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createdChat, setCreatedChat, user } = ChatState();
  const [editdGroupName, setEditedGroupName] = useState();
  const [search, setSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleRename = async () => {
    if (!editdGroupName) {
      return;
    }
    try {
      setLoading(true);

      const { data } = await editGroup({
        name: editdGroupName,
        groupId: createdChat._id,
      });
      setLoading(false);
      setCreatedChat(data.existingGroup);
      setReFetch(!reFetch);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleSearch = async (searchQuery) => {
    setSearch(searchQuery);
    if (!searchQuery) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await findUser(searchQuery);
      setLoading(false);
      setSearchResult(data.user);
    } catch (error) {
      console.log(error);
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

  const handleGroup = async (userToAdd) => {
    if (createdChat.users.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User already exit in group",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    //only admins can add users
    if (createdChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admin can add users",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await addInGroup({
        userId: userToAdd._id,
        groupId: createdChat._id,
      });

      setCreatedChat(data.addUser);
      setReFetch(!reFetch);
      setLoading(false);
    } catch (error) {
      console.log(error);
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

  const handleRemove = async (userToRemove) => {
    //only admins can remove users
    if (createdChat.groupAdmin._id !== user._id && userToRemove._id !== user._id) {
      toast({
        title: "Only Admin can remove users",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await removeFromGroup({
        userId: userToRemove._id,
        groupId: createdChat._id,
      });

      userToRemove._id === user._id ? setCreatedChat() : setCreatedChat(data.removedUser);
      setReFetch(!reFetch);
      setLoading(false);
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<EditIcon />}
        onClick={onOpen}
      />
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
                <Input
                  placeholder="Edit Group Name"
                  mb={3}
                  onChange={(e) => setEditedGroupName(e.target.value)}
                ></Input>
                <Button
                  backgroundColor={"blue.300"}
                  _hover={{ backgroundColor: "blue.600", color: "#fff" }}
                  isLoading={loading}
                  ml="0.5rem"
                  onClick={handleRename}
                >
                  Update
                </Button>
              </FormControl>
              {createdChat.users?.map((user) => {
                return (
                  <SelectedUser
                    key={user._id}
                    user={user}
                    handleComponentClick={() => handleRemove(user)}
                  />
                );
              })}
              <FormControl mt={2}>
                <Input
                  placeholder="Add Users To Group"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                ></Input>
              </FormControl>
              {loading ? (
                <Spinner />
              ) : (
                searchResult?.slice(0, 5).map((user) => {
                  return (
                    <UserCard
                      key={user._id}
                      user={user}
                      handleComponentClick={() => handleGroup(user)}
                    />
                  );
                })
              )}
            </Box>
          </ModalBody>
          <ModalFooter
            d="flex"
            justifyContent={"center"}
            alignItems={"center"}
            mb={3}
          >
            <Button
              onClick={() => handleRemove(user)}
              backgroundColor={"red.300"}
              _hover={{ backgroundColor: "red.700", color: "#fff" }}
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
