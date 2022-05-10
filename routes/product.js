const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const connection  = require('../model/db')
const bcrypt = require('bcryptjs')
const res = require('express/lib/response')


router.post("/", verifyTokenAndAdmin, (req,res)=>{
    let newProduct = `${connection.escape(req.body.title)}, ${connection.escape(req.body.descr)}, ${connection.escape(req.body.img)}, ${connection.escape(req.body.categories)}, ${connection.escape(req.body.size)}, ${connection.escape(req.body.color)}, ${connection.escape(req.body.price)}`
    try{
        connection.query(
            `INSERT INTO products (title, descr, img, categories, size, color, price) VALUES (${connection.escape(req.body.title)}, ${connection.escape(
            req.body.descr)}, ${connection.escape(req.body.img)}, ${connection.escape(req.body.categories)}, ${connection.escape(req.body.size)}, ${connection.escape(req.body.color)}, ${connection.escape(req.body.price)})`,
            (err, result) => {
            if (err) {
            throw err;
            return res.status(400).send({
            msg: err
            });
            }
            return res.status(201).send({
            msg: 'The product has been registered with us!',
            id: result["insertId"],
            newProduct
            });
            }
            )
    } catch (err) {
        res.status(500).json(err)
    }
})
//todo for each req.body.xxx add to key to insert and add value to values
router.put("/:id", verifyTokenAndAdmin, (req,res)=>{
    let newProduct = `${connection.escape(req.body.title)}, ${connection.escape(req.body.descr)}, ${connection.escape(req.body.img)}, ${connection.escape(req.body.categories)}, ${connection.escape(req.body.size)}, ${connection.escape(req.body.color)}, ${connection.escape(req.body.price)}`
    try{
        connection.query(
            `INSERT INTO products (title, descr, img, categories, size, color, price) VALUES (${connection.escape(req.body.title)}, ${connection.escape(
            req.body.descr)}, ${connection.escape(req.body.img)}, ${connection.escape(req.body.categories)}, ${connection.escape(req.body.size)}, ${connection.escape(req.body.color)}, ${connection.escape(req.body.price)})`,
            (err, result) => {
            if (err) {
            throw err;
            return res.status(400).send({
            msg: err
            });
            }
            return res.status(201).send({
            msg: 'The product has been registered with us!',
            id: result["insertId"],
            newProduct
            });
            }
            )
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/find/:id", verifyTokenAndAdmin, (req,res)=>{
    let newProduct = `${connection.escape(req.body.title)}, ${connection.escape(req.body.descr)}, ${connection.escape(req.body.img)}, ${connection.escape(req.body.categories)}, ${connection.escape(req.body.size)}, ${connection.escape(req.body.color)}, ${connection.escape(req.body.price)}`
    try{
        connection.query(
            `select * from products where productId = ${req.params.id}`,
            (err, result) => {
            if (err) {
            throw err;
            return res.status(400).send({
            msg: err
            });
            }
            return res.status(201).send({
            result: result
            });
            }
            )
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/", verifyTokenAndAdmin, (req,res)=>{
    try{
        connection.query(
            `select * from products`,
            (err, result) => {
            if (err) {
            throw err;
            return res.status(400).send({
            msg: err
            });
            }
            return res.status(201).send({
                result: result
            });
            }
            )
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router