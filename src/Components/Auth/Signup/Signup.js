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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import React, { useState } from "react";
import { useHistory } from 'react-router-dom'; 

import { signUp } from "../../../api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
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
          [currentTarget]: currentTargetValue
      })
  };

  const handleAvatar = (file) => {
    setLoading(true);
    if(file === undefined) {
      toast({
        title: 'Please select avatar',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
      return;
    }
    if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
      let data = new FormData();
      data.append('upload_preset', 'vchatapp');
      data.append('file', file);
      data.append('cloud_name', 'dwnabprdz');
      fetch("https://api.cloudinary.com/v1_1/dwnabprdz/image/upload", {
        method: "post",
        body: data
      }).then((res) => res.json())
      .then((data) => {
        setForm({...form, avatar: data.url.toString()});
        setLoading(false);
        toast({
          title: 'Avatar uploaded successfully.',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: "top-right"
        })
      }).catch(err => {
        console.log(err);
        setLoading(false);
      })
    }else {
      toast({
        title: 'Please select avatar',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if(!form.email || !form.password || !form.confirmPassword) {
      toast({
        title: 'Please provide required data',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
      setLoading(false)
      return;
    }
    if(form.password !== form.confirmPassword) {
      toast({
        title: 'Paasword don\'t match',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
      setLoading(false)
      return;
    }
    try {
      const {data} = await signUp(form);
      toast({
        title: 'Profile created successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top-right"
      })
      localStorage.setItem('profile', JSON.stringify(data))
      setLoading(false)
      history.push('/chats')
      return;
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: "top-right"
      })
      setLoading(false)
      return;
    }
  };

  return (
    <VStack mt="10px" spacing={4}>
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input name="name" placeholder="Enter your name" onChange={handleChange} />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input name="email" placeholder="Enter your email" onChange={handleChange} />
      </FormControl>

      <FormControl id="password" isRequired>
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

      <FormControl id="confirm-password" isRequired>
        <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
        <Input
          name="confirmPassword"
          type={"password"}
          placeholder="Confirm your password"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="avatar">
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <Input
          name="avatar"
          type={"file"}
          p={1}
          accept="image/*"
          onChange={(e) => handleAvatar(e.target.files[0])}
        />
      </FormControl>

      <Button isLoading={loading} onClick={handleSubmit} w="100%" colorScheme="blue">
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
