const express = require('express')
const router = express.Router()
const connection = require('../model/db')
const path = require('path')
const { body } = require('express-validator');

// TODO handle if body email is not email & add other other validators for body('firstName') and ('lastName'),
router.post('/', body('email').isEmail(), (req, res, next) => {
    // Capture the input fields
    let email = req.body.email
    let firstName = req.body.firstName
    let lastName = req.body.lastName

    connection.query(`SELECT * FROM emaillist WHERE LOWER(email) = LOWER('${req.body.email}')`,[email],
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: "You're already signed up!"
                });
            } else {
                connection.query(`insert into emaillist (firstName,lastName,email,subscribed) values ('${firstName}','${lastName}','${email}',0)`, [email, firstName, lastName],
                    (err, result) => {
                        if (err) {
                            throw err;
                            return res.status(400).send({
                                msg: err
                            });
                        }
                        return req.session.signedUp= true, req.session.firstName = firstName, res.redirect('/email')
                    }
                );
            }
        });
})


// 		// Execute SQL query that'll select the account from the database based on the specified username and password
// 		connection.query(`insert into emaillist (firstName,lastName,email,subscribed) values ('${firstName}','${lastName}','${email}',0)`, [email, firstName, lastName], function(error, results, fields) {
// 			// If there is an issue with the query, output the error
// 			if (error) throw error;
//             else {
//                 req.session.loggedin = true;
// 				req.session.firstName = firstName;
//                 res.redirect('/email');
// 			}			
// 			res.end();
// 		});
//         }
//         catch(err){
//             if (err.code === 'ER_DUP_ENTRY') {
//                 //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
//             } else {
//                 //handleHttpErrors(err.message);
//              }
//         }
// 	} else {
// 		res.send('Please enter your name and email to join the list!');
// 		res.end();
// 	}
// });

router.get('/', (req, res) => {
    // If the user is loggedin
    if (req.session.signedUp) {
        // Output username
        res.send('Thanks for signing up, ' + req.session.firstName + '!');
    } else {
        // Not logged in
        res.send('how did you get here?!');
    }
    res.end();
});

module.exports = router