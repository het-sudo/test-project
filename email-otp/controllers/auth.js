import { use } from "react"
import { usermodal } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendverificationcode, welcomeemail } from "../middlewares/Email.js"
const register = async (req,res)=>{
    try {
       const {name,email,password} = req.body
       if(!email || !name || !password)
       {
        res.status(400).json({
            message:"all fields are required"
        })
       }

       const existuser=await usermodal.findOne({email})

       if(existuser)
        return res.status(400).json({
    message:"user already exist"
        })

        const hashedPassword=await bcrypt.hashSync(password,10)
        
        const verificationcode=Math.floor(100000 +Math.random() *900000).toString()
        const user=new usermodal({
            name,
            email,
            password:hashedPassword,
            verificationcode
        })
        await user.save()
        sendverificationcode(user.email,user.verificationcode)
        return res.status(200).json({
            sucess:true,
            message:"user registered sucessfully "
        })
    } catch (error) {
        console.log(error)
         res.status(500).json({
            message:"internal server error"
        })
    }
}

const verify = async (req, res) => {
    try {
        const { code } = req.body;

        const user = await usermodal.findOne({
            verificationcode: code
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired code"
            });
        }

        user.isverfied = true;  
        user.verificationcode = undefined;

        await user.save();
        await welcomeemail(user.email,user.name)

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
export {register,verify}