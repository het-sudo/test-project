const mongoose=require("mongoose")


mongoose.connect("mongodb+srv://het:het123@het-db.oqnjxof.mongodb.net/?appName=het-db")
.then(()=>{console.log("connection sucessfull")})
.catch((err)=>{console.log(err.message)})


const userschema=mongoose.Schema({
    name:String,
    email:String
})

const user=mongoose.model('demo',userschema)

module.exports=user