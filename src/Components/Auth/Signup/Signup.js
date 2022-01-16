import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = () => {};

  const handleAvatar = () => {};

  const handleSubmit = () => {};

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

      <FormControl id="password" isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <InputRightElement w="3rem">
            <Button
              bg={"transperent"}
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
        <Input
          type={"password"}
          placeholder="Confirm your password"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="avatar">
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <Input
          type={"file"}
          p={1}
          accept="image/*"
          onChange={(e) => handleAvatar(e.target.files[0])}
        />
      </FormControl>

      <Button onClick={handleSubmit} w="100%" colorScheme="blue">
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
