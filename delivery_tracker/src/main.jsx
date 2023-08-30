import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    body: "'Didact Gothic', sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
