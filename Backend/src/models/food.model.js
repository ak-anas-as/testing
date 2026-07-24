import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    price:{
        type:Number,
        required:true
    },

    image:{
        type:String,
    },

    category:{
        type:String,
        required:true
    },

    isAvailable:{
        type:Boolean,
        default:true
    },


},

{timestamps:true})

export const Food = mongoose.model("Food",foodSchema);