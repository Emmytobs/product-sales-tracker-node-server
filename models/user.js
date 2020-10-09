const mongoose  = require('mongoose')

const userModel = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            // write  validation logic
            return value
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            // write  validation logic
            return value
        }
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userModel)
module.exports = User;