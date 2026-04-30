import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    // 1. Check empty fields
    if (!name || !email || !phone || !password) {
        return res.status(400).json({
            message: "Please fill all details"
        });
    }

    // 2. Check user already exists
    const emailExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });

    if (emailExist || phoneExist) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword
    });

    if (!user) {
        return res.status(400).json({
            message: "User not created"
        });
    }

    // 5. Response (password nahi bhejna)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        creadits: user.creadits,
        isVendore: user.isVendore,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        token:gentrateToken(user._id)
    });
};

// ================= LOGIN =================
const loginUser = async (req, res) => {

    // 1. Data lo
    const { email, password } = req.body;

    // 2. Check empty
    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all details"
        });
    }

    // 3. User find karo
    const user = await User.findOne({ email });

    // 4. Password match karo
    if (user && await bcrypt.compare(password, user.password)) {
        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token:gentrateToken(user._id)
            }
        });
    }

    // 5. Wrong credentials
    return res.status(401).json({
        message: "Invalid email or password"
    });
};



const gentrateToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
// export
export default { registerUser, loginUser };