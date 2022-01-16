import { Container } from "@chakra-ui/react";
import React from "react";
import Auth from "../Auth/Auth";

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Auth/>
    </Container>
  );
};

export default Home;
