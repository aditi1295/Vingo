import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

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

  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, mobile, password, role },
        { withCredentials: true }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

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
            value={fullName}
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
            value={email}
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
            value={mobile}
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
              value={password}
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

        {/* Sign Up Button */}
        <button
          className="w-full font-semibold rounded-lg px-4 py-2 transition duration-200 cursor-pointer"
          style={{ backgroundColor: primaryColor, color: "white" }}
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        {/* Google Button */}
        <button className="w-full mt-4 font-semibold border border-gray-400 rounded-lg px-4 py-2 transition duration-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center gap-2">
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