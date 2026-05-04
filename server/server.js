import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/dbConfig.js"
dotenv.config()

// Local Imports
import authRoutes from "./routes/authRoutes.js"
import errorHandler from "./middleware/errorHandler.js"
import adminController from "./controllers/adminController.js"
import adminRoutes from "./routes/adminRoutes.js"


const PORT = process.env.PORT || 5000
const app = express()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// DB Connection
connectDB()


app.get("/",(req,res)=>{
    res.send("WELCOME TO BUILD MART")
})



// Auth Routes

app.use("/api/auth", authRoutes)
//admin routes
app.use("/api/admin",adminRoutes)


// Error Handler

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`)
})