const mongoose=require("mongoose");
const TaskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    createdAT:{type:Date,default:Date.now()},
    complete:{type:Boolean,default:false},
});
module.exports=mongoose.model("Task",TaskSchema);