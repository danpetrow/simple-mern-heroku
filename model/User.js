// // if we want to use mongoose in the future or need to reference our table structure that's why I've included this file.
// const mongoose = require("mongoose")

// const userSchema = new mongoose.Schema(
//     {
//         username:{type:String, required:true, unique:true},
//         email:{type:String,required:true,unique:true},
//         password:{ type:String,requierd:true},
//         isAdmin:{
//             type:Boolean,
//             default:false,
//         },
//         //this is created by mongoose with the timesatmps
//         //createdAt:Date.now()
//         //updatedAt:Date.now()
//     },
//     //see comment above
//     {timestamps:true}
// )

// module.exports = mongoose.model("User",userSchema)