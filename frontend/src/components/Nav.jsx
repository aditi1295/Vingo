import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { useSelector } from 'react-redux';
function Nav() {
    const {userData}=useSelector(state=>state.user)
    return (
        <div className='w-full h-[80px] flex items-center justify-center gap-[30px] px-[20px] 
        fixed top-0 left-0 z-[9999] bg-[#fff9f6]'>

            <h1 className='text-3xl font-bold text-[#ff4d2d]'>Vingo</h1>

            <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg
            items-center gap-[20px] flex'>

                <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px]
                 border-gray-400 border-r-[2px]'>

                    <FaLocationDot  size={25} className=' text-[#ff4d2d]' /> 

                <div className='w-[80%] truncate text-gray-600'>jhasi</div>
                </div>

                <div className='w-[80%] flex items-center gap-[10px]'>

                      <IoIosSearch size={25} className=' text-[#ff4d2d]' />

                      <input type="text"placeholder='search delicious food ...' className='text-gray-700 outline-0 w-full'/>
                </div>
            </div>

            <div className='relative cursor-pointer'>
                <LuShoppingCart size={25} className=' text-[#ff4d2d]' />
                <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d]'>0</span>
            </div>

            <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 
            text-[#ff4d2d] text-sm font-medium'>My Order</button>

            <div className='w-[40px] h-[40px] rounded-full bg-[#ff4d2d]
             text-white flex items-center justify-center  shadow-xl cursor-pointer'>
                 {userData?.fullName.slice(0,1)}
            </div>
        </div>
    );
}

export default Nav;