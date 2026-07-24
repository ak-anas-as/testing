import { Order } from "../models/order.model.js";
import razorpay from "../utils/razorpay.js";
import crypto from "crypto";

const createPaymentOrder = async (req, res) => {

    try {

        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const paymentOrder = await razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            paymentOrder
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const verifyPayment = async (req, res) => {

    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const { orderId } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid Payment signature"
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "order not found"
            });
        }

        order.paymentStatus = "Paid";
        order.paymentId = razorpay_payment_id;
        order.paymentOrderId = razorpay_order_id;

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Payment verification",
            order
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}






export { createPaymentOrder, verifyPayment };