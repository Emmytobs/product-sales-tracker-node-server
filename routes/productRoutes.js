const express = require('express');
const Product = require('../models/product')
const productRoutes = express.Router();

productRoutes.post('/add', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save()
        res.status(201).json(product)

    } catch(error) {
        res.status(400).json(error)
    }
})

productRoutes.get('/view', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);

    } catch(error) {
        res.status(400).json(error)
    }
})

module.exports = productRoutes;