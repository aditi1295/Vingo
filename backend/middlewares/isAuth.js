import jwt from "jsonwebtoken";




//hamne jo token aoni cookie ke andar store krvaya tha signup or signin krne pr
// us token ko yha pr access karenge or usme se userid ko find karenge or is user 
// id se hume user mil jayga or curruser ek controller bana ke vha se return kr daynge or frontend me usse fetch kr laynge


const isAuth=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(400).json({message:"Token not found"});
        }
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!decodeToken){
            return res.status(400).json({message:"Invalid token"});
        }
       
        req.userId=decodeToken.userId;
        next();
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }

}
export default isAuth;