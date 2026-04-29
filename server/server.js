import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js"; 
//local imports
import authRoutes from"./routes/authRoutes.js"

dotenv.config();
//db connection
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "WELCOME TO BUILD MART"
    });
});
//auth routes


app.use("/api/auth",authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});