import mongoose from "mongoose";

const OrderSchema=new mongoose.Schema({
    products:[
        {
            type:mongoose.ObjectId,
            ref:"product"
        }
    ],
    payment:{},

    buyer:{
        type:mongoose.ObjectId,
        ref:"users"
    },

    status:{
        type:String,
        default:"not processed",
        enum:['not processed','processing','shipped','delivered','cancel']
    },


    
},{timestamps:true})
export default mongoose.model("order",OrderSchema)