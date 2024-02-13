import Login from "./pages/login/Login";
import "./App.css";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
