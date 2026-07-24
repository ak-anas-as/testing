import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.moduls.js";
import { Food } from "../models/food.model.js";


const placeOrder = async (req, res) => {

    try {

        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId })
            .populate("items.food");


        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;

        cart.items.forEach((item) => {
            totalAmount += item.food.price * item.quantity;
        });

        const order = await Order.create({
            user: userId,
            items: cart.items,
            totalAmount
        });

        cart.items = [];

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Order placed success",
            order
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getMyOrders = async (req, res) => {

    try {
        
        const userId = req.user._id;

        const orders = await Order.find({ user: userId })
        .populate("items.food");

        return res.status(200).json({
            success:true,
            message:"Orders fetched sucess",
            count:orders.length,
            orders
        });


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }

}

const getSingleOrder = async (req,res) => {

    try {
        
        const { orderId } = req.params;
        
        const order = await Order.findById(orderId)
        .populate("items.food");

        if (!order) {
            return res.status(400).json({
                success:false,
                message:"Order not found"
            });
        }

        return res.status(200).json({
            success:true,
            order
        }); 


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }

}

const getAllOrders = async (req,res) => {
    
    try {

        const orders = await Order.find()
        .populate("user", "name email")
        .populate("items.food");

        return res.status(200).json({
            success:true,
            count:orders.length,
            orders
        });


        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }

}

const updateOrderStatus = async (req,res) => {

    try {

        const { orderId } = req.params;
        const { status } = req.body;
        
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(400).json({
                success:false,
                message:"Order not found"
            });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({
            success:true,
            message:"Order status updated "
        });

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
    

};


export { placeOrder, getMyOrders, getSingleOrder, getAllOrders, updateOrderStatus}