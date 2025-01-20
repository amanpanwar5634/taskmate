import React from "react";
import {useForm} from "react-hook-form";
 import {Link} from 'react-router-dom'
import { useAuth } from "../../components/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../service";
 export default function AddForm(){
  const[authUser,setAuthUser]=useAuth();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit=handleSubmit(async(data)=>{ 
      
        const TaskInfo={
          title:data.title,
          description:data.description
        }
        await axiosInstance.post("/task/create",TaskInfo,{headers: {id: authUser._id }})
      .then((res)=>{console.log(res.data.taskcreated);
       if(res.data.taskcreated){
        toast.success("Task added successfully");
        document.getElementById("my_modal_1").close();
        setTimeout(()=>{window.location.reload();},1000);
       }
 
    })
    .catch((err)=>{
      if(err.response){
        console.log(err);
        toast.error("error ->"+err.response.data.message);
      }});
    });
    return  (
        <>
       
        <div>
    <dialog id="my_modal_1" className="modal">
   <div className="modal-box">
    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
      {/* if there is a button in form, it will close the modal */}
      <Link to="/allTask">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
     onClick={()=>document.getElementById("my_modal_1").close()} >✕</button></Link>
   
    <h1 className="font-bold text-4xl text-center">Add Task</h1>
   <div className="mt-2 px-4 py-1">
    <h3 className="mb-1">Title</h3>
    <input type="text" placeholder="Enter title" className="w-80 mt-1 outline-none bg-white-300"
    {...register("title", { required: true })} ></input>
     <br></br><p className="text-red-600 mt-2">{errors.text && <span>This field is required</span>}</p>
    </div>
    <div className="mt-2 px-4 py-1">
    <h3 className="mb-1">Description</h3>
    <textarea type="text" placeholder="Enter description" className="w-80 mt-1 outline-none bg-white-300" 
    {...register("description", { required: true })}></textarea>
     <br></br><p className="text-red-600 mt-2">{errors.text && <span>This field is required</span>}</p>
    </div>
    <div className="flex flex-cols-1 md:flex-cols-2 px-4 py-1 justify justify-between mt-3">
     <div><button className="mx-2 bg-blue-600 text-white font-bold px-4 py-1 rounded-md">Submit</button></div>
    </div>
    </form>
  </div>
</dialog>
    </div> 
       
            
       </>
    )
 }