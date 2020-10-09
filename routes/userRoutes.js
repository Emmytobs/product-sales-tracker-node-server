const express = require("express");
const User = require('../models/user')
const userRoutes = express.Router()
const middleware = require('../middleware/middleware')

userRoutes.use('/register', middleware.hashPassword)
userRoutes.post('/register', async (req, res) => {
    const user = new User({ ...req.body, password: req.hashedPassword});
    try {
        // Generate JWT token
        const token = await user.createJWT()
        // Save the user and the token on the user object
        console.log(user, token)
        await user.save()
        res.status(201).json({ user, token })
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = userRoutes;