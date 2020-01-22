const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user 
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done();
                    }
                })
                .catch(err => console.log(err))
        })
    )
}