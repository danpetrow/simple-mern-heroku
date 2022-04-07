const express = require('express')
const router = express.Router()
const connection = require('../model/db')
const path = require('path')
const { body, check, validationResult } = require('express-validator');

// TODO handle if body email is not email & add other other validators for body('firstName') and ('lastName'),
router.post('/', check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
(req, res, next) => {
    // Capture the input fields
    let email = req.body.email
    let firstName = req.body.firstName
    let lastName = req.body.lastName

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array())
    }
    else {
        connection.query(`SELECT * FROM emaillist WHERE LOWER(email) = LOWER('${email}')`, [email],
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
                            return req.session.signedUp = true, req.session.firstName = firstName, res.redirect('/email')
                        }
                    );
                }
            });
    }
})

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