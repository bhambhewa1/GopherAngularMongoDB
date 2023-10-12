require("dotenv").config();
const { userModel } = require("../../Models/Student");

const RegisterationPhoneOTP = async (userId) => {
 try{
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    
 }catch(err){
    console.log(err)
 }
}

module.exports = {RegisterationPhoneOTP}