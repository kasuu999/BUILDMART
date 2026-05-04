import User from "../models/userModel.js"

const getAllUsers=async(req,res)=>{
   const users= await User.find()
   if(!users){
    res.status(404)
    throw new Error("users not found")
   }
   res.status(200).json(users)
}

const getAllOrders=async(req,res)=>{
    res.send("GET ALL ORDERS")
}


const updateUsers=async(req,res)=>{
    res.send("UPDATE USERS")
}
const getAllProducts=async(req,res)=>{
    res.send("GET ALL PRODUCTS")
}


const getAllRetings=async(req,res)=>{
    res.send("GET ALL RETING")
}
const getAllVendors=async(req,res)=>{
    res.send("GET ALL VENDORS")
}
const updateAllVendors=async(req,res)=>{
    res.send("UPDATE ALL VENDORS")
}
const updateALLProducts=async(req,res)=>{
    res.send("UPDATE ALL PRODUCTD")
}

const adminController={updateALLProducts,getAllOrders,getAllProducts,getAllRetings,getAllUsers,updateUsers,updateAllVendors,getAllVendors}
export default adminController