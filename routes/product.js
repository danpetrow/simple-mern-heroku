const express = require('express')
const router = express.Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const connection  = require('../model/db')

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
//todo for each req.body.xxx add to key to insert and add value to values also check that product exists
router.put("/:id", verifyTokenAndAdmin, (req,res)=>{
    try{
        connection.query(
            `UPDATE products set title = ${connection.escape(req.body.title)},
            descr = ${connection.escape(req.body.descr)}, 
            img = ${connection.escape(req.body.img)},
            categories = ${connection.escape(req.body.categories)},
            size = ${connection.escape(req.body.size)},
            color = ${connection.escape(req.body.color)},
            price = ${connection.escape(req.body.price)}
             where productId = ${req.params.id}`,
            (err, result) => {
            if (err) {
            throw err;
            return res.status(400).send({
            msg: err
            });
            }
            return res.status(201).send({
            msg: "Product has been updated if it exists",
            });
            }
            )
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/find/:id", (req,res)=>{
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

router.get("/", (req,res)=>{
    if(req.query.new){
        try{
            connection.query(
                `select * from products order by productid desc limit 3`,
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
    else if(req.params.category){
        try{
            connection.query(
                `select * from products where categories like "%${req.params.category}%"`,
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
}
})
// todo check if product exists
router.delete("/:id", verifyTokenAndAdmin, (req,res)=>{
    try{
        connection.query(
            `delete from products where productId = ${req.params.id}`,
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