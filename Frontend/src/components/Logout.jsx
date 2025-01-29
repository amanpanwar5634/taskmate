import React from "react";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";
export default function Logout(){
    const [authUser,setAuthUser]=useAuth();
    const handleLogout=()=>{
     try{
        setAuthUser({...authUser,user: null,});
        localStorage.removeItem("User");
        toast.success("logout successfully");
         setTimeout(()=>{window.location.reload(); 
         },1000);
        }
     catch(err){toast.error("error:"+ err.message);
     }
    }
    return (<>
    <div>
<button className=" btn btn-primary rounded text-white-600" onClick={handleLogout}>Logout</button>
    </div>
    </>)
}