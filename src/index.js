import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {ChakraProvider} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Store/ChatProvider";

ReactDOM.render(
  <ChatProvider>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </ChatProvider>,
  document.getElementById("root")
);
