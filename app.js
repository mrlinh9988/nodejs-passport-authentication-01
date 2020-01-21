const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const mongoose = require('mongoose');

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo Atlas
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

// Body-parser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(PORT, () => console.log(`server start on port ${PORT}`));