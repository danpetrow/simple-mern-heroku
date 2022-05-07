// if we want to use mongoose in the future or need to reference our table structure that's why I've included this file.
// const mongoose = require("mongoose")

// const cartSchema = new mongoose.Schema(
//     {
//         userId:{type:String, required:true, unique:true},
//         products:[
    //     {
    //         productId:{
    //             type:String
    //         },
    //         quantity:{
    //             type:Number,
    //             default:1,
    //         },
    //     },
    // ],
//         //this is created by mongoose with the timesatmps
//         //createdAt:Date.now()
//         //updatedAt:Date.now()
//     },
//     //see comment above
//     {timestamps:true}
// )

// module.exports = mongoose.model("Cart",cartSchema)