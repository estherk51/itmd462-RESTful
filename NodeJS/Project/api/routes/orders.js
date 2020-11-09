const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    };
    res.status(201).json({ // 201 Created
        message: 'Order created',
        order: order
    });
});

router.get('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated order',
        orderID: req.params.orderID
    });
});

router.delete('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted order',
        orderID: req.params.orderID
    });
});

module.exports = router;