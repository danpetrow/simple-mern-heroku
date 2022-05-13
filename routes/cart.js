const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const connection  = require('../model/db')

router.post("/", verifyToken, (req,res)=>{
    let newCart = `${connection.escape(req.body.products)}`
    try{
        connection.query(
            `INSERT INTO carts (userId, products) VALUES (${connection.escape(req.user.id)}, ${connection.escape(req.body.products)})`,
            (err, result) => {
            if (err) {
            throw err;
            return res.status(400).send({
            msg: err
            });
            }
            return res.status(201).send({
            msg: 'Cart has been created!',
            newCart
            });
            }
            )
    } catch (err) {
        res.status(500).json(err)
    }
})
//todo for each req.body.xxx add to key to insert and add value to values also check that product exists
router.put("/:id", verifyTokenAndAuthorization, (req,res)=>{
    try{
        connection.query(
            `UPDATE carts set products = ${connection.escape(req.body.products)} where userId = ${req.params.id}`,
            (err, result) => {
            if (err) {
            throw err;
            return res.status(400).send({
            msg: err
            });
            }
            return res.status(201).send({
            msg: "Cart has been updated!",
            });
            }
            )
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/find/:id", verifyTokenAndAuthorization, (req,res)=>{
    try{
        connection.query(
            `select * from carts where userId = ${req.params.id}`,
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
    if(req.query.new){
        try{
            connection.query(
                `select * from carts order by cartId desc limit 3`,
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
    }
    else{
    try{
        connection.query(
            `select * from carts`,
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
}
})
// todo check if product exists
router.delete("/:id", verifyTokenAndAuthorization, (req,res)=>{
    try{
        connection.query(
            `delete from carts where userId = ${req.params.id}`,
            (err, result) => {
            if (err) {
            throw err;
            return res.status(400).send({
            msg: err
            });
            }
            return res.status(201).send({
            msg: "Product has been deleted if it exists",
            });
            }
            )
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router