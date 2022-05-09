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

router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
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
                const { password, ...others} = result[0]
        return res.status(200).send(others)
    }
        }
        );
    
    }catch(err){
        res.status(500).json(err)
    }
    })
    
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    const query = req.query.new
    if (query==='true') {
        try{            
            connection.query(
            `select id, name, email,isAdmin,createdAt,updatedAt from users order by id desc limit 5`,
            
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
        
        }catch(err){
            res.status(500).json(err)
        }
        } 
        
    else {
        try{            
        connection.query(
        `select id, name, email,isAdmin,createdAt,updatedAt from users`,
        
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
    
        } catch (err) {
            res.status(500).json(err)
        }

    }})

router.get("/stats",verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1)).toISOString().slice(0, 19).replace('T', ' ');

    try{
        connection.query(
            `select date_format(createdAt, '%m') as Month, count(*) as numberOfUsers from users where createdAt > '${lastYear}' group by month(createdAt) Desc`,
            
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