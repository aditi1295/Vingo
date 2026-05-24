import React from 'react';
import Nav from './Nav';
import { useRef } from 'react';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { categories } from '../category';
import CategoryCard from './CategoryCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';


function UserDashboard() {
    const cateScrollRef = useRef();
     const shopScrollRef = useRef()
const { currentCity,shopsInMyCity,itemsInMyCity } = useSelector((state) => state.user );
     const [showLeftCateButton,setshowLeftCateButton]=useState(false);
        const [showRightCateButton,setshowRightCateButton]=useState(true);
         const [showLeftShopButton,setshowLeftShopButton]=useState(false);
        const [showRightShopButton,setshowRightShopButton]=useState(true);
     const updateButton=(ref,setLeftButton,setRightButton)=>{
        const element=ref.current;
        if(element){
            setLeftButton(element.scrollLeft>0);
            setRightButton(element.scrollWidth>element.clientWidth+element.scrollLeft);


     }
    }
    const scrollHandeler=(ref,direction)=>{
        if(ref.current){
            ref.current.scrollBy({
                left:direction=="left"?-200:200,
                behavior:"smooth"
            })  
        }
    }
    useEffect(()=>{
        if(cateScrollRef.current){
            updateButton(cateScrollRef,setshowLeftCateButton,setshowRightCateButton);
            updateButton(shopScrollRef,setshowLeftShopButton,setshowRightShopButton);
        cateScrollRef.current.addEventListener("scroll",()=>{

            updateButton(cateScrollRef,setshowLeftCateButton,setshowRightCateButton);
           

        })
        shopScrollRef.current.addEventListener("scroll",()=>{

            updateButton(shopScrollRef,setshowLeftShopButton,setshowRightShopButton);
           

        })
    }

    },[])
    return ( 
        <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f9]
         overflow-y-auto'>
            <Nav/>
            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h1>
                <div className='w-full relative'>
                    {showLeftCateButton &&
                            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d]
                            text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandeler(cateScrollRef, "left")}   >
                            <FaChevronCircleLeft />
                            </button>}
                    <div className='w-full flex overflow-x-auto gap-4 pb-2 ' ref={cateScrollRef}>
                    {categories.map((cat,index) => (
                        <CategoryCard name={cat.category} image={cat.image} key={index}/>
                    ))}
                    </div>
                    {showRightCateButton && (
                        <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d]
                        text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandeler(cateScrollRef, "right")}   >
                           <FaChevronCircleRight  />
                        </button>
                    )}
                </div>


            </div>
            {/* shops */}
            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
               <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shop In {currentCity}</h1>  
                 
                <div className='w-full relative'>
                    {showLeftShopButton &&
                            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d]
                            text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandeler(shopScrollRef, "left")}   >
                            <FaChevronCircleLeft />
                            </button>}
                    <div className='w-full flex overflow-x-auto gap-4 pb-2 ' ref={shopScrollRef}>
                    {shopsInMyCity?.map((shop, index) => (
                        <CategoryCard name={shop.name} image={shop.image} key={index}/>
                    ))}
                    </div>
                    {showRightShopButton && (
                        <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d]
                        text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandeler(shopScrollRef, "right")}   >
                           <FaChevronCircleRight  />
                        </button>
                    )}
                </div>


            </div>
            <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Suggested Food Items</h1>

                <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
                    {itemsInMyCity?.map((item,index)=>(
                        <FoodCard key={index} data={item}/>
                    ))}

                </div>

            </div>
            </div>
        
     );

}

export default UserDashboard;