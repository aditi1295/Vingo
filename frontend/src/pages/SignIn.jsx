import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
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
  const handelGoogleAuth = async () => {

    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    try {
      const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {

        email: result.user.email,

      }, { withCredentials: true });
      dispatch(setUserData(data));


    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong with Google Sign In");

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
          Sign In to  your account to get started with delicious food deliveries
        </p>



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
        <div className='text-right mb-4  text-[#ff4d2d] font-medium cursor-pointer' onClick={() =>
          navigate("/forgotPassword")
        }>
          Forgot Password
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">*{error}</p>
        )}

        {/* Sign Up Button */}
        <button
          className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 cursor-pointer"
          style={{ backgroundColor: primaryColor, color: "white" }}
          onClick={handleSignIn} disabled={loading}>
          {loading ? <ClipLoader size={20} color='white' /> : "Sign In"}
        </button>

        {/* Google Button */}
        <button className="w-full mt-4 font-semibold border border-gray-400 rounded-lg px-4 py-2
         transition duration-200 hover:bg-gray-100 cursor-pointer flex items-center
          justify-center gap-2" onClick={handelGoogleAuth}>
          <FcGoogle size={20} />
          Sign In with Google
        </button>

        {/* Sign In */}
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create an account?{" "}
          <span className="text-[#ff4d4d]">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn; 