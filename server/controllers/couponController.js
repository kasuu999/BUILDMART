import Coupon from "../models/couponModel.js"

const getCoupons = async (req, res) => {

    const coupons = await Coupon.find().populate('vendor')

    if (!coupons) {
        res.status(404)
        throw new Error("Coupons Not Found!")
    }

    res.status(200).json(coupons)

}
const createCoupon = async (req, res) => {

    const { couponCode, couponDiscount } = req.body

    const coupon = await Coupon.create({
        couponCode,
        couponDiscount,
        isActive: true
    })

    res.status(201).json(coupon)
}

const couponController = { getCoupons,createCoupon }


export default couponController