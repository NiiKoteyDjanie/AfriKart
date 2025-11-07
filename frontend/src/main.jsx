import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthContext from "./context/AuthContext.jsx";
import UserContext from "./context/UserContext.jsx";
import "./index.css"; //
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <UserContext>
          <App />
        </UserContext>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
