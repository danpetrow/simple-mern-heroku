const express = require('express')

const req = require('express/lib/request')

const router = express.Router()

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')

const connection  = require('../model/db')

  

router.post("/", verifyToken, (req,res)=>{

    let newCart = `${connection.escape(req.body.products)}`

    try{

        connection.query(

            `INSERT INTO orders (userId, products, amount, address) VALUES (${connection.escape(req.user.id)}, ${connection.escape(req.body.products)}, ${connection.escape(req.body.amount)}, ${connection.escape(req.body.address)})`,

            (err, result) => {

            if (err) {

            throw err;

            return res.status(400).send({

            msg: err

            });

            }

            return res.status(201).send({

            msg: 'Order has been created!',

            newCart

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

            `UPDATE order set products = ${connection.escape(req.body.products)}, amount = ${connection.escape(req.body.amount)}, address = ${connection.escape(req.body.address)} where cartId = ${req.params.id}`,

            (err, result) => {

            if (err) {

            throw err;

            return res.status(400).send({

            msg: err

            });

            }

            return res.status(201).send({

            msg: "Order has been updated!",

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

            `select * from orders where userId = ${req.params.id}`,

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

                `select * from orders order by orderId desc limit 3`,

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

            `select * from orders`,

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

            `delete from orders where userId = ${req.params.id}`,

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

  

router.get("/income",verifyTokenAndAdmin, (req,res)=>{

    const date = new Date()

    const lastMonth = new Date(date.setMonth(date.getMonth()-1))

    const lastMonthFormat = new Date(date.setMonth(date.getMonth()-1)).toISOString().slice(0, 19).replace('T', ' ')

    const previousMonthFormat = new Date(new Date().setMonth(lastMonth.getMonth()-1)).toISOString().slice(0, 19).replace('T', ' ')

    const lastYear = new Date(date.setFullYear(date.getFullYear()-1)).toISOString().slice(0, 19).replace('T', ' ');

  

    try{

        connection.query(

            // todo with cte doesn't work in mysql 5.6 figure out an alternative\

            `select sum(amount) as salesByMonthThisYear, DATE_FORMAT(createdAt,'%M') as Month from orders where createdAt > '${lastYear}' group by month`,

                (err, result) => {

                    if (err) {

                        throw err;

                        return res.status(400).send({

                        msg: err

                    });

                    } else{

                return res.status(200).send(result)

                        }

                }

            );

    } catch(err) {

        res.status(500).json(err)

    }

})

  

module.exports = router