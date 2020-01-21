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
        res.send('pass')

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
                    User.create({
                        name: name,
                        email: email,
                        
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