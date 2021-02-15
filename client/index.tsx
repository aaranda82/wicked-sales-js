import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { createGlobalStyle } from "styled-components";
import { ColorScheme } from "./ColorScheme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${ColorScheme.background};
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.querySelector("#root"),
);
