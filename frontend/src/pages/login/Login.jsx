import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState("password");

   const { loading, login } = useLogin();

   const handleSubmit = async (e) => {
      e.preventDefault();
      await login(username, password);
   };

   const handleShowPassword = () => {
      if (showPassword === "password") {
         setShowPassword("text");
      } else {
         setShowPassword("password");
      }
   };

   return (
      <div className="flex flex-col items-center justify-center mx-auto w-[95%] h-2/3 sm:w-1/3 sm:h-[70%]">
         <div className="w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
               Login
               <span className="text-blue-500"> ChatApp</span>
            </h1>

            <form onSubmit={handleSubmit}>
               <div>
                  <label className="p-2 label">
                     <span className="text-base label-text">Username</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Enter username"
                     className="w-full h-10 input input-bordered"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  />
               </div>

               <div>
                  <label className="label">
                     <span className="text-base label-text">Password</span>
                  </label>
                  <input
                     type={showPassword}
                     placeholder="Enter Password"
                     className="w-full h-10 input input-bordered"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div className="flex">
                  <label className="cursor-pointer label">
                     <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => {}}
                        checked={showPassword !== "password"}
                        onClick={() => handleShowPassword()}
                     />
                     <span className="mx-2 label-text">Show password</span>
                  </label>
               </div>
               <Link
                  to={"/signup"}
                  className="inline-block mt-2 text-sm hover:underline hover:text-blue-600">
                  {"Don't"} have an account?
               </Link>

               <div>
                  <button className="mt-2 bg-blue-700 btn btn-block btn-sm">
                     {!loading ? (
                        "Login"
                     ) : (
                        <span className="loading loading-spinner"></span>
                     )}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};
export default Login;
