const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order = require('../models/order_model');
const Product = require('../models/product_model');

router.get('/', (req, res, next) => {
    Order.find()
        .select('-__v')
        .populate('product', '-__v')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        order: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/orders/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productID)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                })
            } else {
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    product: req.body.productID
                });
                return order.save();
            }
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result.id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http:localhost:4000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:orderID', (req, res, next) => {
    Order.findById(req.params.orderID)
        .select('-__v')
        .populate('product', '-__v')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            } else {
                res.status(200).json({
                    order: order,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/orders'
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:orderID', (req, res, next) => {
    Order.deleteOne({_id: req.params.orderID})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/orders',
                    body: { productID: "ID", quantity: "Number"}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;