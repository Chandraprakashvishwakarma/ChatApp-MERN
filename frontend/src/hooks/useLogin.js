import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useLogin = ()=>{
    const [loading ,setLoading] = useState(false);

    const {setAuthUser} = useAuthContext();
    const login = async (username,password)=>{
        
        try {
            const success = handleInputs(username,password);
            if(!success) return;
            setLoading(true);
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            })

            const data = await res.json();

            if(data.error) throw new Error(data.error);

            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
            toast.success("Logged in successfully.")
            
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,login};
}

export default useLogin;


const handleInputs = (username,password)=>{
    if(!username || !password){
        toast.error("Please fill all fields.")
        return false;
    }
    return true;
}