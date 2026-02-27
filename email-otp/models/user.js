import mongoose from "mongoose";

const user=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    
    name:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    isverfied:{
        type:Boolean,
        default:false
    },  
    verificationcode:String


},{timestamps:true})

export const usermodal =mongoose.model("e-user",user)