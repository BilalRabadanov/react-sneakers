import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "macro-css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
  rootElement
);
