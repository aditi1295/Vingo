import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";




//hamne jo token aoni cookie ke andar store krvaya tha signup or signin krne pr
// us token ko yha pr access karenge or usme se userid ko find karenge or is user 
// id se hume user mil jayga or curruser ek controller bana ke vha se return kr daynge or frontend me usse fetch kr laynge


const isAuth=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Token not found"});
        }
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
        const userId = decodeToken.userId || decodeToken.id;
        if(!userId){
            return res.status(401).json({message:"Invalid token"});
        }
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        req.userId=user._id;
        req.user=user;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token"});
    }

}
export default isAuth;
