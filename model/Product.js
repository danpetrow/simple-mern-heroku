// if we want to use mongoose in the future or need to reference our table structure that's why I've included this file.
// const mongoose = require("mongoose")

// const productSchema = new mongoose.Schema(
//     {
//         title:{type:String, required:true, unique:true},
//         desc:{type:String,required:true},
//         img:{ type:String,requierd:true},
//         categories:{type:Array},
//         size:{type:String},
//         color:{ type:String},
//         price:{type:Number,required:true },
//         //this is created by mongoose with the timesatmps
//         //createdAt:Date.now()
//         //updatedAt:Date.now()
//     },
//     //see comment above
//     {timestamps:true}
// )

// module.exports = mongoose.model("Product",productSchema)