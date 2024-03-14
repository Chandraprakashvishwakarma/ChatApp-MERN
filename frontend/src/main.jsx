import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { SocketContextProvider } from "./contexts/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <AuthContextProvider>
            <SocketContextProvider>
               <App />
            </SocketContextProvider>
         </AuthContextProvider>
      </BrowserRouter>
      <Toaster />
   </React.StrictMode>
);
