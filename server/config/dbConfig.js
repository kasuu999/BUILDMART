import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`db connected: ${conn.connection.name}`)
    }catch(error){
        console.log(`connection faild${error.message}`)
    }
}
export default connectDB