const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

// Welcome page
router.get('/', (req, res, next) => {
    res.render('welcome');
});

// Dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
    res.render('dashboard', {
        name: req.user.name
    })
});


module.exports = router; 