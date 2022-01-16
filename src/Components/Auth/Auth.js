import React from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import "./Auth.css";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";

const Auth = () => {
  return (
    <Box
      bg="#f3f3f3"
      color="#333"
      p={8}
      mt="5%"
      mb="5%"
      w="100%"
      d="flex"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={"lg"}
      boxShadow="dark-lg"
    >
      <Text
        d="inline-block"
        fontSize="2rem"
        fontFamily={"Roboto Slab"}
        color="#ff3f6c"
      >
        V
        <Text d="inline-block" color="#333">
          Chat
        </Text>
      </Text>
      <Box mt="30px" w="100%">
        <Tabs variant={"soft-rounded"} colorScheme="orange">
          <TabList>
            <Tab className="tab" w="50%" color="#333">
              Sign In
            </Tab>
            <Tab className="tab" w="50%" color="#333">
              Sign Up
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Signin />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Auth;
