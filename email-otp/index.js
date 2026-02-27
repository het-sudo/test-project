import express from "express"
import dotenv from "dotenv"

import { dbcon } from "./libs/db.js";
import router from "./routes/Auth.js";

dotenv.config()

var app=express();

app.use(express.json())

dbcon()
app.get("/",(req,res)=>{
    res.json({
        message:"hello  "
    })
})

app.use("/auth",router)

app.listen(process.env.PORT)


