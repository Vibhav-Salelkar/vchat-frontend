import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const currentTarget = e.target.name;
    const currentTargetValue = e.target.value;

    setForm({
      ...form,
      [currentTarget]: currentTargetValue,
    });
  };

  const handleSubmit = () => {
  };

  return (
    <VStack mt="10px" spacing={4}>
      <FormControl id="signin-email" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input name="email" placeholder="Enter your email" onChange={handleChange} />
      </FormControl>

      <FormControl id="signin-password" isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            name="password"
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

      <Button onClick={handleSubmit} w="100%" colorScheme="blue">
        Sign In
      </Button>
    </VStack>
  );
};

export default Signin;
