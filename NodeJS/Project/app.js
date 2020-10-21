// create variable and setting it equal to library
const express = require('express');
// access express as a function
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
// middleware
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;