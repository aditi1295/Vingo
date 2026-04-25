import React, { use } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa6";

function CreateEditShop() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const [name,Setname]=useState(myShopData ? myShopData.name : "");
  const [address,Setaddress]=useState(myShopData ? myShopData.address : "");
  const [city,Setcity]=useState(myShopData ? myShopData.city : "");
  const [state,Setstate]=useState(myShopData ? myShopData.state : "");
  return (
    <div
      className="flex justify-center flex-col items-center p-6 bg-gradiant-to-br
        from-orange-50 relative to-white min-h-screen"
    >
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong size={35} className="text-[#ff4d2d]" />
      </div>
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
    <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-400 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {myShopData ? "Edit Shop " : "Add Shop"}
          </div>
        </div>
        <form className="space-y-5">
            <div >
                <label className="block text-gray-700 font-medium mb-1 text-sm"> Shop Name
                </label>
                <input type="text" placeholder="Enter your shop name" className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500"/>
            </div>
        <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm"> Shop Image
                </label>
                <input type="file" accept="image/*" className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500"/>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm"> City
                </label>
                <input type="text" placeholder=" City" className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500"/>
                </div>
                <div><label className="block text-gray-700 font-medium mb-1 text-sm"> State
                </label>
                <input type="text" placeholder=" State" className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500"/></div>
            </div>
             <div >
                <label className="block text-gray-700 font-medium mb-1 text-sm"> Shop Address
                </label>
                <input type="text" placeholder="Enter Shop Address" className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500"/>
            </div>
            <button className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg
            font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all
            duration-200 cursor-pointer">
                Save
            </button>
            </form>
      </div>
    </div>
  );
}
export default CreateEditShop;
