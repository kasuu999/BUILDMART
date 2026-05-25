import User from "../models/userModel.js"
import Vendor from "../models/vendorModel.js"
import Product from "../models/ProductModel.js"
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
        const products=await Product.find()
    if(!products){
        res.status(404)
        throw new Error("product not found")

    }
res.status(200).json(products)
}


const getAllRetings=async(req,res)=>{
    res.send("GET ALL RETING")
}
const getAllVendors=async(req,res)=>{
    const vendors =await Vendor.find()
    if(!vendors){
        res.status(404)
        throw new Error("Vendors not found")
    }

   res.status(200).json(vendors)
}
const updateAllVendors=async(req,res)=>{
    const vendorId=req.params.vid
    const {status}=req.body
if(!status){
    res.status(409)
    throw new Error("please add status")
}

const vendor=await Vendor.findById(vendorId)
if(!vendor){
    res.status(404)
    throw new Error("vendor not found")
}

    const updatedvendor=await Vendor.findByIdAndUpdate(vendor._id,{status},{new:true})
   if(!updatedvendor){
    res.status(409)
    throw new Error("vendor not updated")
   } 


   let user= await User.findById(vendor.user)
   if(!user){
    res.status(409)
    throw new Error("invailid user id")
   }
   await User.findByIdAndUpdate(user._id,{isVendore:true},{new:true})
   res.status(200).json(updatedvendor)
}
const adminController={getAllOrders,getAllProducts,getAllRetings,getAllUsers,updateUsers,updateAllVendors,getAllVendors}
export default adminController