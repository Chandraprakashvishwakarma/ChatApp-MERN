import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading ,setLoading] = useState(false);
    const signup = async ({fullname,username,password,confirmPassword,gender})=>{
        const success = validateInputs({fullname,username,password,confirmPassword,gender});
        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({fullname,username,password,confirmPassword,gender})
            })

            const data = await res.json();
            console.log(data);

        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,signup};

}
 

export default useSignup

function validateInputs({fullname,username,password,confirmPassword,gender}){
    if(!fullname || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill all fields!');
        return  false;
    }

    if(password !== confirmPassword){
        toast.error('Password do not match!');
        return false;
    }

    if(password.length<6){
        toast.error('Password must be atleast 6 character');
        return false;
    }

    return true;
}