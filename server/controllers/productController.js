import Product from "../models/productModel.js"

const getProducts=async(req,res)=>{
    const products=await Product.find()
    if(!products){
        res.status(404)
        throw new Error("product not found")

    }

const activeProducts = products.filter((product) => product.isActive)

    res.status(200).json(activeProducts)
}

const getProduct=async(req,res)=>{

    const productId = req.params.pid
    const product=await Product.findById(productId)
   if (!product || product.isActive === false) {
        res.status(404)
        throw new Error("product not found")
    }
    res.status(200).json(activeProducts)
}



    const productController={getProducts,getProduct}
export default productController