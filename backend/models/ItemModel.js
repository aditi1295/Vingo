import mongoose from 'mongoose';



const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop',
        required:true
    },
    category:{
        type:String,
         enum:["Snacks",
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
            "Others",

        ],
        required:true
    },
     price:{
        type:Number,
        min:0,
        required:true
    },
    Foodtype:{
        type:String,
        enum:["Veg","Non-Veg"],
        required:true
    }
},{timestamp:true})

const Item=mongoose.model('Item',itemSchema);

export default Item;