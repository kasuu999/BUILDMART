import fs from "node:fs"
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js"
import Product from "../models/ProductModel.js"
import Vendor from "../models/vendorModel.js"
import Coupon from "../models/couponModel.js"
import Order from "../models/orderModel.js"
const becomeVendor = async (req, res) => {

    const userId = req.user._id

    // Check if already requested
    const vendorExists = await Vendor.findOne({ user: userId })

    if (vendorExists && vendorExists.status === "rejected") {
        res.status(409)
        throw new Error("Can't Request Your Profile Is Rejected!")
    }

    if (vendorExists && vendorExists.status === "active") {
        res.status(409)
        throw new Error("Already Active Profile No Need To Request Again!")
    }

   if (vendorExists && vendorExists.status === "pending") {
        res.status(409)
        throw new Error("Already Requested Wait For Approval!")
    }

    // Check fields
    const { name, phone, email, category, address } = req.body

    if (!name || !phone || !email || !category || !address) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    const vendor = await Vendor.create({ name, user: userId, email, phone, category, address })

    if (!vendor) {
        res.status(409)
        throw new Error("Vendor Not Created!")
    }

    res.status(201).json(vendor)


}


const addProduct = async (req, res) => {

    const userId = req.user._id


    // check if vendor exists
    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }

    const { name, description, price, category, stock } = req.body

    if (!name || !description || !price || !category || !stock ||!req.file.path) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    //upload product image to cloudinary
    let uploadResult= await uploadToCloudinary(req.file.path)

    //remove image from my local server
   fs.unlinkSync(req.file.path)


    const product = await Product.create({ name, price, description, category, stock, image:uploadResult.secure_url, vendor: vendor._id })

    if (!product) {
        res.status(409)
        throw new Error("Product Not Created!")
    }

    res.status(201).json(product)


}
const getPruduct=async(req,res)=>{
 const userId = req.user._id


    // check if vendor exists
    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }




    const products=await Product.find({vendor : vendor._id})
    if(!products){
        res.status(404)
        throw new Error("product not found")
        
    }
    res.status(201).json(products)

}



const updateProduct=async(req,res)=>{

const userId = req.user._id


    // check if vendor exists
    const vendor = await Vendor.findOne({ user: userId })

    if (!vendor) {
        res.status(404)
        throw new Error("Vendor not found")
    }

    //check product update hai ya nahi
    const product=await Product.findById(req.params.pid)
    if(!product){
        res.status(404)
        throw new Error("product not found")
    }


    if(product.vendor.toString()!=vendor._id.toString()){
        res.status(401)
        throw new Error("unable to update product")
    }

    const updatedProduct=await Product.findByIdAndUpdate(req.params.pid,req.body,{new:true})
     if (!updatedProduct) {
        res.status(404)
        throw new Error("product not updated")
    }
    res.status(201).json(updatedProduct)
}


const getVendors=async(req,res)=>{
    const vendors=await Vendor.find()
    if(!vendors){
        res.status(404)
        throw new Error("vendor not found")
    }
    const activeVendors=vendors.filter(vendor=>vendor.status=="active")
    res.status(200).json(activeVendors)
}
const getVendor=async(req,res)=>{
    const vendorId=req.params.vid
    const vendor=await Vendor.findById(vendorId)
    if(!vendor || !vendor.status=="active"){
        res.status(404)
        throw new Error("vendor not found")
    }
    
    res.status(200).json(vendor)
}



const updateCoupon=async(req,res)=>{
   const userId=req.user._id
   //check karo agar vendore exist krta hai
   const vendor=await Vendor.findOne({user:userId})
   if(!vendor){
    res.status(404)
    throw new Error("vendor not found")
   }
   let couponId=req.params.cid
   const updatedCoupon=await Coupon.findByIdAndUpdate(couponId,req.body,{new:true})
   if(!updatedCoupon){
    res.status(409)
    throw new Error("coupn not update")
   }
   res.status(201).json(updatedCoupon)

}
const createCoupon=async(req,res)=>{
   const userId=req.user._id
   //check karo agar vendore exist krta hai
   const vendor=await Vendor.findOne({user:userId})
   if(!vendor){
    res.status(404)
    throw new Error("vendor not found")
   }
   const {couponCode,couponDiscount}=req.body
   if(!couponCode || !couponDiscount){
    res.status(409)
    throw new Error("please fill all details")
   }
   const coupon=await Coupon.create({
    couponCode,couponDiscount,vendor:vendor._id
   })
   if(!coupon){
    res.status(409)
    throw new Error("coupn not created")
   }
   res.status(201).json(coupon)

}
const getMyorders=async(req,res)=>{
    const userId=req.user._id
    const vendor=await Vendor.findOne({user:userId})
    if(!vendor){
        res.status(404)
        throw new Error("Vendor not found")
    }
    const orders=await Order.find({vendor:vendor._id}).populate("products.product")

    if(!orders){
        res.status(404)
        throw new Error("order not found")
    }
    res.status(200).json(orders)

}

const updateOrder=async(req,res)=>{
    const userId=req.user._id
    const orderId=req.params.oid
    const vendor=await Vendor.findOne({user:userId})
    if(!vendor){
        res.status(404)
        throw new Error("Vendor not found")
    }
    const order=await Order.findById(orderId).populate("products.product")

    if(!order){
        res.status(404)
        throw new Error("order not found")
    }
    res.status(200).json(order)

}
const getUserOrder=async(req,res)=>{
    const userId=req.user._id
    const orderId=req.params.oid
    const {status}=req.body
    if(!status){
        res.json(409)
        throw new Error("please enter status")
    }
    const vendor=await Vendor.findOne({user:userId})
    if(!vendor){
        res.status(404)
        throw new Error("Vendor not found")
    }
  const updateOrder=await Order.findByIdAndUpdate(orderId,{status},{new:true})
  if(!updateOrder){
    res.status(409)
    throw new Error("order not updated")
  }

    if(!updateOrder){
        res.status(404)
        throw new Error("order not found")
    }
    res.status(200).json(updateOrder)

}


const vendorController = { becomeVendor, addProduct,getPruduct ,updateProduct,getVendors,getVendor,createCoupon,updateCoupon,getMyorders,getUserOrder,updateOrder}


export default vendorController