import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js"; 
//local imports
import authRoutes from"./routes/authRoutes.js"
import errorHandler from"./middleware/errorHandler.js"

dotenv.config();
//body perser
app.use(express.json())
app.use(express.urlencoded())


//db connection
connectDB();


const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "WELCOME TO BUILD MART"
    });
});
//auth routes


app.use("/api/auth",authRoutes)



//error handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});