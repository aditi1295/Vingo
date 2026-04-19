//item ko add and edit karne ke liye controller
import Shop from "../models/ShopModel.js";
import { uploadOnCloudinary } from "../utils/imageUploader.js";


export const addItem=async(req,res)=>{
    try {
        const {name,category,foodType,price}=req.body;
        
        let img;
        if(req.file){
            img=await uploadOnCloudinary(req.file.path);

        }
        const shop=await Shop.findOne({owner:req.user._id});
        if(!shop){
            return res.status(404).json({
                success:false,  message:"Shop not found"
            });
        }
        const item=await shop.items.create({
            name,
            category,
            foodType,
            price,
            img,
            shop:shop._id
        });
        res.status(201).json({
            
            item
        });
    } catch (error) {
        res.status(500).json({
           
            message:`Add Item Error ${error.message}`
        });
    }
}

export const editItem=async(req,res)=>{
    try {
        const {name,category,foodType,price}=req.body;
        const {itemId}=req.params;
        let img;
        if(req.file){
            img=await uploadOnCloudinary(req.file.path);
        }
        const item=await Item.findByIdAndUpdate(itemId, { name, category,
             foodType, price, img },
             { new: true });
        if (!item) {
            return res.status(404).json({message:"Item not found" });
        }
        res.status(200).json({item });
    } catch (error) {
        res.status(500).json({
            
            message:`Edit Item Error ${error.message}`
        });
    }
}