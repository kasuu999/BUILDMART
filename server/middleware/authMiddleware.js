import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
const forUser=async(req,res,next)=>{
    try{
        let token
       if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1]
        let decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        let user=await User.findById(decoded.id).select("-password")
        
        console.log(user)
        req.user=user
        next()
       }else{
        throw new Error("Anauthrized access")
        
       }
    }catch(error){
        res.status(401)
        throw new Error("Anauthrized access")
    }
}
const forAdmin=async(req,res,next)=>{
    try{
        let token
       if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1]
        let decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        let user=await User.findById(decoded.id).select("-password")
        
        console.log(user)
        req.user=user
        if(user.isAdmin){
        next()
        }else{
             res.status(401)
        throw new Error("Anauthrized access ADMIN ONLY")
        }
        
       }else{
        throw new Error("Anauthrized access")
        
       }
    }catch(error){
        res.status(401)
        throw new Error("Anauthrized access")
    }
}
const protect={forAdmin,forUser}
export default protect
