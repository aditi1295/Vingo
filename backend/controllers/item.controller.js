//item ko add and edit karne ke liye controller
import Shop from "../models/ShopModel.js";
import Item from "../models/ItemModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


export const addItem=async(req,res)=>{
    try {
        const {name,category,foodType,price}=req.body;
        
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path);

        }
        const shop=await Shop.findOne({owner:req.userId});
        if(!shop){
            return res.status(404).json({
                 message:"Shop not found"
            });
        }
        const item=await Item.create({
            name,
            category,
            foodType,
            price,
            image,
            shop:shop._id
        });
        shop.items.push(item._id);
        await shop.save();
        await shop.populate('owner');
        await shop.populate({
            path:'items',
            options:{sort:{updatedAt:-1}}
            });
       
        res.status(201).json(shop);
    } catch (error) {
        res.status(500).json({
           
            message:`Add Item Error ${error.message}`
        });
    }
}

export const editItem=async(req,res)=>{
    try {
        const { itemId } = req.params;
        const {name,category,foodType,price}=req.body;
        
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path);
        }
        const updateData = { name, category, foodType, price };
        if (image) {
            updateData.image = image;
        }
        const item=await Item.findByIdAndUpdate(itemId, updateData, { new: true });
        if (!item) {
            return res.status(404).json({message:"Item not found" });
        }
        const shop=await Shop.findOne({owner:req.userId}).populate({
            path:'items',
            options:{sort:{updatedAt:-1}}
        });
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({
            
            message:`Edit Item Error ${error.message}`
        });
    }
}

export const getItemById=async(req,res)=>{
    try {
        const { itemId } = req.params;
        const item=await Item.findById(itemId);
        if(!item){
            return res.status(404).json({
                message:"Item not found"
            });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({
            message:`Get Item Error ${error.message}`
        });
    }
}
export const deleteItem=async(req,res)=>{
    try {
        const { itemId } = req.params;
        const item=await Item.findByIdAndDelete(itemId);
        if(!item){
            return res.status(404).json({
                message:"Item not found"
            });
        }
        const shop=await Shop.findOne({owner:req.userId});
        shop.items=shop.items.filter(id => id.toString() !== itemId);
        await shop.save();
        await shop.populate({
            path:'items',
            options:{sort:{updatedAt:-1}}
        });
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json({
            message:`Delete Item Error ${error.message}`
        });
    }
}

