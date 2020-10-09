const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

function middleware() {
    const hashPassword = async (req, res, next) => {
        const { password } = req.body;
        console.log(password)
        const hashedPassword = await bcrypt.hash(password, 8);
        req.hashedPassword = hashedPassword;
        next()
    }

    return {
        hashPassword
    }
}

module.exports = middleware();