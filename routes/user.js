const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken')
const connection  = require('../model/db')
const bcrypt = require('bcryptjs')

router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }try{
            // has hashed pw => add to database
            connection.query(
            `update users set password = ${connection.escape(req.body.password)} where id = ${req.params.id}`,
            (err, result) => {
                if (err) {
                    throw err;
                    return res.status(400).send({
                    msg: err
                });
                } else{
            return res.status(201).send({
            msg: 'Password has been updated!'
            });
        }
            }
            );
            }
            catch{err}
        })

router.post("/userposttest", (req,res)=>{
    const username = req.body.username
    res.send(`your username is ${username}`)
})

router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
try{            
    connection.query(
    `delete from users where id = ${req.params.id}`,
    (err, result) => {
        if (err) {
            throw err;
            return res.status(400).send({
            msg: err
        });
        } else{
    return res.status(201).send({
    msg: 'User has been deleted'
    });
}
    }
    );

}catch(err){
    res.status(500).json(err)
}
})

router.get("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{            
        connection.query(
        `select * from users where id = ${req.params.id}`,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                msg: err
            });
            } else{
        return res.status(200).json(result)
    }
        }
        );
    
    }catch(err){
        res.status(500).json(err)
    }
    })
    

module.exports = router