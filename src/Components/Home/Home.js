import { Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Auth from "../Auth/Auth";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("profile"));

    if (userProfile) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Auth />
    </Container>
  );
};

export default Home;
