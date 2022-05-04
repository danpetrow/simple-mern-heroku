const express = require('express')
const router = express.Router()
const connection  = require('../model/db')
const path = require('path')
const { signupValidation, loginValidation } = require('../validation')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/', signupValidation, (req, res, next) => {
    connection.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${connection.escape(
    req.body.email
    )});`,
    (err, result) => {
    if (result.length) {
    return res.status(409).send({
    msg: 'This user is already in use!'
    });
    } else {
    // username is available
    bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
    return res.status(500).send({
    msg: err
    });
    } else {
    // has hashed pw => add to database
    connection.query(
    `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${connection.escape(
    req.body.email
    )}, ${connection.escape(hash)})`,
    (err, result) => {
    if (err) {
    throw err;
    return res.status(400).send({
    msg: err
    });
    }
    return res.status(201).send({
    msg: 'The user has been registerd with us!'
    });
    }
    );
    }
    });
    }
    }
    );
    });

router.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../public/register.html'))
    res.end
    })

module.exports = router    