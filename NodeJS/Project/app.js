// create variable and setting it equal to library
const express = require('express');
// access express as a function
const app = express();

// middleware
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;