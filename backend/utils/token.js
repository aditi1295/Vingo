import jwt from "jsonwebtoken";

const genToken=async (user)=>{
    try{
    const userId = user?._id || user;
    const token=await jwt.sign({
        userId
    },
        process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
    }catch(error){
        throw new Error("Error generating token");
    }
}
export { genToken };
