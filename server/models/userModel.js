import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter name"]
    },
    email:{ type:String,
        required:[true,"please enter email"],
        unique:true
    },
    phone:{
         type:String,
        required:[true,"please enter phone number"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        unique:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    isVendore:{type:Boolean,
        required:true,
        default:false
    },
    creadits:{
        type:Number,
        required:true,
        default:5
    }
},{
    timestamps:true
})
const User=mongoose.model(userSchema)
export default User