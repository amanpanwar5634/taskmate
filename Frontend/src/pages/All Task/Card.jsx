import React, { useState } from "react";
import EditForm from "../EditTask/EditForm";
import { useAuth } from "../../components/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast"
import axiosInstance from "../../service";
export default function ({ item}) {
   const [authUser,setAuthUser]=useAuth();
   //for deletion
   const deleteTask=async()=>{ 
    await axiosInstance.delete(`/task/deletetask/${item._id}`,{headers: {id: authUser._id }})
  .then((res)=>{console.log(res.data.deletedOne);
   if(res.data.deletedOne){
    toast.success("Task deleted successfully");
    setTimeout(()=>{window.location.reload();},1000);
   }})
.catch((err)=>{
  if(err.response){
    console.log(err);
    toast.error("error ->"+err.response.data.message);
  }}); };

  const [isComplete, setIsComplete] = useState(item.complete === 'true');
  const date = new Date(item.createdAT);
  const formattedDate = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const fullFormattedDate = `${formattedDate}`;
  const buttonClass = isComplete ? 'btn-success' : 'btn-error';
  const toggleCompletion = () => {
    setIsComplete(prevState => !prevState); 
  };

  return (
    <>
      <div className="mt-3 mb-3 p-3">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mx-auto">{item.title}</h2>
            <hr />
            <p className="text-xl">{item.description}</p>
            <div className="card-actions flex justify-between items-center mt-4">
              <span>{fullFormattedDate}</span> {/* Display both date and time */}
              <button
                className={`btn ${buttonClass} btn-outline btn-sm`}
                onClick={toggleCompletion}  
              >
                {isComplete ? "Complete" : "Not Complete"}
              </button>
            </div>
            <div className="mt-4 flex justify-between">
              <button onClick={()=>document.getElementById('my_modal_4').showModal()} className="btn btn-primary">Edit</button>
              <EditForm taskId={item._id}/>
              <button onClick={deleteTask} className="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
