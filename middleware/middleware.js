const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/user')

function middleware() {
    const hashPassword = async (req, res, next) => {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        req.hashedPassword = hashedPassword;
        next()
    }

    const authenticateUser = async (req, res, next) => {
        try {
            let bearerToken = req.header('Authorization').split(' ');
            token = bearerToken[1];
            const { _id } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id, "tokens.token": token })

            if(!user) {
                throw new Error('Please authenticate')
            }
            req.user = user;
            req.token = token;
            next();
            // req.token = token;
        } catch(error) {
            res.status(401).json({ error: error.message })
        }
        
    }

    const comparePassword = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            // If user does not exist
            if(!user) {
                throw new Error('User does not exist')
            }

            // If user does exist
            const isMatch = await bcrypt.compare(password, user.password);
            // If password doesn't match
            if(!isMatch) {
                throw new Error('User does not exist')
            }
            // If password does match
            req.user = user;
            next();
        } catch(error) {
            res.status(404).json({ error: error.message })
        }
    }

    return {
        hashPassword,
        authenticateUser,
        comparePassword
    }
}

module.exports = middleware();

// const authenticateUser = async (req, res, next) => {
//     try {
//         // let bearerToken = req.header('Authorization').split(' ');
//         // token = bearerToken[1];
//         let token = 
//         debugger;
//         const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//         debugger;
//         const user = await User.findOne({ _id, "tokens.token": token })
//         debugger;

//         if(!user) {
//             throw new Error('Please authenticate')
//         }
//         req.user = user;
//         next();
//         // req.token = token;
//     } catch(error) {
//         res.status(401).json({ error: error.message })
//     }
    
// }