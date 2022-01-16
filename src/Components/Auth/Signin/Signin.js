import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import React from "react";

const Signin = () => {

  const handleChange = () => {

  }

  const handleSubmit = () => {

  }

  return (
    <VStack mt="10px" spacing={4}>
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input placeholder="Enter your name" onChange={handleChange} />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input placeholder="Enter your email" onChange={handleChange} />
      </FormControl>

      
      <Button onClick={handleSubmit} w="100%" colorScheme="blue">
        Sign In
      </Button>
    </VStack>
  );
};

export default Signin;
