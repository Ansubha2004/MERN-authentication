import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Conected to mongodb")
})
.catch((err)=>{
    console.log("Error connecting to mongodb",err)
})