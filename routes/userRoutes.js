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
        await user.save()
        res.status(201).json({ user, token })
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})

userRoutes.use('/login', middleware.comparePassword)
userRoutes.post('/login', async (req, res) => {
    try {
        const { user } = req;
        // Generate JWT token
        const token = await user.createJWT()
        // Save the user and the token on the user object
        await user.save()
        res.json({ user, token })
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})

// Public profile
userRoutes.get('/profile/:id', async (req, res) => {
    try {
        const { id: _id } = req.params;
        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User does not exist")
        }
        res.json(user)
    } catch(error) {
        res.status(404).json({ error: error.message })
    }
})

// Show private profile
userRoutes.use('/_profile', middleware.authenticateUser)
userRoutes.get('/_profile', async (req, res) => {
    try {
        const { user } = req;
        res.json(user)
    } catch(error) {
        res.status(404).json({ error: error.message })
    }
})

userRoutes.use('/logout', middleware.authenticateUser)
userRoutes.delete('/logout', async (req, res) => {
    try {
        const { user, token } = req;
        user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== token);
        await user.save()
        res.json()
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})

userRoutes.use('/logoutAll', middleware.authenticateUser)
userRoutes.delete('/logoutAll', async (req, res) => {
    try {
        const { user, token } = req;
        user.tokens = [];
        await user.save()
        res.json()
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})



module.exports = userRoutes;