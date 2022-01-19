import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const AccountDetails = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? <span onClick={onOpen}>{children}</span> : null}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"1rem"} d="flex" justifyContent={"center"}>
            My Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Image
              borderRadius={"full"}
              boxSize={"9.5rem"}
              src={user.result.avatar || "https://via.placeholder.com/150"}
            />
            <Box mt="1.2rem" mb="1.2rem">
              <Text fontSize={"0.9rem"} color="#ff3f6c">
                <span style={{ fontWeight: "bold", color: "#333" }}>Name:</span>{" "}
                {user.result.name}
              </Text>
              <Text fontSize={"0.9rem"} color="#ff3f6c">
                <span style={{ fontWeight: "bold", color: "#333" }}>
                  Email:
                </span>{" "}
                {user.result.email}
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AccountDetails;
