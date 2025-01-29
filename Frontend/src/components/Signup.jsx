import React from "react";
import { Link, Navigate,useNavigate,useLocation} from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
 import axios from "axios";
 import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";
import axiosInstance from '../service';
export default function Signup() { 
  const [authUser,setAuthUser]=useAuth()
  const location=useLocation();
  const navigate=useNavigate();
  const from=location.state?.from?.pathname || "/alltask";
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit=handleSubmit(async(data)=>{ 
    const userInfo={
      username:data.username,
      password:data.password,
      email:data.email,
    }
    await  axiosInstance.post("/user/signup", userInfo)
    .then((res)=>{console.log(res.data);
       if(res.data){
        toast.success("signup successfully");
        console.log("res.data.user->",res.data.user);
        localStorage.setItem("User",JSON.stringify(res.data.user));
        localStorage.setItem("reloadAfterSignup", "true"); // Set the flag
        navigate("/alltask");
        document.getElementById("my_modal_2").close();
        setTimeout(()=>{window.location.reload();},1000);
        }
        
        
    })
    .catch((err)=>{
      if(err.response){
        console.log(err);
        toast.error("error ->"+err.response.data.message);
      }
    });
  })
  return (<>
    <div>
      <div id="my_modal_2" className="h-screen items-center flex justify-center">
        <div className="modal-box">
          <form  onSubmit={handleSubmit(onSubmit)} method="dialog" >
            {/* if there is a button in form, it will close the modal */}
            <Link to="/alltask"> <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_2").close()}>✕</button>
            </Link>
            <h1 className="font-bold text-4xl text-center">Signup</h1>
            <div className="mt-2 px-4 py-1">
              <h3 className="mb-1">Name</h3>
              <input type="text" placeholder="Enter name" className="w-80 mt-3 outline-none bg-white-300"
                {...register("username", { required: true })} ></input>
              <br></br><p className="text-red-600 mt-2">{errors.text && <span>This field is required</span>}</p>
            </div>
            <div className="mt-2 px-4 py-1">
              <h3 className="mb-1">Email</h3>
              <input type="email" placeholder="Enter email" className="w-80 mt-3 outline-none bg-white-300"
                {...register("email", { required: true })} ></input>
              <br></br><p className="text-red-600 mt-2">{errors.email && <span>This field is required</span>}</p>
            </div>
            <div className="mt-2 px-4 py-1">
              <h3 className="mb-1">Password</h3>
              <input type="password" placeholder="Enter password" className="w-80 mt-3 outline-none bg-white-300"
                {...register("password", { required: true })} ></input>
              <br></br><p className="text-red-600 mt-2">{errors.password && <span>This field is required</span>}</p>
            </div>
            <div className="flex flex-cols-1 md:flex-cols-2 px-4 py-1 justify justify-between mt-3">
              <div><button className="btn btn-primary">Signup</button></div>
                
            </div>
          </form>
        </div>
      </div>
    </div>
  </>)
}
