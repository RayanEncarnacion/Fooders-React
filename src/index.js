import React from "react";
import ReactDOM from "react-dom";
import SearchContextProvider from "./store/search-store";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <SearchContextProvider>
    <App />
  </SearchContextProvider>,
  document.getElementById("root")
);
