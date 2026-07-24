import { Cart } from "../models/cart.moduls.js";
import { Food } from "../models/food.model.js";


const addToCart = async (req, res) => {

    try {

        const { foodId, quantity } = req.body;

        const userId = req.user._id;

        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(401).json({
                success: false,
                message: "Food not found"
            });
        }


        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            const newCart = await Cart.create({

                user: userId,
                items: [

                    {
                        food: foodId,
                        quantity: quantity || 1
                    }
                ]
            });

            return res.status(201).json({
                success: true,
                message: "Food added to cart",
                cart: newCart
            });
        }

        const existingFood = cart.items.find(
            (item) => item.food.tostring() === foodId
        );

        if (existingFood) {
            existingFood.quantity += quantity || 1;
        } else {
            cart.items.push({
                food: foodId,
                quantity: quantity || 1
            });
        }

        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Food added to cart ",
            cart
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const getCart = async (req, res) => {

    try {

        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId })

            .populate("items.food");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty"
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export { addToCart, getCart }