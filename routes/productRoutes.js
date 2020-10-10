const express = require('express');
const Product = require('../models/product')
const productRoutes = express.Router();
const middleware = require('../middleware/middleware')

productRoutes.post('/add', middleware.authenticateUser, async (req, res) => {
    try {
        const { _id } = req.user;
        const product = new Product({ ...req.body, creator: _id });
        await product.save()
        res.status(201).json(product)

    } catch(error) {
        res.status(400).json(error)
    }
})

productRoutes.get('/view', middleware.authenticateUser, async (req, res) => {
    try {
        const { _id } = req.user;
        const products = await Product.find({ creator: _id });
        res.json(products);        
    } catch(error) {
        res.status(400).json(error)
    }
})

module.exports = productRoutes;