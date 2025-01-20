const express=require("express");
const {creatTask,allTask,deleteTask,updateTask, completeTask} = require("../controller/Task");
const router=express.Router();
router.post("/create",creatTask);
router.get("/alltask",allTask);
router.delete("/deletetask/:id",deleteTask);
router.put("/updatetask/:id",updateTask);
 
module.exports=router;