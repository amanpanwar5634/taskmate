const express=require("express");
require("dotenv").config();
require("./connectdb");
const app=express();
const port=1000;
const cors=require("cors");
console.log(process.env.FRONTEND_URL)
app.use(cors({
  origin: process.env.FRONTEND_URL, // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'id'], // Allow custom header 'id'
  credentials: true, // If you're using cookies or sessions
}));

app.options('*', cors()); 
app.use(express.json());
const userRouter=require("./route/user.js");
const taskRouter=require("./route/task.js");
app.get("/",(req,res)=>{
    res.send("hi i am on the home page");
})
app.use("/user",userRouter); 
app.use("/task",taskRouter);
 
app.listen(port,()=>{
 console.log("app is listeneing on port");
})

