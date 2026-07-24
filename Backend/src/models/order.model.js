import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {

            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "preparing", "out of Delivery", "Delivered"],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    },

    paymentId: {
        type: String,
        default: ""
    },

    razorpayOrderId: {
        type: String,
        default: ""
    }


}, { timestamps: true })



export const Order = mongoose.model("Order", orderSchema);