const express = require('express')
const router = express.Router()
const connection = require('../model/db')
const path = require('path')

router.post('/', function(request, response) {
	// Capture the input fields
	let email = request.body.email
	let firstName = request.body.firstName
    let lastName = request.body.lastName
	// Ensure the input fields exists and are not empty
	if (email && firstName && lastName) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query(`insert into emaillist (firstName,lastName,email,subscribed) values ('${firstName}','${lastName}','${email}',0)`, [email, firstName, lastName], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter your name and email to join the list!');
		response.end();
	}
});

router.get('/', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

module.exports = router