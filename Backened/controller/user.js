const express=require("express");
const mongoose=require("mongoose");
const User = require("../models/user.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
console.log("hi i ama t controller page");
const signup=async(req,res)=>{
    try{ const{username,email,password}=req.body;
    const newuser=await User.findOne({email:req.body.email});
    if(newuser){return res.status(400).json({message:"you already registered",})}
    const hashPassword=await bcrypt.hash(password,10);
    const createdUser=new User({username:username,email:email,password:hashPassword});
    await createdUser.save();
    res.status(200).json({message:"userCreated successfully",user:{
        _id:createdUser._id,
        username:createdUser.username,
        email:createdUser.email,
    }});
} catch(err){
   console.log("error->",err);
   res.status(500).json({message:"server error"});
    }
}
const login=async(req,res)=>{
try{ const {email,password}=req.body;
  const existuser=await User.findOne({email});
  console.log(existuser)
  if(!existuser){
    return res.status(400).json({message:"invalid credentials"});
  }
  const isMatch=await bcrypt.compare(password,existuser.password);
  console.log(isMatch);
    if(!isMatch) {return res.status(400).json({message:"invalid credentials"});}
    else{ res.status(200).json({message:"login successfull",user:{
      _id:existuser._id,
      username:existuser.username,
      email:existuser.email,
       
    }})
    }
}catch(err){
    console.log("error->",err);
     return res.status(500).json({message:"server error"});
}

}
module.exports={signup,login};