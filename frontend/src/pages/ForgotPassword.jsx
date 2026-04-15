import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch( );
  
  // seterroruse kiya hai taki jo button ke upper red me show ho jaye agra koi field khali chod di ho ya koi 
// aur error aa jaye to wo user ko pata chal jaye ki
//  kya problem hai, jaise ki email format sahi nahi hai ya password match nahi kar rahe hai, etc.

// setloading use kiya hai taki jab user
//  button pe click kare to button disable ho jaye aur 
// uske jagah loading spinner show ho jaye taki user ko pata 
// chal jaye ki kuch process ho raha hai aur wo wait kare, aur jab process complete ho jaye to
//  loading spinner chala jaye aur button wapas enable ho jaye.
  
  const handleSendOtp=async()=>{
    setLoading(true);
    try {
      const result= await axios.post(`${serverUrl}/api/auth/send-otp`,{email},
      {withCredentials:true});
      dispatch(setUserData(result.data));
      setError("");
      setStep(2);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
      setLoading(false);
    }
  }
  const handleVerifyOtp=async()=>{
    setLoading(true);
    try {
      const result= await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},
      {withCredentials:true});
      dispatch(setUserData(result.data));
      setError("");
      setStep(3);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
      setLoading(false);
    }
  }
  const handleResetPassword=async()=>{
    setLoading(true);
    if(newPassword!=confirmPassword){
      setError("Passwords do not match");
      setLoading(false);
      return null;
    }
    try {
      const result= await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},
      {withCredentials:true});
      dispatch(setUserData(result.data));
     navigate("/signin");
      setError("");
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div
      className="flex item-center w-full items-center justify-center min-h-screen
         p-4  bg-[#fff9f6]"
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" />
          <h1 className="text-xl font-bold text-center text-[#ff4d2d] ">
            Forgot Password{" "}
          </h1>
        </div>
        {step === 1 &&
        
        <div>
         {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none border-gray-200"
            style={{ border: `1px solid #d1d5db` }}
            value={email} required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
         {/* Sign Up Button */}
            {error && (
          <p className="text-red-500 text-sm mb-3 text-center">*{error}</p>
        )}
        <button
          className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 
          hover:bg-[#e64323] cursor-pointer"
          style={{ backgroundColor: '#ff4d2d', color: "white" }}
          onClick={handleSendOtp}  disabled={loading} >
          {loading ? <ClipLoader size={20} color:white /> : "Send OTP"}
        </button>
        </div>
        }
        {step === 2 && <div>
         {/* otp */}
        <div className="mb-6">
          <label  htmlFor="otp"className="block text-gray-700 font-medium mb-1">
             OTP
          </label>
          <input
            type="email"
            placeholder="Enter the OTP sent to your email"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none border-gray-200"
            style={{ border: `1px solid #d1d5db` }}
            value={otp} required
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">*{error}</p>
        )}
         {/* Sign Up Button */}
        <button
          className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 
          hover:bg-[#e64323] cursor-pointer"
          style={{ backgroundColor: '#ff4d2d', color: "white" }}
          onClick={handleVerifyOtp}  disabled={loading} >
          {loading ? <ClipLoader size={20} color:white /> : "Verify"}
          
        </button>
        </div>}
        
         {step === 3 && <div>
         {/* password && confirm password */}
        <div className="mb-6 mt-4">
          <label  htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">
             New Password
          </label>
          <input
            type="email"
            placeholder="Enter New Password"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none border-gray-200"
            style={{ border: `1px solid #d1d5db` }}
            value={newPassword} required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="mb-6 mt-4">
          <label  htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
             Confirm Password
          </label>
          <input
            type="email"
            placeholder="Confirm Password"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none border-gray-200"
            style={{ border: `1px solid #d1d5db` }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">*{error}</p>
        )}
         {/* Sign Up Button */}
        <button
          className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 
          hover:bg-[#e64323] cursor-pointer"
          style={{ backgroundColor: '#ff4d2d', color: "white" }}
          onClick={handleResetPassword}  disabled={loading} >
          {loading ? <ClipLoader size={20} color='white' /> : "Reset Password"}
        
          
        </button>
        </div>}
      </div>
    </div>
    
  );
}

export default ForgotPassword;
