const express= require("express")
const mongoose=require("mongoose")
// const usermodal=require('./modals/user')
const app=express();


app.use(express())



async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://het:het123@het-db.oqnjxof.mongodb.net/?appName=het-db");
    console.log("mongoDB Connected Successfully");

    console.log("Database Name:", mongoose.connection.name);

  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
}

connectDB();
const userschema=mongoose.Schema({
    name:String,
    email:String
})

const demo= mongoose.model('demo',userschema)

demo.create({ name: "Test" });
app.get("/",async(req,res)=>{
 res.json({msg:"this is test"})
})




app.listen(8080)