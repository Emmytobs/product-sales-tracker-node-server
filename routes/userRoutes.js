const express = require("express");
const User = require('../models/user')
const userRoutes = express.Router()

userRoutes.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user)
})

module.exports = userRoutes;