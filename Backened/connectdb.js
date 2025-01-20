const mongoose=require("mongoose");
const connectdb=async()=>{
    try{
       const response=await mongoose.connect(`${process.env.MONGO_URI}`);
       if(response){
        console.log("connected to Db");
       }
    }catch(err){
      console.log("erro->",err);
    }
}
connectdb();