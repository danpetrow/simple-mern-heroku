const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const connection  = require('../model/db')
const bcrypt = require('bcryptjs')
const res = require('express/lib/response')


router.post("/", verifyTokenAndAdmin, (req,res)=>{
    const newProduct = new Product(req.body)

    try{
        //todo write sql to replace await newProduct.save
        const savedProduct =  newProduct.save();
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router