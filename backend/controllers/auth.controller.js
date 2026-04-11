import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import { genToken } from "../utils/token.js";
import { sendOtpEmail } from "../utils/mail.js";

 export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        if (mobile.length !== 10) {
            return res.status(400).json({ message: "Mobile number must be 10 digits" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            mobile,
            role
        });

        const token = await genToken(newUser._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(201).json({ message: "User registered successfully", token });

    } catch (error) {
        return res.status(500).json({ message: `sign up error ${error.message}` });
    }
}

 export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });
        return res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        return res.status(500).json({ message: `sign in error ${error.message}` });
    }
}

 export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Log Out Successfully" });
    } catch (error) {
        return res.status(500).json({ message: `sign out error ${error.message}` });
    }
}
// send otp controller

export const sentOtp=async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        const otp=Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp=otp;
        user.otpExpiry=Date.now()+5*60*1000;
        user.isOtpVerified=false;
        await user.save();
       await  sendOtpEmail(email,otp);
       return res.status(200).json({ message: "OTP sent to email" });       
    }
    catch(error){
        return res.status(500).json({ message: `send otp error ${error.message}` });

    }

}

// otp verification ka controller
export const verifyOtp=async(req,res)=>{
    try{
   const {email,otp}=req.body;
   const user=await User.findOne({email});
   if(!user || user.resetOtp!=otp || user.otpExpiry<Date.now()){
    return res.status(400).json({ message: "Invalid or expired OTP" });
   }
   user.isOtpVerified=true;
   user.resetOtp=undefined;
   user.otpExpiry=undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });

    }
    catch(err){
        return res.status(500).json({ message: `verify otp error ${err.message}` });
    }
}
//password reset krne ke liye ek controller likha hai 

export const resetPassword=async(req,res)=>{
    try{
        const {email,newPassword}=req.body;
        const user=await User.findOne({email});
        if(!user || !user.isOtpVerified){
            return res.status(400).json({ message: "OTP verification required" });
        } 
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        user.isOtpVerified=false;
        await user.save();
        return res.status(200).json({ message: "Password reset successfully" });  
    }
    catch(err){
        return res.status(500).json({ message: `reset password error ${err.message}` });
    }
}
// google se authentication create kr rhe h signup signin  ke liye 
// agar user pehle se exist krta h to usko login krdo nhi to naya user create krdo aur usko login krdo

export const googleAuth=async(req,res)=>{
    try{
      const {fullName,email,mobile,role}=req.body;
      let user=await User.findOne({email});
      if(!user){
        user=await User.create({fullName,email,mobile,role,password:""});
      }
      const token = await genToken(user._id);
      res.cookie("token", token, {
          secure: false,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true
      });
      return res.status(200).json({ message: "User logged in successfully", token });

    }
    catch(err){
        return res.status(500).json({ message: `Google auth error ${err.message}` });
    }
}