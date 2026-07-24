import { Food } from "../models/food.model.js";


const addFood = async ( req, res ) => {

    try {

        const {name, description, price, image, category, isAvailable } = req.body;

        if  ( !name || !description || !price || !category ) {
            return res.status(401).json({
                message:"All fields are required"
            })
        }

        const food = await food.create({
            name, 
            description,
            price,
            image,
            category,
            isAvailable
        });

        return res.status(200).json({
            success: true,
            message:"Food added success"
        });

        
    } catch (error) {
        return res.status(401).json({
            message:error.message
        });
    }

        }

const getAllFoods = async ( req, res ) => {

            try {

                const foods = await Food.find();
                return res.status(200).json({
                    success:true,
                    count: foods.length,
                    foods
                }); 


            } catch (error) {
                return res.status(401).json({
                    message:error.message
                });
            }

        };

 const getFoodById = async ( req, res ) => {

            try {
                
                const { id } = req.params;

                const food = await Food.findById(id);

                if (!food) {
                    return res.status(401).json({
                        success:false,
                        message:"Food not found"
                    });
                }

                return res.status(200).json({
                    success:true,
                    food
                });


            } catch (error) {
                return res.status(500).json({
                    success:false,  
                    message:error.message
                });
            }

        };

const updateFood = async ( req, res ) =>{

            try {
                
                const { id } = req.params;

                const {name,  description, price, image, category, isAvailable } = req.body;
      
                const food = await Food.findByIdAndUpdate(

                    id,
                    { name, description, price, image, category, isAvailable },
                    {
                     new:true
                    }
                );

                if ( !food ) {
                    return res.status(404).json({
                        success:false,
                        message:"Food not found"
                    });
                }

                return res.status(200).json({
                    success:true,
                    message:"Food updated success"
                });

        



            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message:error.message
                });
                
            }
        };

const deletFood = async ( req, res ) => {

            try {

                const { id } = req.params;

                const delet = await Food.findByIdAndDelete(id);

                if (!delet) {
                    return res.status(401).json({
                        success:"false",
                        message:"user not found"
                    });
                }

                return res.status(200).json({
                    success:true,
                    message:"Food deleted"
                });
                
            } catch (error) {
                return res.status(500).json({
                    success:false,
                    message:error.message
                });
            }


        }


export {addFood, getAllFoods, getFoodById, updateFood, deletFood};