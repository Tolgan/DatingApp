import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./components/context/UserContext.js";

import AppRouter from "./AppRouter.js";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AppRouter />
    </UserProvider>
  </React.StrictMode>,
  rootElement
);
