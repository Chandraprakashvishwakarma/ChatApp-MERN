import Login from "./pages/login/Login";
import "./App.css";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
   const { authUser } = useAuthContext();
   console.log(authUser);
   return (
      <div className="flex items-center justify-center h-screen p-4">
         <Routes>
            <Route
               path="/"
               element={authUser?<Home />:<Navigate to="/login" />}
            />
            <Route
               path="/login"
               element={authUser?<Navigate to="/"/>:<Login/>}
            />
            <Route
               path="/signup"
               element={authUser?<Navigate to="/"/>:<Signup/>}
            />
         </Routes>
      </div>
   );
}

export default App;
