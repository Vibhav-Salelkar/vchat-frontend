import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signIn } from "../../../api";

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleChange = (e) => {
    const currentTarget = e.target.name;
    const currentTargetValue = e.target.value;

    setForm({
      ...form,
      [currentTarget]: currentTargetValue,
    });
  };

  const handleTest = () => {
    setForm({
      email: 'test@example.com',
      password: 'test123'
    })
  }

  const handleSubmit = async () => {
    setLoading(true);
    if (!form.email || !form.password) {
      toast({
        title: "Please provide required data",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
    try {
      const { data } = await signIn(form);
      await localStorage.setItem("profile", JSON.stringify(data));
      toast({
        title: `Welcome ${data.result.name}`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        description: error.response.data.message,
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack mt="10px" spacing={4}>
      <FormControl id="signin-email" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          value={form.email}
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="signin-password" isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            value={form.password}
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

      <Button
        isLoading={loading}
        onClick={handleSubmit}
        w="100%"
        colorScheme="blue"
      >
        Sign In
      </Button>
      <Button
        isLoading={loading}
        onClick={handleTest}
        w="100%"
        color={'#fff'}
        bg={'red.400'}
      >
        Click For Test Credentials
      </Button>
    </VStack>
  );
};

export default Signin;
