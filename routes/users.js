const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Login page
router.get('/login', (req, res, next) => {
    res.render('login')
})
// Register page
router.get('/register', (req, res, next) => {
    res.render('register')
})

// Register handle
router.post('/register', (req, res, next) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check require fields
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: 'Please fill in all fields'
        })
    }

    // Check password match
    if (password !== password2) {
        errors.push({
            msg: "Password do not match"
        })
    }

    // Check password length
    if (password.length < 6) {
        errors.push({
            msg: 'Password should be at least 6 characters'
        })
    }


    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({
                        msg: 'Email is already registered'
                    })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {

                    // Hash password 
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;

                        bcrypt.hash(password, salt, (err1, hashPassword) => {
                            if (err1) throw err1;

                            User.create({ name, email, password: hashPassword })
                                .then(user => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered and can login'
                                    )
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
            .catch(err => console.log(err))
        // User.create({
        //     name, email, password
        // })
    }



})

module.exports = router;