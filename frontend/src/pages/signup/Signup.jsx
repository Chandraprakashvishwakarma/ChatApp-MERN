import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import toast from "react-hot-toast";

const SignUp = () => {
   const [inputs, setInputs] = useState({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
   });

   const { loading, signup } = useSignup();

   const handleSubmit = async (e) => {
      e.preventDefault();
      await signup(inputs);
   };

   const handleCheckboxChange = (gender) => {
      setInputs({ ...inputs, gender });
   };

   return (
      <div className="flex flex-col items-center justify-center mx-auto min-w-96">
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
                     type="password"
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
                     type="password"
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
