const express = require('express');
const router = express.Router();

// Welcome page
router.get('/', (req, res, next) => {
    res.render('welcome');
});

// Dashboard page
router.get('/dashboard', (req, res, next) => res.render('dashboard'));


module.exports = router;