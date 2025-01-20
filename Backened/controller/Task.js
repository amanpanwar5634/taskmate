const express=require("express");
const Task = require("../models/task");
const User = require("../models/user");
const creatTask=async(req,res)=>{
    try{ const {id}=req.headers;
       const {title,description}=req.body;
       console.log("req.body->",req.body);
       console.log("req.header->",req.headers)
      const newTask=new Task({title:title,description:description});
      const savedTask=await newTask.save();
      console.log("saved Task",savedTask);
      const TaskId=savedTask._id;
       const updateduser=await User.findByIdAndUpdate(id,{$push:{tasks:TaskId._id}});
       res.status(200).json({message:"new task created",taskcreated:savedTask,user:updateduser});
    }catch(err){
      console.log("error->",err);
       res.status(500).json({message:"server error"}); 
    }
}
const allTask=async(req,res)=>{
  try{
    const {id}=req.headers;
    const existUser=await User.findById(id).populate("tasks");
    res.status(200).json({userData:existUser});
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"internal server error"});
  }
}
const deleteTask=async(req,res)=>{
  try{ const {id}=req.params;
     const userId=req.headers.id;
     const deletedTask=await Task.findByIdAndDelete(id);
     await User.findByIdAndUpdate(userId,{$pull:{tasks:id}});
     res.status(200).json({message:"successfully deleted",deletedOne:deletedTask});
  }catch(err){
     console.log("error->",err);
     res.status(500).json({message:"server error"});
  }
}
const updateTask=async(req,res)=>{
  try{ const {id}=req.params;
      console.log("req.body->",{...req.body});
     const updatedTask=await Task.findByIdAndUpdate(id,{ ...req.body }, { new: true });
     res.status(200).json({message:"successfully updated",UpdatedOne:updatedTask});
  }catch(err){
     console.log("error->",err);
     res.status(500).json({message:"server error"});
  }
}
 
module.exports ={creatTask,allTask,deleteTask,updateTask};