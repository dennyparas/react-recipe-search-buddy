import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/karla/400.css";
import "@fontsource/karla/700.css";
import theme from "./chakra/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
