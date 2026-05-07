import React, {  useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa6";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice";
import { ClimbingBoxLoader } from "react-spinners";
import axios from "axios";
import { useEffect } from "react";
import { use } from "react";

function EditItem() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
   const [currentItem,setcurrentItem]=useState(null);
  const { myShopData } = useSelector((state) => state.owner);
 const {itemId} =useParams
  const [name,SetName]=useState("");
  const [price,SetPrice]=useState( 0);
  const [frontendImage,setfrontendImage]=useState( null);
  const [backendImage,setbackendImage]=useState(null);
  const [category,setCategory]=useState("");
 
  const [foodType,setFoodType]=useState("Veg");
  const categories=["Snacks",
            "Main Course",
            "Desserts",
            "Beverages",
            "Pizza",
            "Burgers",
            "Pasta",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others",]
  const handelImage=(e)=>{
    const file=e.target.files[0];
    setbackendImage(file);
    setfrontendImage(URL.createObjectURL(file));

  }
  const handelSubmit=async(e)=>{
    e.preventDefault();
    try{
      const formData=new FormData()
      formData.append("name",name)
      formData.append("price",price)
        formData.append("category",category)
        formData.append("foodType",foodType)
      if(backendImage){
        formData.append("image",backendImage)
      }
      const result=await axios.post(`${serverUrl}/api/item/add-item`,formData,
        {withCredentials:true})
        dispatch(setMyShopData(result.data))
        console.log(result.data);
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    const handelGetItemById=async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/item/get-by-id/${itemId}`,
            {withCredentials:true})
            
           
            setcurrentItem(result.data);
        } catch (error) {
            console.log(error);
        }

    }
    handelGetItemById();
  },[itemId])

  useEffect(()=>{
    if(currentItem){
        SetName(currentItem.name);
        SetPrice(currentItem.price);
        setCategory(currentItem.category);
        setFoodType(currentItem.foodType);
        setfrontendImage(currentItem.image);
    }
  },[currentItem])

  return (
    <div
      className="flex justify-center flex-col items-center p-6 bg-gradient-to-br
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
            Edit Food Item
          </div>
        </div>
        <form className="space-y-5" onSubmit={handelSubmit}>
            <div >
                <label className="block text-gray-700 font-medium mb-1 text-sm"> Food Name
                </label>
                <input type="text" placeholder="Enter food name" className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500" onChange={(e)=>SetName(e.target.value)} value ={name}/>
            </div>
        <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm"> Food Image
                </label>
                <input type="file" accept="image/*" className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500"  onChange={handelImage}/>
                 {frontendImage &&
                 <div className="mt-4">
                  <img src={frontendImage} alt="" className="w-full h-48 object-cover
                  rounded-lg border"/>
                 </div>}
         </div>
         <div >
                <label className="block text-gray-700 font-medium mb-1 text-sm">Price
                </label>
                <input type="number" placeholder="0" className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500" onChange={(e)=>SetPrice(e.target.value)} value ={price}/>
            </div>
            <div >
                <label className="block text-gray-700 font-medium mb-1 text-sm">Select Category
                </label>
                <select  className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500" onChange={(e)=>setCategory(e.target.value)} value ={category}>
                  <option value="">
                    Select Category </option>
                        {categories.map((cat,index)=>(<option
                         value={cat} key={index}>{cat}</option>))}
                </select>
            </div>
             <div >
                <label className="block text-gray-700 font-medium mb-1 text-sm">Select Food Type
                </label>
                <select  className="w-full border rounded-lg px-4 py-2 focus:outline-none
                 focus:ring-2 focus:ring-orange-500" onChange={(e)=>setFoodType(e.target.value)} value ={foodType}>
                  <option value="Veg">
                    Veg </option>
                    <option value="Non-Veg">
                    Non-Veg </option>
                </select>
            </div>
          
            <button className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg
            font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all
            duration-200 cursor-pointer" >
                Save
            </button>
            </form>
      </div>
    </div>
  );
}
export default EditItem;
