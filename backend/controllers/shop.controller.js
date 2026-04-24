import uploadOnCloudinary from "../utils/cloudinary.js";
import Shop from "../models/ShopModel.js";

//shop agar h to update krna hai nhi to create krna hai

export  const createEditShop = async(req,res)=>{
    try {
        const {name,city,state,address}=req.body;
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        let shop=await Shop.findOne({owner:req.user._id});
        if(!shop){
           shop=await Shop.create({
            name,
            city,
            state,
            address,
            image,
            owner:req.user._id,
        })
        }
        else{ 
             //update shop
            shop=await Shop.findByIdAndUpdate(shop._id,{
            name,
            city,
            state,
            address,
            image,
            owner:req.user._id,
        },{new:true})
        }
      await shop.populate('owner');
        res.status(201).json(shop)
    } catch (error) {
        return res.status(500).json({message:`create shop error ${error.message}`})
    
    }
}
export const getMyShop=async(req,res)=>{
    try {
        const shop=await Shop.findOne({owner:req.user._id}).populate('owner items');
        if(!shop){
            return res.status(404).json({ message: "Shop not found" });
        }
        return res.status(200).json(shop);
    } catch (error) {
        return res.status(500).json({message:`get  my shop error ${error.message}`})
        
    }
}