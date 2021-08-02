import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authContext/AuthContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
