import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import {ClipLoader} from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice.js";


function SignUp() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch( );

const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
// signup krne ke liye handleSignUp function use kr rhe h jo ki axios ka use krke backend ke signup 
// route ko call krta h aur user ka data waha bhejta h taki user register
//  ho jaye aur usko token mile jisse wo login rhega
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, mobile, password, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setError("");
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  // google se signup krne ke liye handleGoogleAuth function use kr rhe h
  //  jo ki firebase ke GoogleAuthProvider ka use krke google se authentication 
  // create krta h aur uske baad backend ke google-auth route ko call krta h jisme user ka data bhejta h taki user register ho 
  // jaye ya login ho jaye
  const handelGoogleAuth=async()=>{
    if(!mobile){
      return setError("Mobile number is required to sign up with Google");
    }
    const provider = new GoogleAuthProvider();
    
      const result = await signInWithPopup(auth, provider);
      
     try {
      const {data}= await axios.post(`${serverUrl}/api/auth/google-auth`,{
        fullName:result.user.displayName,
        email:result.user.email,
        role,
        mobile
      },{withCredentials:true});
      dispatch(setUserData(data));
      
     } catch (error) {
      console.log(error);
      
     }
    
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>

        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            value={fullName} required
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            value={email} required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            value={mobile} required
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 pr-10 rounded-lg border focus:outline-none"
              style={{ border: `1px solid ${borderColor}` }}
              value={password} required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <IoMdEye /> : <IoEyeOffSharp />}
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Role
          </label>

          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                type="button"
                className="flex-1 rounded-lg px-3 py-2 font-medium transition-colors"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? {
                        backgroundColor: primaryColor,
                        color: "white",
                        border: `1px solid ${primaryColor}`,
                      }
                    : {
                        border: `1px solid ${borderColor}`,
                        backgroundColor: "transparent",
                        color: "#333",
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">*{error}</p>
        )}

        {/* Sign Up Button */}
        <button
          className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 cursor-pointer"
          style={{ backgroundColor: primaryColor, color: "white" }}
          onClick={handleSignUp} disabled={loading}>
          {loading ? <ClipLoader size={20} color='white' /> : "Sign Up"}
        </button>
        

        {/* Google Button */}
        <button className="w-full mt-4 font-semibold border border-gray-400 rounded-lg px-4 py-2 transition duration-200 hover:bg-gray-100 cursor-pointer flex 
        items-center justify-center gap-2" onClick={handelGoogleAuth}>
          <FcGoogle size={20} />
          Sign Up with Google
        </button>

        {/* Sign In */}
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-[#ff4d4d]">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp; 