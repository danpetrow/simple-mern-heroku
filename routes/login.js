const express = require('express')
const router = express.Router()
const connection = require('../model/db')
const path = require('path')
const { signupValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

router.post('/', loginValidation, (req, res, next) => {
	connection.query(
	`SELECT * FROM users WHERE email = ${connection.escape(req.body.email)};`,
	(err, result) => {
	// user does not exists
	if (err) {
	throw err;
	return res.status(400).send({
	msg: err
	});
	}
	if (!result.length) {
	return res.status(401).send({
	msg: 'Email or password is incorrect!'
	});
	}
	// check password
	bcrypt.compare(
	req.body.password,
	result[0]['password'],
	(bErr, bResult) => {
	// wrong password
	if (bErr) {
	throw bErr;
	return res.status(401).send({
	msg: 'Email or password is incorrect!'
	});
	}
	if (bResult) {
	const token = jwt.sign({id:result[0].id},process.env.secret,{ expiresIn: '1h' });
	connection.query(
	`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
	);
	return res.status(200).send({
	msg: 'Logged in!',
	token
	//,user: result[0]
	});
	}
	return res.status(401).send({
	msg: 'Username or password is incorrect!'
	});
	}
	);
	}
	);
	});

// router.post('/', function(request, response) {
// 	// Capture the input fields
// 	let username = request.body.username;
// 	let password = request.body.password;
// 	// Ensure the input fields exists and are not empty
// 	if (username && password) {
// 		// Execute SQL query that'll select the account from the database based on the specified username and password
// 		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
// 			// If there is an issue with the query, output the error
// 			if (error) throw error;
// 			// If the account exists
// 			if (results.length > 0) {
// 				// Authenticate the user
// 				request.session.loggedin = true;
// 				request.session.username = username;
// 				// Redirect to home page
// 				response.redirect('/home');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });

router.get('/',(req,res)=>{
	 res.sendFile(path.resolve(__dirname,'../public/login.html'))
	 res.end
	 })

module.exports = router