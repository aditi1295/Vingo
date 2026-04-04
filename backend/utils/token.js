import jwt from "jsonwebtoken";

const genToken=async (user)=>{
    try{
    const token=await jwt.sign({
        id:user._id,
        email:user.email,
        role:user.role
    },
        process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
    }catch(error){
        throw new Error("Error generating token");
    }
}
export { genToken };