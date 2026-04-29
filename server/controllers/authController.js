
const registerUser=async(req,res)=>{
    res.send("user registered")
}
const loginUser=async(req,res)=>{
    res.send("user User logined")
}
const authController={registerUser,loginUser}
export default authController