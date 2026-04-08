import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  return (
    <div
      className="flex item-center w-full items-center justify-center min-h-screen
         p-4  bg-[#fff9f6]"
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4" mb-4>
          <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" />
          <h1 className="text-xl font-bold text-center text-[#ff4d2d] ">
            Forgot Password{" "}
          </h1>
        </div>
        {step == 1 &&
        
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
         {/* Sign Up Button */}
        <button
          className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 
          hover:bg-[#e64323] cursor-pointer"
          style={{ backgroundColor: '#ff4d2d', color: "white" }}
          
        >
          Send OTP
        </button>
        </div>
        }
        {step == 2 && <div>
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
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
         {/* Sign Up Button */}
        <button
          className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 
          hover:bg-[#e64323] cursor-pointer"
          style={{ backgroundColor: '#ff4d2d', color: "white" }}
          
        >
          Verify 
        </button>
        </div>}
        
         {step == 3 && <div>
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
            value={newPassword}
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
         {/* Sign Up Button */}
        <button
          className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 
          hover:bg-[#e64323] cursor-pointer"
          style={{ backgroundColor: '#ff4d2d', color: "white" }}
          
        >
          Reset Password
        </button>
        </div>}
      </div>
    </div>
    
  );
}

export default ForgotPassword;
