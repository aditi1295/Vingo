const mongoose=require('mongoose');

const userSchema=rew mongoose.Schema({
    fullName:{
        type:String,
        required:tre
    },
    email{
        type:String,
        required:true,
        unique:true,
    },
    password{
        type:String,
    },
    mobile{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","owner","deliveryBoy"],
        required:true
    }

},{timeStamps:true})