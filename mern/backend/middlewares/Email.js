import {transporter} from "./Email.config.js"
import { Verification_Email_Template, Welcome_Email_Template } from "./Emailtemplate.js";

export const sendverificationcode =async(email,verificationcode)=>{
    try {
        const response = await transporter.sendMail({
    from: '"cloudmate technologies llp" <het@voicenova.ai>',
    to: email,
    subject: "verify your email",
    text: "verfiy your email", 
    html: Verification_Email_Template.replace("{verificationCode}",verificationcode), 
  });   
  console.log("email send sucessfully ",response)
    } catch (error) {
        console.log("email error",error)
    }

}
export const welcomeemail =async(email,name)=>{
    try {
        const response = await transporter.sendMail({
    from: '"cloudmate technologies llp" <het@voicenova.ai>',
    to: email,
    subject: "welcome email",
    text: "welcome email", 
    html: Welcome_Email_Template.replace("{name}",name), 
  });   
  console.log("email send sucessfully ",response)
    } catch (error) {
        console.log("email error",error)
    }
}