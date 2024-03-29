import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
   const [inputs, setInputs] = useState({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
   });

   const [showPassword, setShowPassword] = useState("password");

   const { loading, signup } = useSignup();

   const handleSubmit = async (e) => {
      e.preventDefault();
      await signup(inputs);
   };

   const handleCheckboxChange = (gender) => {
      setInputs({ ...inputs, gender });
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
         <div className="w-full p-6 bg-red-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
               Sign Up <span className="text-blue-500"> ChatApp</span>
            </h1>

            <form onSubmit={handleSubmit}>
               <div>
                  <label className="p-2 label">
                     <span className="text-base label-text">Full Name</span>
                  </label>
                  <input
                     type="text"
                     placeholder="John Doe"
                     className="w-full h-10 input input-bordered"
                     value={inputs.fullname}
                     onChange={(e) => {
                        setInputs({ ...inputs, fullname: e.target.value });
                     }}
                  />
               </div>

               <div>
                  <label className="p-2 label ">
                     <span className="text-base label-text">Username</span>
                  </label>
                  <input
                     type="text"
                     placeholder="johndoe"
                     className="w-full h-10 input input-bordered"
                     value={inputs.username}
                     onChange={(e) => {
                        setInputs({ ...inputs, username: e.target.value });
                     }}
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
                     value={inputs.password}
                     onChange={(e) => {
                        setInputs({ ...inputs, password: e.target.value });
                     }}
                  />
               </div>

               <div>
                  <label className="label">
                     <span className="text-base label-text">
                        Confirm Password
                     </span>
                  </label>
                  <input
                     type={showPassword}
                     placeholder="Confirm Password"
                     className="w-full h-10 input input-bordered"
                     value={inputs.confirmPassword}
                     onChange={(e) => {
                        setInputs({
                           ...inputs,
                           confirmPassword: e.target.value,
                        });
                     }}
                  />
               </div>
               <div className="flex">
                  <label className="cursor-pointer label">
                     <input
                        type="checkbox"
                        className="checkbox"
                        onChange={()=>{}}
                        checked={showPassword !== "password"}
                        onClick={() => handleShowPassword()}
                     />
                     <span className="mx-2 label-text">Show password</span>
                  </label>
               </div>

               <GenderCheckbox
                  onCheckboxChange={handleCheckboxChange}
                  selectedGender={inputs.gender}
               />

               <Link
                  className="inline-block mt-2 text-sm hover:underline hover:text-blue-600"
                  to={"/login"}>
                  Already have an account?
               </Link>

               <div>
                  <button className="mt-2 bg-blue-700 border btn btn-block btn-sm border-slate-700">
                     Sign Up
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};
export default SignUp;
