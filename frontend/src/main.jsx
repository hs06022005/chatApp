import React from "react";
import ReactDOM from "react-dom/client";
import { ChatProvider } from "./context/ChatContext";
import { SocketProvider } from "./context/SocketContext";

import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
          <SocketProvider>
            <App />
        </SocketProvider>
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>
);