import React from "react";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [role, setrole] = useState("user");
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2 `}
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>

        <p className="text-gray-600 mb-8">
          {" "}
          Create your account to get started with delicious food deliveries
        </p>
        <div className="mb-4">
          {/* Full Name */}
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            className="w-full px-3 py-2 mt-1 mb-4 rounded-lg  border focus:outline-none "
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 mt-1 mb-4 rounded-lg  border focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            placeholder="Enter your mobile number"
            className="w-full px-3 py-2 mt-1 mb-6 rounded-lg  border focus:outline-none "
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter your password"
              className="w-full px-3 py-2 pr-10 rounded-lg  border focus:outline-none"
              style={{ border: `1px solid ${borderColor}` }}
            />
            <button
              className='absolute right-3 cursor-pointer top-[15px] text-grey-500'
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? <IoMdEye /> : <IoEyeOffSharp />}
            </button>
          </div>
          </div>
          {/* role */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-1"
            >
              Role
            </label>
            <div className="flex gap-2">
                {["user","owner","deliveryBoy"].map((r)=>(
                   <button className="flex-1 border rounded-lg px-3 py-2 text-center
                    font-medium transition-colors">{r}</button>
                ))}


            </div>
          </div>
        </div>
      </div>
    
  );
}

export default SignUp;
