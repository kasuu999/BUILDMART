import express from "express"
import adminController from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js"
const router=express.Router()

router.get("/users",protect.forAdmin,adminController.getAllUsers)

router.get("/orders",protect.forAdmin,adminController.getAllUsers)
router.get("/products",protect.forAdmin,adminController.getAllProducts)
router.get("/retings",protect.forAdmin,adminController.getAllRetings)
router.get("/vendors",protect.forAdmin,adminController.getAllVendors)


router.put("/user/:uid",protect.forAdmin,adminController.updateUsers)
router.put("/vendors/:vid",protect.forAdmin,adminController.updateAllVendors)
router.put("/products/:pid",protect.forAdmin,adminController.updateALLProducts)

export default router