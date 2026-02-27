import mongoose from "mongoose"

export const dbcon=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("connected")
    } catch (error) {
        console.log("connection error")
    }
}