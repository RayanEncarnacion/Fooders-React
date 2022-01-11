import React from "react";
import ReactDOM from "react-dom";
import SearchContextProvider from "./store/search-store";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
