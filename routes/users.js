const express = require('express');
const router = express.Router();

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
    console.log(req.body);
    res.send('alo')
})

module.exports = router;